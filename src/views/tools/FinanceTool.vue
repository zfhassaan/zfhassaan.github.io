<template>
    <div class="tu-stack">
        <div v-if="kind === 'tip'" class="tu-fields">
            <label><span class="tu-label">{{ t('finance.bill') }}</span><input v-model.number="bill" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">{{ t('finance.tipPct') }}</span><input v-model.number="tipPct" class="tu-input" type="number" min="0" step="0.5" /></label>
            <label><span class="tu-label">{{ t('finance.people') }}</span><input v-model.number="people" class="tu-input" type="number" min="1" /></label>
        </div>
        <div v-else-if="kind === 'vat'" class="tu-fields">
            <label><span class="tu-label">{{ t('finance.amount') }}</span><input v-model.number="vatAmount" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">{{ t('finance.taxPct') }}</span><input v-model.number="vatRate" class="tu-input" type="number" min="0" step="0.1" /></label>
            <label>
                <span class="tu-label">{{ t('finance.mode') }}</span>
                <select v-model="vatMode" class="tu-select">
                    <option value="add">{{ t('finance.addTax') }}</option>
                    <option value="extract">{{ t('finance.extractTax') }}</option>
                </select>
            </label>
        </div>
        <div v-else-if="kind === 'percentage'" class="tu-fields">
            <label>
                <span class="tu-label">{{ t('finance.question') }}</span>
                <select v-model="pctMode" class="tu-select">
                    <option value="of">{{ t('finance.of') }}</option>
                    <option value="ratio">{{ t('finance.ratio') }}</option>
                    <option value="change">{{ t('finance.changeQ') }}</option>
                </select>
            </label>
            <label><span class="tu-label">{{ pctMode === 'change' ? t('finance.from') : 'X' }}</span><input v-model.number="pctA" class="tu-input" type="number" step="any" /></label>
            <label><span class="tu-label">{{ pctMode === 'change' ? t('finance.to') : 'Y' }}</span><input v-model.number="pctB" class="tu-input" type="number" step="any" /></label>
        </div>
        <div v-else-if="kind === 'mortgage'" class="tu-fields">
            <label><span class="tu-label">{{ t('finance.principal') }}</span><input v-model.number="principal" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">{{ t('finance.annualRate') }}</span><input v-model.number="rate" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">{{ t('finance.years') }}</span><input v-model.number="years" class="tu-input" type="number" min="1" /></label>
            <label><span class="tu-label">{{ t('finance.extra') }}</span><input v-model.number="extra" class="tu-input" type="number" min="0" /></label>
        </div>
        <div v-else-if="kind === 'compound'" class="tu-fields">
            <label><span class="tu-label">{{ t('finance.starting') }}</span><input v-model.number="start" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">{{ t('finance.annualRate') }}</span><input v-model.number="growth" class="tu-input" type="number" step="0.01" /></label>
            <label><span class="tu-label">{{ t('finance.years') }}</span><input v-model.number="horizon" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">{{ t('finance.monthlyAdd') }}</span><input v-model.number="monthly" class="tu-input" type="number" min="0" /></label>
        </div>
        <div v-else-if="kind === 'paypal'" class="tu-fields">
            <label><span class="tu-label">{{ t('finance.amount') }}</span><input v-model.number="ppAmount" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">{{ t('finance.feePct') }}</span><input v-model.number="ppRate" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">{{ t('finance.fixed') }}</span><input v-model.number="ppFixed" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label>
                <span class="tu-label">{{ t('finance.amountIs') }}</span>
                <select v-model="ppMode" class="tu-select">
                    <option value="gross">{{ t('finance.buyer') }}</option>
                    <option value="net">{{ t('finance.keepWant') }}</option>
                </select>
            </label>
        </div>
        <div v-else-if="kind === 'freelance'" class="tu-fields">
            <label><span class="tu-label">{{ t('finance.goal') }}</span><input v-model.number="goal" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">{{ t('finance.expenses') }}</span><input v-model.number="expenses" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">{{ t('finance.taxPct') }}</span><input v-model.number="tax" class="tu-input" type="number" min="0" max="80" /></label>
            <label><span class="tu-label">{{ t('finance.weeks') }}</span><input v-model.number="weeks" class="tu-input" type="number" min="1" /></label>
            <label><span class="tu-label">{{ t('finance.hours') }}</span><input v-model.number="hours" class="tu-input" type="number" min="1" /></label>
        </div>
        <div v-else-if="kind === 'zakat'" class="tu-fields">
            <label><span class="tu-label">{{ t('finance.cash') }}</span><input v-model.number="cash" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">{{ t('finance.goldG') }}</span><input v-model.number="goldG" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">{{ t('finance.goldP') }}</span><input v-model.number="goldPrice" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">{{ t('finance.silverG') }}</span><input v-model.number="silverG" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">{{ t('finance.silverP') }}</span><input v-model.number="silverPrice" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">{{ t('finance.investments') }}</span><input v-model.number="investments" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">{{ t('finance.debts') }}</span><input v-model.number="debts" class="tu-input" type="number" min="0" /></label>
        </div>
        <div v-else-if="kind === 'cricket'" class="tu-fields">
            <label><span class="tu-label">{{ t('finance.runs') }}</span><input v-model.number="runs" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">{{ t('finance.overs') }}</span><input v-model="overs" class="tu-input" placeholder="12.3" /></label>
            <label><span class="tu-label">{{ t('finance.target') }}</span><input v-model.number="target" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">{{ t('finance.innings') }}</span><input v-model="innings" class="tu-input" placeholder="20" /></label>
            <label><span class="tu-label">{{ t('finance.balls') }}</span><input v-model.number="ballsPer" class="tu-input" type="number" min="1" max="10" /></label>
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
            { label: t('finance.tip'), value: money(totalTip) },
            { label: t('finance.total'), value: money(total) },
            { label: t('finance.per'), value: money(total / n) },
        ] }
    }
    if (kind === 'vat') {
        const rateN = vatRate.value / 100
        if (vatMode.value === 'add') {
            const taxDue = vatAmount.value * rateN
            return { rows: [
                { label: t('finance.tax'), value: money(taxDue) },
                { label: t('finance.gross'), value: money(vatAmount.value + taxDue) },
            ] }
        }
        const net = vatAmount.value / (1 + rateN)
        return { rows: [
            { label: t('finance.net'), value: money(net) },
            { label: t('finance.included'), value: money(vatAmount.value - net) },
        ] }
    }
    if (kind === 'percentage') {
        if (pctMode.value === 'of') return { rows: [{ label: t('finance.result'), value: num(pctB.value * pctA.value / 100) }] }
        if (pctMode.value === 'ratio') {
            if (!pctB.value) return { error: t('finance.yZero') }
            return { rows: [{ label: t('finance.percent'), value: `${num(pctA.value / pctB.value * 100)}%` }] }
        }
        if (!pctA.value) return { error: t('finance.startZero') }
        return { rows: [{ label: t('finance.change'), value: `${num((pctB.value - pctA.value) / pctA.value * 100)}%` }] }
    }
    if (kind === 'mortgage') {
        const n = years.value * 12
        const r = rate.value / 100 / 12
        if (principal.value <= 0 || n <= 0) return { error: t('finance.principalError') }
        const payment = r === 0 ? principal.value / n : principal.value * r * (1 + r) ** n / ((1 + r) ** n - 1)
        if (payment + extra.value <= principal.value * r) return { error: t('finance.interestError') }
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
            { label: t('finance.monthlyPay'), value: money(payment) },
            { label: t('finance.withExtra'), value: money(payment + extra.value) },
            { label: t('finance.interest'), value: money(interestPaid) },
            { label: t('finance.months'), value: String(months) },
        ] }
    }
    if (kind === 'compound') {
        const months = Math.round(horizon.value * 12)
        const r = growth.value / 100 / 12
        let balance = start.value
        for (let i = 0; i < months; i++) balance = balance * (1 + r) + monthly.value
        const contributed = start.value + monthly.value * months
        return { rows: [
            { label: t('finance.future'), value: money(balance) },
            { label: t('finance.contributed'), value: money(contributed) },
            { label: t('finance.growth'), value: money(balance - contributed) },
        ] }
    }
    if (kind === 'paypal') {
        const rateN = ppRate.value / 100
        if (rateN >= 1) return { error: t('finance.feeError') }
        if (ppMode.value === 'gross') {
            const fee = ppAmount.value * rateN + ppFixed.value
            return { rows: [
                { label: t('finance.fee'), value: money(fee) },
                { label: t('finance.youKeep'), value: money(ppAmount.value - fee) },
            ] }
        }
        const gross = (ppAmount.value + ppFixed.value) / (1 - rateN)
        return { rows: [
            { label: t('finance.ask'), value: money(gross) },
            { label: t('finance.fee'), value: money(gross - ppAmount.value) },
        ] }
    }
    if (kind === 'freelance') {
        const billable = weeks.value * hours.value
        const keep = 1 - tax.value / 100
        if (billable <= 0 || keep <= 0) return { error: t('finance.hoursError') }
        const hourly = (goal.value + expenses.value) / keep / billable
        return { rows: [
            { label: t('finance.hourly'), value: money(hourly) },
            { label: t('finance.daily'), value: money(hourly * 8) },
            { label: t('finance.monthly'), value: money(hourly * hours.value * 52 / 12) },
        ] }
    }
    if (kind === 'zakat') {
        const wealth = cash.value + goldG.value * goldPrice.value + silverG.value * silverPrice.value + investments.value - debts.value
        const nisab = 87.48 * goldPrice.value
        const due = wealth >= nisab ? wealth * 0.025 : 0
        return { rows: [
            { label: t('finance.wealth'), value: money(wealth) },
            { label: t('finance.nisab'), value: money(nisab) },
            { label: t('finance.due'), value: money(due) },
        ] }
    }
    const per = Math.max(1, ballsPer.value || 6)
    const bowled = parseOvers(overs.value, per)
    const total = parseOvers(innings.value, per)
    if (bowled === null || total === null) return { error: t('finance.oversError', { per }) }
    if (bowled > total) return { error: t('finance.oversLong') }
    const current = bowled ? runs.value / (bowled / per) : 0
    const need = Math.max(0, target.value - runs.value)
    const left = total - bowled
    const required = left ? need / (left / per) : 0
    return { rows: [
        { label: t('finance.crr'), value: num(current) },
        { label: t('finance.rrr'), value: left ? num(required) : '—' },
        { label: t('finance.need'), value: String(need) },
        { label: t('finance.left'), value: String(left) },
    ] }
})

const financeError = computed(() => result.value.error || '')
const rows = computed(() => result.value.rows || [])
</script>
