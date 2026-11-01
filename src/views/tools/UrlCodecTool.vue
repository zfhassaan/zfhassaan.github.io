<template>
    <div class="tu-stack">
        <div class="tu-split">
            <label class="tu-card tu-stack">
                <span class="tu-label">Input</span>
                <textarea v-model="input" class="tu-textarea" spellcheck="false" placeholder="https://example.com/a b?q=1&x=hello world"></textarea>
            </label>
            <div class="tu-card tu-stack">
                <span class="tu-label">Output</span>
                <pre class="tu-output">{{ output }}</pre>
                <p v-if="error" class="tu-error">{{ error }}</p>
            </div>
        </div>
        <div class="tu-actions">
            <button class="tu-btn tu-btn-primary" type="button" @click="encode(false)">Encode component</button>
            <button class="tu-btn" type="button" @click="encode(true)">Encode full URL</button>
            <button class="tu-btn" type="button" @click="decode">Decode</button>
            <button class="tu-btn" type="button" :disabled="!output" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
        </div>
        <p class="tu-hint">Component mode uses encodeURIComponent, so it encodes /, ?, and &. Full URL mode keeps those characters.</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { copyText } from '@/lib/tool-files'

const input = ref('')
const output = ref('')
const error = ref('')
const copied = ref(false)

function encode(full) {
    error.value = ''
    copied.value = false
    output.value = full ? encodeURI(input.value) : encodeURIComponent(input.value)
}

function decode() {
    error.value = ''
    copied.value = false
    try {
        output.value = decodeURIComponent(input.value)
    } catch {
        error.value = 'That string is not valid percent-encoding.'
        output.value = ''
    }
}

async function copy() {
    await copyText(output.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1200)
}
</script>
