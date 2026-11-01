<template>
    <div class="tu-stack">
        <label style="max-width:220px">
            <span class="tu-label">How many</span>
            <input v-model.number="count" class="tu-input" type="number" min="1" max="50" />
        </label>
        <div class="tu-actions">
            <button class="tu-btn tu-btn-primary" type="button" @click="generate">Generate</button>
            <button class="tu-btn" type="button" :disabled="!ids.length" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
        </div>
        <div class="tu-card">
            <p v-for="id in ids" :key="id" class="tu-output">{{ id }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { copyText } from '@/lib/tool-files'

const count = ref(5)
const ids = ref([])
const copied = ref(false)

function uuid() {
    if (crypto.randomUUID) return crypto.randomUUID()
    const bytes = crypto.getRandomValues(new Uint8Array(16))
    bytes[6] = (bytes[6] & 0x0f) | 0x40
    bytes[8] = (bytes[8] & 0x3f) | 0x80
    const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

function generate() {
    const total = Math.min(50, Math.max(1, Number(count.value) || 1))
    ids.value = Array.from({ length: total }, uuid)
    copied.value = false
}

async function copy() {
    await copyText(ids.value.join('\n'))
    copied.value = true
    setTimeout(() => { copied.value = false }, 1200)
}

generate()
</script>
