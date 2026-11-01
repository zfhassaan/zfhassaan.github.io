<template>
    <div class="tu-stack">
        <label class="tu-card tu-stack">
            <span class="tu-label">Text</span>
            <textarea v-model="text" class="tu-textarea" spellcheck="false" placeholder="Text to hash" @input="fromText"></textarea>
        </label>
        <FileDropzone
            :model-value="picked"
            title="Drop a file to hash"
            hint="Click to browse. Hashing stays on this device."
            @update:model-value="onPicked"
        />
        <p v-if="source" class="tu-hint">{{ source }}</p>
        <div class="tu-stack">
            <div v-for="row in rows" :key="row.name" class="tu-card">
                <div class="tu-label">{{ row.name }}</div>
                <div class="tu-output">{{ row.value || '—' }}</div>
                <button class="tu-btn" type="button" style="margin-top:10px" :disabled="!row.value" @click="copy(row)">
                    {{ copied === row.name ? 'Copied' : 'Copy' }}
                </button>
            </div>
        </div>
        <p v-if="error" class="tu-error">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import FileDropzone from '@/components/tools/FileDropzone.vue'
import { md5 } from '@/lib/md5'
import { copyText, shaHex } from '@/lib/tool-files'

const text = ref('')
const source = ref('')
const error = ref('')
const copied = ref('')
const picked = ref([])
const rows = ref([
    { name: 'MD5', value: '' },
    { name: 'SHA-1', value: '' },
    { name: 'SHA-256', value: '' },
    { name: 'SHA-512', value: '' },
])

async function hashBytes(bytes, label) {
    error.value = ''
    source.value = label
    const [sha1, sha256, sha512] = await Promise.all([
        shaHex('SHA-1', bytes),
        shaHex('SHA-256', bytes),
        shaHex('SHA-512', bytes),
    ])
    rows.value = [
        { name: 'MD5', value: md5(bytes) },
        { name: 'SHA-1', value: sha1 },
        { name: 'SHA-256', value: sha256 },
        { name: 'SHA-512', value: sha512 },
    ]
}

function fromText() {
    const bytes = new TextEncoder().encode(text.value)
    hashBytes(bytes, `${bytes.length} bytes of text`)
}

async function onPicked(list) {
    picked.value = list.slice(0, 1)
    const file = picked.value[0]
    if (!file) return
    text.value = ''
    await hashBytes(new Uint8Array(await file.arrayBuffer()), file.name)
}

async function copy(row) {
    await copyText(row.value)
    copied.value = row.name
    setTimeout(() => { copied.value = '' }, 1200)
}
</script>
