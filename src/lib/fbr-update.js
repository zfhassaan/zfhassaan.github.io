import { BUSINESS_SLABS, PROFESSIONAL_TOP_RATE, SALARIED_SLABS } from './fbr-tax.js'
import { salarySlabsFromXlsx } from './fbr-xlsx.js'

export const FBR_RATE_CARD_PAGE = 'https://fbr.gov.pk/withholding-taxes-rate-card/174298/174301'
const STORAGE_KEY = 'fbr-tax-slabs-v1'

export function xlsxUrlFromPage(html) {
    const match = String(html).match(/href="(https?:\/\/download1\.fbr\.gov\.pk\/Docs\/[^"]+\.xlsx)"/i)
    return match?.[1] || ''
}

export function taxYearFrom(html, fileUrl) {
    const fromPage = String(html).match(/Tax Year\s+(\d{4})/i)
    if (fromPage) return fromPage[1]
    const fromFile = String(fileUrl).match(/(20\d{2})\.xlsx/i)
    return fromFile?.[1] || ''
}

export function periodFor(taxYear) {
    const end = Number(taxYear)
    if (!end) return ''
    return `1 July ${end - 1} – 30 June ${end}`
}

function copySlabs(slabs) {
    return slabs.map((slab) => ({
        from: slab.from,
        upTo: Number.isFinite(slab.upTo) ? slab.upTo : null,
        base: slab.base,
        rate: slab.rate,
    }))
}

function reviveSlabs(slabs) {
    return (slabs || []).map((slab) => ({
        from: Number(slab.from) || 0,
        upTo: slab.upTo == null ? Infinity : Number(slab.upTo),
        base: Number(slab.base) || 0,
        rate: Number(slab.rate) || 0,
    }))
}

export function packSchedule(schedule) {
    return {
        taxYear: schedule.taxYear,
        period: schedule.period,
        fetchedAt: schedule.fetchedAt,
        sourcePage: schedule.sourcePage,
        sourceFile: schedule.sourceFile,
        origin: schedule.origin,
        professionalTopRate: schedule.professionalTopRate,
        salary: copySlabs(schedule.salary),
        business: copySlabs(schedule.business),
    }
}

export function unpackSchedule(raw) {
    if (!raw?.salary?.length || !raw?.business?.length) return null
    return {
        ...raw,
        professionalTopRate: Number(raw.professionalTopRate) || PROFESSIONAL_TOP_RATE,
        salary: reviveSlabs(raw.salary),
        business: reviveSlabs(raw.business),
    }
}

export function bundledSchedule() {
    return {
        taxYear: '2027',
        period: periodFor('2027'),
        fetchedAt: '',
        sourcePage: FBR_RATE_CARD_PAGE,
        sourceFile: '',
        origin: 'built-in',
        professionalTopRate: PROFESSIONAL_TOP_RATE,
        salary: SALARIED_SLABS.map((slab) => ({ ...slab })),
        business: BUSINESS_SLABS.map((slab) => ({ ...slab })),
    }
}

export function scheduleFromSalary(salary, details) {
    const taxYear = details.taxYear || '2027'
    return {
        taxYear,
        period: periodFor(taxYear),
        fetchedAt: new Date().toISOString(),
        sourcePage: details.sourcePage || FBR_RATE_CARD_PAGE,
        sourceFile: details.sourceFile || '',
        origin: details.origin || 'fbr',
        professionalTopRate: PROFESSIONAL_TOP_RATE,
        salary,
        business: BUSINESS_SLABS.map((slab) => ({ ...slab })),
    }
}

export async function fetchFreshSlabs() {
    let pageResponse
    try {
        pageResponse = await fetch(FBR_RATE_CARD_PAGE)
    } catch {
        throw new Error('blocked')
    }
    if (!pageResponse.ok) throw new Error(`The FBR rate card page returned ${pageResponse.status}.`)
    const html = await pageResponse.text()
    const sourceFile = xlsxUrlFromPage(html)
    if (!sourceFile) throw new Error('The FBR rate card page has no spreadsheet link.')
    let fileResponse
    try {
        fileResponse = await fetch(sourceFile)
    } catch {
        throw new Error('blocked')
    }
    if (!fileResponse.ok) throw new Error(`The FBR spreadsheet returned ${fileResponse.status}.`)
    const salary = await salarySlabsFromXlsx(await fileResponse.arrayBuffer())
    return scheduleFromSalary(salary, {
        taxYear: taxYearFrom(html, sourceFile),
        sourcePage: FBR_RATE_CARD_PAGE,
        sourceFile,
        origin: 'fbr',
    })
}

export async function slabsFromWorkbookFile(file) {
    const salary = await salarySlabsFromXlsx(await file.arrayBuffer())
    const year = String(file.name).match(/(20\d{2})/)
    return scheduleFromSalary(salary, {
        taxYear: year?.[1] || '2027',
        sourcePage: FBR_RATE_CARD_PAGE,
        sourceFile: file.name,
        origin: 'file',
    })
}

export function readStoredSchedule() {
    try {
        return unpackSchedule(JSON.parse(localStorage.getItem(STORAGE_KEY) || ''))
    } catch {
        return null
    }
}

export function writeStoredSchedule(schedule) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(packSchedule(schedule)))
}

export function clearStoredSchedule() {
    localStorage.removeItem(STORAGE_KEY)
}
