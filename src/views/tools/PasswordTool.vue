<template>
    <div class="tu-stack">
        <div class="tu-fields">
            <label><span class="tu-label">Length · {{ length }}</span><input v-model.number="length" class="tu-input" type="range" min="8" max="64" /></label>
            <label><span class="tu-label">How many</span><input v-model.number="count" class="tu-input" type="number" min="1" max="20" /></label>
        </div>
        <div class="tu-actions">
            <label class="tu-check"><input v-model="lower" type="checkbox" /> Lowercase</label>
            <label class="tu-check"><input v-model="upper" type="checkbox" /> Uppercase</label>
            <label class="tu-check"><input v-model="digits" type="checkbox" /> Numbers</label>
            <label class="tu-check"><input v-model="symbols" type="checkbox" /> Symbols</label>
            <label class="tu-check"><input v-model="ambiguous" type="checkbox" /> Avoid similar characters</label>
        </div>
        <div class="tu-actions">
            <button class="tu-btn tu-btn-primary" type="button" @click="generate">Generate</button>
            <button class="tu-btn" type="button" :disabled="!passwords.length" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
        </div>
        <p v-if="error" class="tu-error">{{ error }}</p>
        <p v-else class="tu-hint">About {{ entropy }} bits of entropy per password, assuming the full character set is used.</p>
        <div class="tu-card">
            <p v-for="(password, index) in passwords" :key="index" class="tu-output">{{ password }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { copyText } from '@/lib/tool-files'

const length = ref(16)
const count = ref(3)
const lower = ref(true)
const upper = ref(true)
const digits = ref(true)
const symbols = ref(true)
const ambiguous = ref(true)
const passwords = ref([])
const copied = ref(false)
const error = ref('')

const pool = computed(() => {
    let chars = ''
    if (lower.value) chars += 'abcdefghijkmnopqrstuvwxyz'
    if (upper.value) chars += 'ABCDEFGHJKLMNPQRSTUVWXYZ'
    if (digits.value) chars += '23456789'
    if (symbols.value) chars += '!@#$%^&*-_=+?'
    if (!ambiguous.value) {
        chars = ''
        if (lower.value) chars += 'abcdefghijklmnopqrstuvwxyz'
        if (upper.value) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if (digits.value) chars += '0123456789'
        if (symbols.value) chars += '!@#$%^&*-_=+?'
    }
    return chars
})

const entropy = computed(() => {
    if (!pool.value) return 0
    return Math.round(length.value * Math.log2(pool.value.length))
})

function generate() {
    error.value = ''
    copied.value = false
    const chars = pool.value
    if (!chars) {
        error.value = 'Pick at least one character set.'
        passwords.value = []
        return
    }
    const total = Math.min(20, Math.max(1, count.value || 1))
    const size = Math.min(64, Math.max(8, length.value || 8))
    passwords.value = Array.from({ length: total }, () => {
        const bytes = crypto.getRandomValues(new Uint32Array(size))
        return [...bytes].map((n) => chars[n % chars.length]).join('')
    })
}

async function copy() {
    await copyText(passwords.value.join('\n'))
    copied.value = true
    setTimeout(() => { copied.value = false }, 1200)
}

generate()
</script>
