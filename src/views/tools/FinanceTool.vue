<template>
    <div class="tu-stack">
        <div v-if="kind === 'tip'" class="tu-fields">
            <label><span class="tu-label">Bill</span><input v-model.number="bill" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">Tip %</span><input v-model.number="tipPct" class="tu-input" type="number" min="0" step="0.5" /></label>
            <label><span class="tu-label">People</span><input v-model.number="people" class="tu-input" type="number" min="1" /></label>
        </div>
        <div v-else-if="kind === 'vat'" class="tu-fields">
            <label><span class="tu-label">Amount</span><input v-model.number="vatAmount" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">Tax %</span><input v-model.number="vatRate" class="tu-input" type="number" min="0" step="0.1" /></label>
            <label>
                <span class="tu-label">Mode</span>
                <select v-model="vatMode" class="tu-select">
                    <option value="add">Add tax</option>
                    <option value="extract">Extract included tax</option>
                </select>
            </label>
        </div>
        <div v-else-if="kind === 'percentage'" class="tu-fields">
            <label>
                <span class="tu-label">Question</span>
                <select v-model="pctMode" class="tu-select">
                    <option value="of">What is X% of Y</option>
                    <option value="ratio">X is what % of Y</option>
                    <option value="change">Percent change from A to B</option>
                </select>
            </label>
            <label><span class="tu-label">{{ pctMode === 'change' ? 'From' : 'X' }}</span><input v-model.number="pctA" class="tu-input" type="number" step="any" /></label>
            <label><span class="tu-label">{{ pctMode === 'change' ? 'To' : 'Y' }}</span><input v-model.number="pctB" class="tu-input" type="number" step="any" /></label>
        </div>
        <div v-else-if="kind === 'mortgage'" class="tu-fields">
            <label><span class="tu-label">Principal</span><input v-model.number="principal" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">Annual rate %</span><input v-model.number="rate" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">Years</span><input v-model.number="years" class="tu-input" type="number" min="1" /></label>
            <label><span class="tu-label">Extra / month</span><input v-model.number="extra" class="tu-input" type="number" min="0" /></label>
        </div>
        <div v-else-if="kind === 'compound'" class="tu-fields">
            <label><span class="tu-label">Starting amount</span><input v-model.number="start" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">Annual rate %</span><input v-model.number="growth" class="tu-input" type="number" step="0.01" /></label>
            <label><span class="tu-label">Years</span><input v-model.number="horizon" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">Monthly addition</span><input v-model.number="monthly" class="tu-input" type="number" min="0" /></label>
        </div>
        <div v-else-if="kind === 'paypal'" class="tu-fields">
            <label><span class="tu-label">Amount</span><input v-model.number="ppAmount" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">Fee %</span><input v-model.number="ppRate" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">Fixed fee</span><input v-model.number="ppFixed" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label>
                <span class="tu-label">Amount is</span>
                <select v-model="ppMode" class="tu-select">
                    <option value="gross">What the buyer pays</option>
                    <option value="net">What you want to keep</option>
                </select>
            </label>
        </div>
        <div v-else-if="kind === 'freelance'" class="tu-fields">
            <label><span class="tu-label">Income goal / year</span><input v-model.number="goal" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">Expenses / year</span><input v-model.number="expenses" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">Tax %</span><input v-model.number="tax" class="tu-input" type="number" min="0" max="80" /></label>
            <label><span class="tu-label">Billable weeks</span><input v-model.number="weeks" class="tu-input" type="number" min="1" /></label>
            <label><span class="tu-label">Hours / week</span><input v-model.number="hours" class="tu-input" type="number" min="1" /></label>
        </div>
        <div v-else-if="kind === 'zakat'" class="tu-fields">
            <label><span class="tu-label">Cash & savings</span><input v-model.number="cash" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">Gold grams</span><input v-model.number="goldG" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">Gold price / gram</span><input v-model.number="goldPrice" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">Silver grams</span><input v-model.number="silverG" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">Silver price / gram</span><input v-model.number="silverPrice" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">Investments</span><input v-model.number="investments" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">Debts you owe</span><input v-model.number="debts" class="tu-input" type="number" min="0" /></label>
        </div>
        <div v-else-if="kind === 'cricket'" class="tu-fields">
            <label><span class="tu-label">Runs</span><input v-model.number="runs" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">Overs bowled</span><input v-model="overs" class="tu-input" placeholder="12.3" /></label>
            <label><span class="tu-label">Target</span><input v-model.number="target" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">Innings overs</span><input v-model="innings" class="tu-input" placeholder="20" /></label>
            <label><span class="tu-label">Balls / over</span><input v-model.number="ballsPer" class="tu-input" type="number" min="1" max="10" /></label>
        </div>

        <p v-if="financeError" class="tu-error">{{ financeError }}</p>
        <div v-else class="tu-stats">
            <div v-for="row in rows" :key="row.label" class="tu-stat">
                <b>{{ row.value }}</b>
                <span>{{ row.label }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    kind: { type: String, required: true },
})

