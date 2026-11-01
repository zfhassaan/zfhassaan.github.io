<template>
    <div class="tu-stack">
        <div class="tu-fields">
            <label>
                <span class="tu-label">{{ t('tax.basis') }}</span>
                <select v-model="basis" class="tu-select">
                    <option value="annual">{{ t('tax.annual') }}</option>
                    <option value="monthly">{{ t('tax.monthly') }}</option>
                </select>
            </label>
            <label>
                <span class="tu-label">{{ t('tax.amount') }}</span>
                <input v-model.number="amount" class="tu-input" type="number" min="0" step="1000" />
            </label>
            <label>
                <span class="tu-label">{{ t('tax.person') }}</span>
                <select v-model="person" class="tu-select">
                    <option value="salaried">{{ t('tax.salaried') }}</option>
                    <option value="business">{{ t('tax.business') }}</option>
                </select>
            </label>
            <label v-if="person === 'business'" class="tu-check">
                <input v-model="professional" type="checkbox" />
                {{ t('tax.professional') }}
            </label>
        </div>

        <div class="tu-stats tax-stats">
            <div class="tu-stat"><b>{{ pkr(result.income) }}</b><span>{{ t('tax.income') }}</span></div>
            <div class="tu-stat"><b>{{ pkr(result.tax) }}</b><span>{{ t('tax.annualTax') }}</span></div>
            <div class="tu-stat"><b>{{ pkr(result.tax / 12) }}</b><span>{{ t('tax.monthlyTax') }}</span></div>
            <div class="tu-stat"><b>{{ pkr(result.income - result.tax) }}</b><span>{{ t('tax.afterYear') }}</span></div>
            <div class="tu-stat"><b>{{ pkr((result.income - result.tax) / 12) }}</b><span>{{ t('tax.afterMonth') }}</span></div>
            <div class="tu-stat"><b>{{ pct(result.effective) }}</b><span>{{ t('tax.effective') }}</span></div>
            <div class="tu-stat"><b>{{ pct(result.marginal) }}</b><span>{{ t('tax.marginal') }}</span></div>
        </div>

        <p class="tu-hint">
            This income falls in {{ formatSlabRange(result.slab, activeSlabs) }}:
            {{ formatSlabRate(result.slab) }}.
            <template v-if="basis === 'monthly'"> Monthly salary is annualised as twelve equal months.</template>
        </p>

        <div class="tu-actions">
            <button class="tu-btn tu-btn-primary" type="button" :disabled="busy" @click="refresh">
                {{ busy ? t('tax.reading') : t('tax.update') }}
            </button>
            <button v-if="usingSaved" class="tu-btn" type="button" @click="reset">{{ t('tax.shipped') }}</button>
            <a class="tu-btn" :href="rateCardPage" target="_blank" rel="noopener noreferrer">{{ t('tax.open') }}</a>
        </div>
        <p class="tu-hint">{{ status }}</p>
        <p v-if="notice" class="tu-error">{{ notice }}</p>
        <FileDropzone
            v-if="needsFile"
            :model-value="[]"
            accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :title="t('tax.drop')"
            :hint="t('tax.dropHint')"
            @update:model-value="onWorkbook"
        />

        <div class="slab-table" role="table" :aria-label="t('tax.table')">
            <div class="slab-row slab-head" role="row">
                <span role="columnheader">{{ t('tax.band') }}</span>
                <span role="columnheader">{{ t('tax.rate') }}</span>
            </div>
            <div
                v-for="slab in activeSlabs"
                :key="slab.from"
                class="slab-row"
                :class="{ 'is-active': slab === result.slab }"
                role="row"
            >
                <span role="cell">{{ formatSlabRange(slab, activeSlabs) }}</span>
                <span role="cell">{{ formatSlabRate(slab) }}</span>
            </div>
        </div>

        <p class="tu-hint">
            Tax year {{ schedule.taxYear }} ({{ schedule.period }}), First Schedule, Part I, Division I
            of the Income Tax Ordinance, 2001. Salary follows section 149 from the FBR withholding rate card.
            Business income and AOPs follow the Finance Act 2026 table shipped with this page, because that card does not publish it.
            This is normal tax on the annual figure you enter. It does not apply tax credits, rebates, or minimum tax.
        </p>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import FileDropzone from '@/components/tools/FileDropzone.vue'
