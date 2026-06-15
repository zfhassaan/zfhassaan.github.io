<template>
    <main class="json-tool">
        <section class="section">
            <div class="container">
                <router-link :to="{ name: 'tools' }" class="back-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    All tools
                </router-link>

                <div class="json-head">
                    <div class="section-label">JSON · Format · Validate · Convert</div>
                    <h1 class="section-h2">JSON Formatter</h1>
                    <p class="json-intro">
                        Beautify, validate, minify and convert JSON to CSV, XML or YAML — and
                        upload or download files. Everything runs locally in your browser.
                    </p>
                </div>

                <div class="json-workspace">
                    <!-- Input editor -->
                    <div class="json-panel">
                        <div class="json-panel-head">
                            <span>Input</span>
                            <span class="json-meta">{{ inputBytes }}</span>
                        </div>
                        <div class="editor">
                            <div ref="inputGutter" class="gutter">
                                <div v-for="n in inputLineCount" :key="n">{{ n }}</div>
                            </div>
                            <textarea ref="inputEl" v-model="input" class="json-area" spellcheck="false"
                                placeholder='{ "hello": "world" }' @input="onInput" @keyup="updateCursor"
                                @click="updateCursor" @scroll="syncScroll($refs.inputGutter, $refs.inputEl)"></textarea>
                        </div>
                        <div class="json-statusbar">
                            <span class="json-status" :class="statusClass">
                                <span class="json-status-dot"></span>{{ status }}
                            </span>
                            <span class="json-pos">Ln {{ cursorLine }}, Col {{ cursorCol }}</span>
                        </div>
                    </div>

                    <!-- Action column -->
                    <div class="json-actions">
                        <button class="jt-btn" @click="triggerUpload">Upload Data</button>
                        <input ref="fileEl" type="file" accept=".json,.txt,application/json,text/plain" hidden
                            @change="onUpload" />

                        <button class="jt-btn" @click="validate">Validate</button>

                        <select v-model="indent" class="jt-select" aria-label="Indentation">
                            <option value="2">2 Tab Space</option>
                            <option value="4">4 Tab Space</option>
                            <option value="tab">Tab</option>
                        </select>

                        <button class="jt-btn jt-btn-primary" @click="beautify">Format / Beautify</button>
                        <button class="jt-btn jt-btn-primary" @click="minify">Minify / Compact</button>

                        <select v-model="convertTarget" class="jt-select" aria-label="Convert JSON to"
                            @change="convert">
                            <option value="">Convert JSON to…</option>
                            <option value="csv">CSV</option>
                            <option value="xml">XML</option>
                            <option value="yaml">YAML</option>
                        </select>

                        <button class="jt-btn" :disabled="!output" @click="download">Download</button>

                        <div class="json-actions-divider"></div>

                        <button class="jt-btn jt-btn-ghost" :disabled="!output" @click="copyOutput">
                            {{ copied ? 'Copied' : 'Copy' }}
                        </button>
                        <button class="jt-btn jt-btn-ghost" @click="clearAll">Clear</button>
                        <button class="jt-btn jt-btn-ghost" @click="loadSample">Sample</button>
                    </div>

                    <!-- Output editor -->
                    <div class="json-panel">
                        <div class="json-panel-head">
                            <span>Output</span>
                            <span class="json-meta json-meta-format">{{ outputFormat.toUpperCase() }}</span>
                        </div>
                        <div class="editor">
                            <div ref="outputGutter" class="gutter">
                                <div v-for="n in outputLineCount" :key="n">{{ n }}</div>
                            </div>
                            <textarea ref="outputEl" :value="output" class="json-area" spellcheck="false" readonly
                                placeholder="Result appears here"
                                @scroll="syncScroll($refs.outputGutter, $refs.outputEl)"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref, computed } from 'vue'

const input = ref('')
const output = ref('')
const indent = ref('2')
const convertTarget = ref('')
const outputFormat = ref('json')
const error = ref('')
const valid = ref(null)
const copied = ref(false)
const cursorLine = ref(1)
const cursorCol = ref(1)

const inputEl = ref(null)
const outputEl = ref(null)
const fileEl = ref(null)

const SAMPLE = `{"name":"zfhassaan","role":"Senior Full Stack Engineer","stack":["Laravel","Node.js","Vue"],"active":true,"projects":42}`

function indentValue() {
    return indent.value === 'tab' ? '\t' : Number(indent.value)
}

function parse() {
    error.value = ''
    if (!input.value.trim()) {
        valid.value = null
        return undefined
    }
    try {
        const parsed = JSON.parse(input.value)
        valid.value = true
        return parsed
    } catch (e) {
        valid.value = false
        error.value = e.message
        return undefined
    }
}

function setOutput(text, format) {
    output.value = text
    outputFormat.value = format
}

function beautify() {
    convertTarget.value = ''
    const parsed = parse()
    if (parsed === undefined) { output.value = ''; return }
    setOutput(JSON.stringify(parsed, null, indentValue()), 'json')
}

