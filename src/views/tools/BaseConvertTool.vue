<template>
    <div class="tu-stack">
        <div class="tu-fields">
            <label>
                <span class="tu-label">From</span>
                <select v-model.number="from" class="tu-select">
                    <option :value="2">Binary</option>
                    <option :value="8">Octal</option>
                    <option :value="10">Decimal</option>
                    <option :value="16">Hexadecimal</option>
                </select>
            </label>
            <label>
                <span class="tu-label">Value</span>
                <input v-model="value" class="tu-input" spellcheck="false" />
            </label>
        </div>
        <p v-if="error" class="tu-error">{{ error }}</p>
        <div v-else class="tu-stats">
            <div class="tu-stat"><b>{{ out.bin }}</b><span>Binary</span></div>
            <div class="tu-stat"><b>{{ out.oct }}</b><span>Octal</span></div>
            <div class="tu-stat"><b>{{ out.dec }}</b><span>Decimal</span></div>
            <div class="tu-stat"><b>{{ out.hex }}</b><span>Hex</span></div>
        </div>
        <p class="tu-hint">Whole numbers only. Very large values are shown with BigInt, so they stay exact.</p>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const from = ref(10)
const value = ref('255')

const parsed = computed(() => {
    const raw = value.value.trim().replace(/^0[xob]/i, '')
    if (!raw) return { error: 'Enter a number.', out: null }
    try {
        const n = BigInt(parseIntSafe(raw, from.value))
        if (n < 0n) return { error: 'Use a non-negative integer.', out: null }
        return {
            error: '',
            out: {
                bin: n.toString(2),
                oct: n.toString(8),
                dec: n.toString(10),
                hex: n.toString(16),
            },
        }
    } catch {
        return { error: 'That value does not fit the selected base.', out: null }
    }
})

function parseIntSafe(raw, base) {
    const alphabet = '0123456789abcdef'
    const text = raw.toLowerCase()
    for (const char of text) {
        const digit = alphabet.indexOf(char)
        if (digit < 0 || digit >= base) throw new Error('bad digit')
    }
    return `0x${BigIntParse(text, base).toString(16)}`
}

function BigIntParse(text, base) {
    let n = 0n
    const alphabet = '0123456789abcdef'
    for (const char of text) n = n * BigInt(base) + BigInt(alphabet.indexOf(char))
    return n
}

const error = computed(() => parsed.value.error)
const out = computed(() => parsed.value.out || { bin: '', oct: '', dec: '', hex: '' })
</script>
