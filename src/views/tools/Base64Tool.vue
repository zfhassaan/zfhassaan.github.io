<template>
    <div class="tu-stack">
        <div class="tu-split">
            <label class="tu-card tu-stack">
                <span class="tu-label">Input</span>
                <textarea v-model="input" class="tu-textarea" spellcheck="false" placeholder="Text to encode or decode"></textarea>
            </label>
            <div class="tu-card tu-stack">
                <span class="tu-label">Output</span>
                <pre class="tu-output">{{ output }}</pre>
                <p v-if="error" class="tu-error">{{ error }}</p>
            </div>
        </div>
        <FileDropzone
            :model-value="picked"
            title="Drop a file to encode"
            hint="Click to browse. The Base64 is the raw file bytes."
            @update:model-value="onPicked"
        />
        <div class="tu-actions">
            <button class="tu-btn tu-btn-primary" type="button" @click="encode">Encode</button>
            <button class="tu-btn" type="button" @click="decode">Decode</button>
            <button class="tu-btn" type="button" :disabled="!output" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
            <button class="tu-btn" type="button" :disabled="!output" @click="save">Download</button>
        </div>
        <p class="tu-hint">Text uses UTF-8. File encoding returns the raw Base64 of the file bytes.</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import FileDropzone from '@/components/tools/FileDropzone.vue'
import { copyText, decodeUtf8Base64, downloadText, encodeUtf8Base64, bytesToBase64 } from '@/lib/tool-files'

const input = ref('')
const output = ref('')
const error = ref('')
const copied = ref(false)
const picked = ref([])

function encode() {
    error.value = ''
    copied.value = false
    try {
        output.value = encodeUtf8Base64(input.value)
    } catch (e) {
        error.value = e.message
        output.value = ''
    }
}

function decode() {
    error.value = ''
    copied.value = false
    try {
        output.value = decodeUtf8Base64(input.value.trim())
    } catch {
        error.value = 'That is not valid Base64.'
        output.value = ''
    }
}

async function onPicked(list) {
    picked.value = list.slice(0, 1)
    const file = picked.value[0]
    if (!file) return
    error.value = ''
    const bytes = new Uint8Array(await file.arrayBuffer())
    input.value = `File: ${file.name} (${file.size} bytes)`
    output.value = bytesToBase64(bytes)
}

async function copy() {
    if (!output.value) return
    await copyText(output.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1200)
}

function save() {
    if (!output.value) return
    downloadText(output.value, 'base64.txt')
}
</script>