function minify() {
    convertTarget.value = ''
    const parsed = parse()
    if (parsed === undefined) { output.value = ''; return }
    setOutput(JSON.stringify(parsed), 'json')
}

function validate() {
    convertTarget.value = ''
    const parsed = parse()
    if (valid.value) setOutput(JSON.stringify(parsed, null, indentValue()), 'json')
}

function convert() {
    const target = convertTarget.value
    if (!target) return
    const parsed = parse()
    if (parsed === undefined) { convertTarget.value = ''; return }
    if (target === 'csv') setOutput(toCsv(parsed), 'csv')
    else if (target === 'xml') setOutput('<?xml version="1.0" encoding="UTF-8"?>\n' + toXml(parsed, 'root', 0), 'xml')
    else if (target === 'yaml') setOutput(toYaml(parsed, 0), 'yaml')
}

/* ── Converters (dependency-free) ── */
function isScalar(v) {
    return v === null || typeof v !== 'object'
}

function yamlScalar(v) {
    if (v === null) return 'null'
    if (typeof v === 'boolean' || typeof v === 'number') return String(v)
    const s = String(v)
    if (s === '' || /[:#\-?[\]{}&*!|>'"%@`,]/.test(s) || /^\s|\s$/.test(s) || /^(true|false|null|~)$/i.test(s) || /^[\d.+-]/.test(s)) {
        return JSON.stringify(s)
    }
    return s
}

function toYaml(value, depth) {
    const pad = '  '.repeat(depth)
    if (isScalar(value)) return yamlScalar(value)
    if (Array.isArray(value)) {
        if (!value.length) return '[]'
        return value.map((item) => {
            if (isScalar(item)) return `${pad}- ${yamlScalar(item)}`
            return `${pad}- ${toYaml(item, depth + 1).replace(/^\s+/, '')}`
        }).join('\n')
    }
    const keys = Object.keys(value)
    if (!keys.length) return '{}'
    return keys.map((k) => {
        const v = value[k]
        if (isScalar(v)) return `${pad}${k}: ${yamlScalar(v)}`
        if (Array.isArray(v) && !v.length) return `${pad}${k}: []`
        if (!Array.isArray(v) && !Object.keys(v).length) return `${pad}${k}: {}`
        return `${pad}${k}:\n${toYaml(v, depth + 1)}`
    }).join('\n')
}

function escapeXml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function sanitizeTag(k) {
    const tag = String(k).replace(/[^a-zA-Z0-9_.-]/g, '_')
    return /^[a-zA-Z_]/.test(tag) ? tag : '_' + tag
}

function toXml(value, tag, depth) {
    const pad = '  '.repeat(depth)
    if (isScalar(value)) {
        return `${pad}<${tag}>${escapeXml(value === null ? '' : String(value))}</${tag}>`
    }
    if (Array.isArray(value)) {
        if (!value.length) return `${pad}<${tag}/>`
        return value.map((item) => toXml(item, tag, depth)).join('\n')
    }
    const keys = Object.keys(value)
    if (!keys.length) return `${pad}<${tag}/>`
    const inner = keys.map((k) => toXml(value[k], sanitizeTag(k), depth + 1)).join('\n')
    return `${pad}<${tag}>\n${inner}\n${pad}</${tag}>`
}

function csvCell(v) {
    if (v === undefined || v === null) return ''
    let s = typeof v === 'object' ? JSON.stringify(v) : String(v)
    if (/[",\n]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"'
    return s
}

function toCsv(data) {
    const rows = Array.isArray(data) ? data : [data]
    const headers = []
    rows.forEach((r) => {
        if (r && typeof r === 'object' && !Array.isArray(r)) {
            Object.keys(r).forEach((k) => { if (!headers.includes(k)) headers.push(k) })
        }
    })
    if (!headers.length) return rows.map(csvCell).join('\n')
    const lines = [headers.map(csvCell).join(',')]
    rows.forEach((r) => {
        lines.push(headers.map((h) => csvCell(r && typeof r === 'object' ? r[h] : '')).join(','))
    })
    return lines.join('\n')
}

/* ── File I/O ── */
function triggerUpload() {
    fileEl.value?.click()
}

function onUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
        input.value = String(reader.result || '')
        beautify()
        e.target.value = ''
    }
    reader.readAsText(file)
}

const MIME = { json: 'application/json', csv: 'text/csv', xml: 'application/xml', yaml: 'text/yaml' }
function download() {
    if (!output.value) return
    const fmt = outputFormat.value
    const blob = new Blob([output.value], { type: MIME[fmt] || 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `data.${fmt}`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
}

/* ── Editor helpers ── */
function onInput() {
    copied.value = false
    liveValidate()
    updateCursor({ target: inputEl.value })
}

function liveValidate() {
    if (!input.value.trim()) { valid.value = null; error.value = ''; return }
    try {
        JSON.parse(input.value)
        valid.value = true
        error.value = ''
    } catch (e) {
        valid.value = false
        error.value = e.message
    }
}

function updateCursor(e) {
    const el = e?.target || inputEl.value
    if (!el) return
    const before = el.value.slice(0, el.selectionStart ?? 0)
    const lines = before.split('\n')
    cursorLine.value = lines.length
    cursorCol.value = lines[lines.length - 1].length + 1
}

function syncScroll(gutter, area) {
    if (gutter && area) gutter.scrollTop = area.scrollTop
}

function loadSample() {
    input.value = SAMPLE
    beautify()
}

function clearAll() {
    input.value = ''
    output.value = ''
    outputFormat.value = 'json'
    convertTarget.value = ''
    error.value = ''
    valid.value = null
    copied.value = false
    cursorLine.value = 1
    cursorCol.value = 1
}

async function copyOutput() {
    if (!output.value) return
    try {
        await navigator.clipboard.writeText(output.value)
        copied.value = true
        setTimeout(() => { copied.value = false }, 1500)
    } catch {
        // Clipboard API unavailable (e.g. insecure context) — fail silently.
    }
}

const status = computed(() => {
    if (valid.value === false) return `Invalid JSON — ${error.value}`
    if (valid.value === true) return 'Valid JSON'
    return 'Waiting for input'
})

const statusClass = computed(() => ({
    'is-valid': valid.value === true,
    'is-invalid': valid.value === false,
}))

const inputLineCount = computed(() => Math.max(1, input.value.split('\n').length))
const outputLineCount = computed(() => Math.max(1, output.value.split('\n').length))

const inputBytes = computed(() => {
    const bytes = new Blob([input.value]).size
    if (bytes < 1024) return `${bytes} B`
    return `${(bytes / 1024).toFixed(1)} KB`
})
</script>

<style scoped>
.section {
    margin-top: 0px !important;
}

.json-tool {
    min-height: 100vh;
    padding-top: 72px;
}

.back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.06em;
    color: var(--text-secondary);
    margin-bottom: 28px;
    transition: color 0.2s ease;
}

.back-link:hover {
    color: var(--accent);
}

.json-head {
    max-width: 660px;
    margin-bottom: 28px;
}

.json-intro {
    margin-top: 14px;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--text-secondary);
}

.json-workspace {
    display: grid;
    grid-template-columns: 1fr 190px 1fr;
    gap: 16px;
    align-items: stretch;
}

@media (max-width: 900px) {
    .json-workspace {
        grid-template-columns: 1fr;
    }
}

.json-panel {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--surface);
    min-height: 440px;
}

