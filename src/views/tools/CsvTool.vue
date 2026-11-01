<template>
    <div class="tu-stack">
        <div class="tu-actions">
            <button class="tu-btn" :class="{ 'tu-btn-primary': direction === 'json' }" type="button" @click="direction = 'json'">JSON to CSV</button>
            <button class="tu-btn" :class="{ 'tu-btn-primary': direction === 'csv' }" type="button" @click="direction = 'csv'">CSV to JSON</button>
        </div>
        <div class="tu-split">
            <label class="tu-card tu-stack">
                <span class="tu-label">Input</span>
                <textarea v-model="input" class="tu-textarea" spellcheck="false"></textarea>
            </label>
            <div class="tu-card tu-stack">
                <span class="tu-label">Output</span>
                <pre class="tu-output">{{ output }}</pre>
                <p v-if="error" class="tu-error">{{ error }}</p>
            </div>
        </div>
        <div class="tu-actions">
            <button class="tu-btn tu-btn-primary" type="button" @click="convert">Convert</button>
            <button class="tu-btn" type="button" :disabled="!output" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
            <button class="tu-btn" type="button" :disabled="!output" @click="save">Download</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { copyText, downloadText } from '@/lib/tool-files'

const direction = ref('json')
const input = ref('[{"name":"Ada","role":"Engineer"},{"name":"Lin","role":"Design"}]')
const output = ref('')
const error = ref('')
const copied = ref(false)

function csvCell(value) {
    if (value === undefined || value === null) return ''
    let text = typeof value === 'object' ? JSON.stringify(value) : String(value)
    if (/[",\n]/.test(text)) text = `"${text.replace(/"/g, '""')}"`
    return text
}

function jsonToCsv(data) {
    const rows = Array.isArray(data) ? data : [data]
    const headers = []
    rows.forEach((row) => {
        if (row && typeof row === 'object' && !Array.isArray(row)) {
            Object.keys(row).forEach((key) => {
                if (!headers.includes(key)) headers.push(key)
            })
        }
    })
    if (!headers.length) return rows.map(csvCell).join('\n')
    const lines = [headers.map(csvCell).join(',')]
    rows.forEach((row) => {
        lines.push(headers.map((key) => csvCell(row && typeof row === 'object' ? row[key] : '')).join(','))
    })
    return lines.join('\n')
}

function parseCsv(text) {
    const rows = []
    let row = []
    let cell = ''
    let quoted = false
    for (let i = 0; i < text.length; i++) {
        const char = text[i]
        if (quoted) {
            if (char === '"') {
                if (text[i + 1] === '"') {
                    cell += '"'
                    i += 1
                } else quoted = false
            } else cell += char
        } else if (char === '"') quoted = true
        else if (char === ',') {
            row.push(cell)
            cell = ''
        } else if (char === '\n') {
            row.push(cell)
            rows.push(row)
            row = []
            cell = ''
        } else if (char !== '\r') cell += char
    }
    if (cell.length || row.length) {
        row.push(cell)
        rows.push(row)
    }
    return rows.filter((line) => line.some((value) => value !== ''))
}

function convert() {
    error.value = ''
    copied.value = false
    try {
        if (direction.value === 'json') {
            output.value = jsonToCsv(JSON.parse(input.value))
        } else {
            const rows = parseCsv(input.value)
            if (!rows.length) throw new Error('No rows found.')
            const [headers, ...body] = rows
            const objects = body.map((line) => {
                const item = {}
                headers.forEach((header, index) => { item[header] = line[index] ?? '' })
                return item
            })
            output.value = JSON.stringify(objects, null, 2)
        }
    } catch (e) {
        output.value = ''
        error.value = e.message
    }
}

async function copy() {
    await copyText(output.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1200)
}

function save() {
    const ext = direction.value === 'json' ? 'csv' : 'json'
    downloadText(output.value, `data.${ext}`, ext === 'csv' ? 'text/csv' : 'application/json')
}
</script>