import { formatSlabRange, formatSlabRate, taxOnIncome } from '@/lib/fbr-tax'
import {
    FBR_RATE_CARD_PAGE,
    bundledSchedule,
    clearStoredSchedule,
    fetchFreshSlabs,
    readStoredSchedule,
    slabsFromWorkbookFile,
    unpackSchedule,
    writeStoredSchedule,
} from '@/lib/fbr-update'

const basis = ref('annual')
const amount = ref(2_400_000)
const person = ref('salaried')
const professional = ref(false)
const schedule = ref(readStoredSchedule() || bundledSchedule())
const usingSaved = ref(Boolean(readStoredSchedule()))
const busy = ref(false)
const needsFile = ref(false)
const notice = ref('')
const rateCardPage = FBR_RATE_CARD_PAGE

const activeSlabs = computed(() => {
    const rows = person.value === 'business' ? schedule.value.business : schedule.value.salary
    if (person.value !== 'business' || !professional.value) return rows
    const top = schedule.value.professionalTopRate
    return rows.map((slab, index) => (index === rows.length - 1 ? { ...slab, rate: top } : slab))
})

const status = computed(() => {
    const savedOn = schedule.value.fetchedAt
        ? new Date(schedule.value.fetchedAt).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' })
        : ''
    if (usingSaved.value && schedule.value.origin === 'file') {
        return `Salary slabs from ${schedule.value.sourceFile} are saved in this browser. Business slabs stay on the table shipped with this page.`
    }
    if (usingSaved.value) {
        return `Salary slabs saved in this browser on ${savedOn}, from the FBR withholding rate card.`
    }
    return 'These salary slabs shipped with the page from the FBR rate card. Update them to store a newer copy in this browser.'
})

onMounted(async () => {
    if (usingSaved.value) return
    try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/fbr-slabs.json`, { cache: 'no-cache' })
        if (!response.ok) return
        const unpacked = unpackSchedule(await response.json())
        if (!unpacked || usingSaved.value) return
        schedule.value = unpacked
    } catch {
        /* The shipped table remains available when the snapshot cannot be read. */
    }
})

async function refresh() {
    busy.value = true
    notice.value = ''
    try {
        const next = await fetchFreshSlabs()
        writeStoredSchedule(next)
        schedule.value = next
        usingSaved.value = true
        needsFile.value = false
    } catch (error) {
        needsFile.value = true
        notice.value = error.message === 'blocked'
            ? 'FBR does not let other websites read the rate card. GitHub Pages has no server to fetch it for you. Download the official .xlsx and drop it below. It is read and saved in this browser.'
            : error.message
    } finally {
        busy.value = false
    }
}

async function onWorkbook(list) {
    const file = list[0]
    if (!file) return
    notice.value = ''
    try {
        const next = await slabsFromWorkbookFile(file)
        writeStoredSchedule(next)
        schedule.value = next
        usingSaved.value = true
        needsFile.value = false
    } catch (error) {
        notice.value = error.message
    }
}

function reset() {
    clearStoredSchedule()
    schedule.value = bundledSchedule()
    usingSaved.value = false
    needsFile.value = false
    notice.value = ''
}

const result = computed(() => {
    const entered = Math.max(0, Number(amount.value) || 0)
    const annual = basis.value === 'monthly' ? entered * 12 : entered
    return taxOnIncome(annual, activeSlabs.value)
})

function pkr(n) {
    if (!Number.isFinite(n)) return '—'
    return `Rs ${Math.round(n).toLocaleString('en-PK')}`
}

function pct(n) {
    if (!Number.isFinite(n)) return '—'
    return `${(n * 100).toLocaleString('en-PK', { maximumFractionDigits: 2 })}%`
}
</script>

<style scoped>
a.tu-btn {
    text-decoration: none;
}

.tax-stats {
    grid-template-columns: repeat(auto-fit, minmax(148px, 1fr));
}

.tax-stats :deep(b) {
    font-size: 1.05rem;
    white-space: nowrap;
}

.slab-table {
    border: 1px solid hsl(var(--ui-border));
    border-radius: var(--radius);
    overflow: hidden;
}

.slab-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    gap: 12px;
    padding: 10px 14px;
    font-size: 0.9rem;
    color: var(--text-secondary);
    border-top: 1px solid hsl(var(--ui-border));
}

.slab-head {
    border-top: 0;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    background: hsl(var(--ui-card));
}

.slab-row.is-active {
    background: hsl(var(--primary) / 0.12);
    color: var(--text-primary);
}
</style>