.json-panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
}

.json-meta {
    color: var(--text-muted);
}

.json-meta-format {
    color: var(--accent);
}

/* ── Line-numbered editor ── */
.editor {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.gutter {
    flex: 0 0 auto;
    padding: 16px 10px 16px 14px;
    text-align: right;
    overflow: hidden;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.6;
    user-select: none;
}

.json-area {
    flex: 1;
    width: 100%;
    resize: none;
    border: none;
    outline: none;
    padding: 16px;
    background: transparent;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.6;
    tab-size: 2;
    white-space: pre;
    overflow: auto;
}

.json-area::placeholder {
    color: var(--text-muted);
}

.json-statusbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 14px;
    border-top: 1px solid var(--border);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-muted);
}

.json-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.json-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-muted);
    flex: 0 0 auto;
}

.json-status.is-valid {
    color: var(--success);
}

.json-status.is-valid .json-status-dot {
    background: var(--success);
}

.json-status.is-invalid {
    color: #F87171;
}

.json-status.is-invalid .json-status-dot {
    background: #F87171;
}

.json-pos {
    flex: 0 0 auto;
}

/* ── Action column ── */
.json-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

@media (max-width: 900px) {
    .json-actions {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
}

.jt-btn {
    font-family: var(--font-head);
    font-size: 13px;
    font-weight: 600;
    padding: 10px 14px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.jt-btn:hover:not(:disabled) {
    border-color: rgba(45, 212, 191, 0.45);
    color: var(--text-primary);
}

.jt-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}

.jt-btn-primary {
    background: var(--accent);
    color: var(--bg-primary);
    border-color: var(--accent);
}

.jt-btn-primary:hover:not(:disabled) {
    color: var(--bg-primary);
    box-shadow: 0 8px 24px -10px var(--glow-strong);
}

.jt-btn-ghost {
    font-size: 12px;
    padding: 8px 14px;
}

.jt-select {
    font-family: var(--font-mono);
    font-size: 12px;
    padding: 10px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--text-primary);
    cursor: pointer;
    width: 100%;
}

.json-actions-divider {
    height: 1px;
    background: var(--border);
    margin: 4px 0;
}

@media (max-width: 900px) {
    .json-actions-divider {
        display: none;
    }

    .jt-select {
        width: auto;
    }
}
</style>
