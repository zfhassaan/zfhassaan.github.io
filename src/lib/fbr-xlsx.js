/** Read the salary table from FBR's withholding rate-card workbook. */

async function inflateRaw(bytes) {
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))
    return new Uint8Array(await new Response(stream).arrayBuffer())
}

async function unzip(buffer) {
    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer)
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
    const files = new Map()
    let offset = 0
    while (offset + 30 <= bytes.length) {
        if (view.getUint32(offset, true) !== 0x04034b50) break
        const flags = view.getUint16(offset + 6, true)
        const method = view.getUint16(offset + 8, true)
        const compressedSize = view.getUint32(offset + 18, true)
        const nameLength = view.getUint16(offset + 26, true)
        const extraLength = view.getUint16(offset + 28, true)
        const nameStart = offset + 30
        const name = new TextDecoder().decode(bytes.subarray(nameStart, nameStart + nameLength))
        const dataStart = nameStart + nameLength + extraLength
        if (flags & 0x8) throw new Error('This workbook uses a zip layout the reader does not support.')
        const compressed = bytes.subarray(dataStart, dataStart + compressedSize)
        const data = method === 0 ? compressed : method === 8 ? await inflateRaw(compressed) : null
        if (!data) throw new Error('This workbook uses a compression method the reader does not support.')
        files.set(name, data)
        offset = dataStart + compressedSize
    }
    return files
}

function decodeXml(text) {
    return text
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
}

function sharedStrings(xml) {
    return [...xml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)].map((match) => {
        const parts = [...match[1].matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((part) => decodeXml(part[1]))
        return parts.join('')
    })
}

function column(ref) {
    return String(ref).replace(/\d/g, '')
}

function rowsOf(sheetXml, strings) {
    const rows = []
    for (const match of sheetXml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
        const cells = {}
        for (const cell of match[1].matchAll(/<c\b([^>]*?)\/>|<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
            const attrs = cell[1] || cell[2]
            const inner = cell[3] || ''
            if (!inner) continue
            const ref = (attrs.match(/\br="([A-Z]+)\d+"/) || [])[1]
            const value = (inner.match(/<v>([\s\S]*?)<\/v>/) || [])[1]
            if (!ref || value == null) continue
            cells[column(ref)] = /\bt="s"/.test(attrs) ? (strings[Number(value)] || '') : value
        }
        rows.push(cells)
    }
    return rows
}

function money(text) {
    const match = String(text).replace(/,/g, '').match(/(\d+(?:\.\d+)?)/)
    return match ? Number(match[1]) : null
}

function parseRate(text) {
    const compact = String(text).replace(/\s+/g, ' ').trim()
    const percent = compact.match(/([\d.]+)\s*%/)
    const base = compact.match(/Rs\.?\s*([\d,]+)\s*\+/)
    const above = compact.match(/exceeding\s+Rs\.?\s*([\d,]+)/i)
    return {
        base: base ? Number(base[1].replace(/,/g, '')) : 0,
        rate: percent ? Number(percent[1]) / 100 : 0,
        from: above ? Number(above[1].replace(/,/g, '')) : 0,
    }
}

function parseCap(text) {
    const cap = String(text).match(/does not exceed\s+Rs\.?\s*([\d,]+)/i)
    return cap ? Number(cap[1].replace(/,/g, '')) : Infinity
}

function salaryRows(rows) {
    return rows.filter((row) => String(row.E || '').trim().startsWith('149 Salary') && row.F && row.H)
}

export function slabsFromRateRows(rows) {
    const slabs = salaryRows(rows).map((row) => {
        const rate = parseRate(row.H)
        const described = money(String(row.F).match(/exceeds\s+Rs\.?\s*([\d,]+)/i)?.[1] || '')
        return {
            from: rate.from || described || 0,
            upTo: parseCap(row.F),
            base: rate.base,
            rate: rate.rate,
        }
    }).sort((a, b) => a.from - b.from)

    if (slabs.length < 2) throw new Error('The workbook has no section 149 salary table.')
    let carried = 0
    for (let index = 0; index < slabs.length; index += 1) {
        const slab = slabs[index]
        const previous = slabs[index - 1]
        if (previous && slab.from !== previous.upTo) {
            throw new Error('The salary bands in that workbook do not meet.')
        }
        if (Math.round(slab.base) !== Math.round(carried)) {
            throw new Error('The fixed tax in that workbook does not match the previous band.')
        }
        if (slab.rate < 0 || slab.rate > 0.6) throw new Error('A salary rate in that workbook is not usable.')
        if (Number.isFinite(slab.upTo)) carried = slab.base + (slab.upTo - slab.from) * slab.rate
    }
    if (Number.isFinite(slabs[slabs.length - 1].upTo)) {
        throw new Error('The salary table has no top band.')
    }
    return slabs
}

export async function salarySlabsFromXlsx(buffer) {
    const files = await unzip(buffer)
    const stringsFile = files.get('xl/sharedStrings.xml')
    if (!stringsFile) throw new Error('That file is not an Excel workbook.')
    const strings = sharedStrings(new TextDecoder().decode(stringsFile))
    const sheets = [...files.keys()].filter((name) => /^xl\/worksheets\/sheet\d+\.xml$/.test(name)).sort()
    let found = null
    for (const name of sheets) {
        const rows = rowsOf(new TextDecoder().decode(files.get(name)), strings)
        if (!salaryRows(rows).length) continue
        found = slabsFromRateRows(rows)
        break
    }
    if (!found) throw new Error('That workbook has no section 149 salary table.')
    return found
}
