<template>
    <div class="tu-stack">
        <div class="tu-fields">
            <label><span class="tu-label">Amount</span><input v-model.number="amount" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label>
                <span class="tu-label">From</span>
                <select v-model="from" class="tu-select">
                    <option v-for="code in codes" :key="code" :value="code">{{ code }}</option>
                </select>
            </label>
            <label>
                <span class="tu-label">To</span>
                <select v-model="to" class="tu-select">
                    <option v-for="code in codes" :key="`to-${code}`" :value="code">{{ code }}</option>
                </select>
            </label>
        </div>
        <div class="tu-actions">
            <button class="tu-btn tu-btn-primary" type="button" :disabled="loading" @click="convert">{{ loading ? 'Loading…' : 'Convert' }}</button>
            <button class="tu-btn" type="button" @click="swap">Swap</button>
        </div>
        <p v-if="error" class="tu-error">{{ error }}</p>
        <div v-else-if="result" class="tu-stats">
            <div class="tu-stat"><b>{{ result }}</b><span>{{ amount }} {{ from }}</span></div>
            <div class="tu-stat"><b>{{ rate }}</b><span>Rate · {{ date }}</span></div>
        </div>
        <p class="tu-hint">Rates come from Frankfurter, which republishes the European Central Bank reference rates. They are not a live trading quote.</p>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const amount = ref(100)
const from = ref('USD')
const to = ref('EUR')
const codes = ref(['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'INR'])
const result = ref('')
const rate = ref('')
const date = ref('')
const error = ref('')
const loading = ref(false)

async function loadCodes() {
    try {
        const response = await fetch('https://api.frankfurter.dev/v1/currencies')
        if (!response.ok) return
        const data = await response.json()
        const list = Object.keys(data).sort()
        if (list.length) codes.value = list
    } catch {
        // The short default list still works if the currency index is blocked.
    }
}

async function convert() {
    loading.value = true
    error.value = ''
    try {
        if (from.value === to.value) {
            result.value = `${amount.value} ${to.value}`
            rate.value = '1'
            date.value = 'same currency'
            return
        }
        const url = `https://api.frankfurter.dev/v1/latest?amount=${encodeURIComponent(amount.value)}&from=${from.value}&to=${to.value}`
        const response = await fetch(url)
        if (!response.ok) throw new Error('The rate service did not respond.')
        const data = await response.json()
        const value = data.rates?.[to.value]
        if (value === undefined) throw new Error('That pair is not in the rate table.')
        result.value = `${value} ${to.value}`
        rate.value = amount.value ? String(Math.round((value / amount.value) * 10000) / 10000) : '—'
        date.value = data.date
    } catch (e) {
        result.value = ''
        error.value = e.message
    } finally {
        loading.value = false
    }
}

function swap() {
    const current = from.value
    from.value = to.value
    to.value = current
    convert()
}

onMounted(async () => {
    await loadCodes()
    convert()
})
</script>
