<template>
    <div class="tu-stack">
        <div class="tu-fields">
            <label>
                <span class="tu-label">Language</span>
                <select v-model="lang" class="tu-select">
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="js">JavaScript</option>
                </select>
            </label>
        </div>
        <div class="tu-split">
            <label class="tu-card tu-stack">
                <span class="tu-label">Input</span>
                <textarea v-model="input" class="tu-textarea" spellcheck="false"></textarea>
            </label>
            <div class="tu-card tu-stack">
                <span class="tu-label">Output · saved {{ saved }}</span>
                <pre class="tu-output">{{ output }}</pre>
            </div>
        </div>
        <div class="tu-actions">
            <button class="tu-btn tu-btn-primary" type="button" @click="run">Minify</button>
            <button class="tu-btn" type="button" :disabled="!output" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
        </div>
        <p class="tu-hint">Comments and spare whitespace are removed. Strings are left intact. This will not rename variables or rewrite syntax.</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { copyText, formatBytes } from '@/lib/tool-files'

const lang = ref('css')
const input = ref('/* card */\n.card {\n  color: #2dd4bf;\n  padding: 16px;\n}\n')
const output = ref('')
const saved = ref('0 B')
const copied = ref(false)

function stripComments(code, { line, block, hash }) {
    let out = ''
    let i = 0
    while (i < code.length) {
        const c = code[i]
        if (c === '"' || c === "'" || c === '`') {
            const q = c
            out += c
            i += 1
            while (i < code.length) {
                out += code[i]
                if (code[i] === '\\') {
                    i += 1
                    if (i < code.length) out += code[i]
                } else if (code[i] === q) {
                    i += 1
                    break
                }
                i += 1
            }
            continue
        }
        if (block && c === '/' && code[i + 1] === '*') {
            i += 2
            while (i < code.length && !(code[i] === '*' && code[i + 1] === '/')) i += 1
            i += 2
            out += ' '
            continue
        }
        if (line && c === '/' && code[i + 1] === '/') {
            while (i < code.length && code[i] !== '\n') i += 1
            continue
        }
        if (hash && c === '#' && (i === 0 || code[i - 1] === '\n')) {
            while (i < code.length && code[i] !== '\n') i += 1
            continue
        }
        out += c
        i += 1
    }
    return out
}

function collapse(code) {
    return code
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{2,}/g, '\n')
        .replace(/[ \t]{2,}/g, ' ')
        .trim()
}

function run() {
    copied.value = false
    let code = input.value
    if (lang.value === 'html') {
        code = code.replace(/<!--[\s\S]*?-->/g, '')
        code = code.replace(/>\s+</g, '><').trim()
    } else if (lang.value === 'css') {
        code = collapse(stripComments(code, { line: false, block: true }))
        code = code.replace(/\s*([{}:;,])\s*/g, '$1').replace(/;}/g, '}')
    } else {
        code = collapse(stripComments(code, { line: true, block: true }))
    }
    output.value = code
    const before = new Blob([input.value]).size
    const after = new Blob([code]).size
    saved.value = `${formatBytes(Math.max(0, before - after))} (${before ? Math.round((1 - after / before) * 100) : 0}%)`
}

async function copy() {
    await copyText(output.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1200)
}
</script>