const bill = ref(86)
const tipPct = ref(15)
const people = ref(2)
const vatAmount = ref(100)
const vatRate = ref(20)
const vatMode = ref('add')
const pctMode = ref('of')
const pctA = ref(15)
const pctB = ref(200)
const principal = ref(250000)
const rate = ref(6)
const years = ref(30)
const extra = ref(0)
const start = ref(10000)
const growth = ref(7)
const horizon = ref(10)
const monthly = ref(200)
const ppAmount = ref(100)
const ppRate = ref(2.99)
const ppFixed = ref(0.49)
const ppMode = ref('gross')
const goal = ref(80000)
const expenses = ref(6000)
const tax = ref(25)
const weeks = ref(46)
const hours = ref(30)
const cash = ref(5000)
const goldG = ref(0)
const goldPrice = ref(80)
const silverG = ref(0)
const silverPrice = ref(1)
const investments = ref(0)
const debts = ref(0)
const runs = ref(48)
const overs = ref('5.2')
const target = ref(120)
const innings = ref('20')
const ballsPer = ref(6)

function money(n) {
    if (!Number.isFinite(n)) return '—'
    return n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })
}

function num(n) {
    if (!Number.isFinite(n)) return '—'
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

function parseOvers(value, per) {
    const text = String(value).trim()
    if (!text) return null
    const [o, b = '0'] = text.split('.')
    const oversN = Number(o)
    const balls = Number(b)
    if (!Number.isInteger(oversN) || oversN < 0) return null
    if (!Number.isInteger(balls) || balls < 0 || balls >= per) return null
    return oversN * per + balls
}

const result = computed(() => {
    const kind = props.kind
    if (kind === 'tip') {
        const totalTip = bill.value * tipPct.value / 100
        const total = bill.value + totalTip
        const n = Math.max(1, people.value || 1)
        return { rows: [
            { label: 'Tip', value: money(totalTip) },
            { label: 'Total', value: money(total) },
            { label: 'Per person', value: money(total / n) },
        ] }
    }
    if (kind === 'vat') {
        const rateN = vatRate.value / 100
        if (vatMode.value === 'add') {
            const taxDue = vatAmount.value * rateN
            return { rows: [
                { label: 'Tax', value: money(taxDue) },
                { label: 'Gross', value: money(vatAmount.value + taxDue) },
            ] }
        }
        const net = vatAmount.value / (1 + rateN)
        return { rows: [
            { label: 'Net', value: money(net) },
            { label: 'Tax included', value: money(vatAmount.value - net) },
        ] }
    }
    if (kind === 'percentage') {
        if (pctMode.value === 'of') return { rows: [{ label: 'Result', value: num(pctB.value * pctA.value / 100) }] }
        if (pctMode.value === 'ratio') {
            if (!pctB.value) return { error: 'Y cannot be zero.' }
            return { rows: [{ label: 'Percent', value: `${num(pctA.value / pctB.value * 100)}%` }] }
        }
        if (!pctA.value) return { error: 'The starting value cannot be zero.' }
        return { rows: [{ label: 'Change', value: `${num((pctB.value - pctA.value) / pctA.value * 100)}%` }] }
    }
    if (kind === 'mortgage') {
        const n = years.value * 12
        const r = rate.value / 100 / 12
        if (principal.value <= 0 || n <= 0) return { error: 'Enter a principal and a term.' }
        const payment = r === 0 ? principal.value / n : principal.value * r * (1 + r) ** n / ((1 + r) ** n - 1)
        if (payment + extra.value <= principal.value * r) return { error: 'The payment does not cover the interest.' }
        let balance = principal.value
        let months = 0
        let interestPaid = 0
        while (balance > 0.01 && months < n + 1200) {
            const interest = balance * r
            let principalPaid = payment + extra.value - interest
            if (principalPaid > balance) principalPaid = balance
            balance -= principalPaid
            interestPaid += interest
            months += 1
        }
        return { rows: [
            { label: 'Monthly payment', value: money(payment) },
            { label: 'With extra', value: money(payment + extra.value) },
            { label: 'Interest paid', value: money(interestPaid) },
            { label: 'Months', value: String(months) },
        ] }
    }
    if (kind === 'compound') {
        const months = Math.round(horizon.value * 12)
        const r = growth.value / 100 / 12
        let balance = start.value
        for (let i = 0; i < months; i++) balance = balance * (1 + r) + monthly.value
        const contributed = start.value + monthly.value * months
        return { rows: [
            { label: 'Future value', value: money(balance) },
            { label: 'Contributed', value: money(contributed) },
            { label: 'Growth', value: money(balance - contributed) },
        ] }
    }
    if (kind === 'paypal') {
        const rateN = ppRate.value / 100
        if (rateN >= 1) return { error: 'The percentage has to be under 100.' }
        if (ppMode.value === 'gross') {
            const fee = ppAmount.value * rateN + ppFixed.value
            return { rows: [
                { label: 'Fee', value: money(fee) },
                { label: 'You keep', value: money(ppAmount.value - fee) },
            ] }
        }
        const gross = (ppAmount.value + ppFixed.value) / (1 - rateN)
        return { rows: [
            { label: 'Ask for', value: money(gross) },
            { label: 'Fee', value: money(gross - ppAmount.value) },
        ] }
    }
    if (kind === 'freelance') {
        const billable = weeks.value * hours.value
        const keep = 1 - tax.value / 100
        if (billable <= 0 || keep <= 0) return { error: 'Check the tax rate and the hours.' }
        const hourly = (goal.value + expenses.value) / keep / billable
        return { rows: [
            { label: 'Hourly', value: money(hourly) },
            { label: 'Daily (8h)', value: money(hourly * 8) },
            { label: 'Monthly', value: money(hourly * hours.value * 52 / 12) },
        ] }
    }
    if (kind === 'zakat') {
        const wealth = cash.value + goldG.value * goldPrice.value + silverG.value * silverPrice.value + investments.value - debts.value
        const nisab = 87.48 * goldPrice.value
        const due = wealth >= nisab ? wealth * 0.025 : 0
        return { rows: [
            { label: 'Zakatable wealth', value: money(wealth) },
            { label: 'Gold nisab', value: money(nisab) },
            { label: 'Zakat due', value: money(due) },
        ] }
    }
    const per = Math.max(1, ballsPer.value || 6)
    const bowled = parseOvers(overs.value, per)
    const total = parseOvers(innings.value, per)
    if (bowled === null || total === null) return { error: `Overs look like 12.3, and the ball count must be under ${per}.` }
    if (bowled > total) return { error: 'Overs bowled cannot pass the innings length.' }
    const current = bowled ? runs.value / (bowled / per) : 0
    const need = Math.max(0, target.value - runs.value)
    const left = total - bowled
    const required = left ? need / (left / per) : 0
    return { rows: [
        { label: 'Current RR', value: num(current) },
        { label: 'Required RR', value: left ? num(required) : '—' },
        { label: 'Runs needed', value: String(need) },
        { label: 'Balls left', value: String(left) },
    ] }
})

const financeError = computed(() => result.value.error || '')
const rows = computed(() => result.value.rows || [])
</script>
