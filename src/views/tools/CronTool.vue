<template>
    <div class="tu-stack">
        <label>
            <span class="tu-label">Expression</span>
            <input v-model="expression" class="tu-input" spellcheck="false" placeholder="0 9 * * 1-5" />
        </label>
        <div class="tu-actions">
            <button v-for="preset in presets" :key="preset.expr" class="tu-btn" type="button" @click="expression = preset.expr">
                {{ preset.label }}
            </button>
        </div>
        <p v-if="error" class="tu-error">{{ error }}</p>
        <template v-else>
            <div class="tu-card">
                <div class="tu-label">Meaning</div>
                <p class="tu-output">{{ description }}</p>
            </div>
            <div class="tu-card">
                <div class="tu-label">Next runs · local time</div>
                <p v-for="run in runs" :key="run" class="tu-output">{{ run }}</p>
            </div>
        </template>
        <p class="tu-hint">Five fields: minute, hour, day of month, month, day of week. When both day fields are restricted, a date matches either one.</p>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { describeCron, nextCronRuns } from '@/lib/cron'

const expression = ref('0 9 * * 1-5')
const presets = [
    { label: 'Every minute', expr: '* * * * *' },
    { label: 'Hourly', expr: '0 * * * *' },
    { label: 'Daily 09:00', expr: '0 9 * * *' },
    { label: 'Weekdays 09:00', expr: '0 9 * * 1-5' },
    { label: 'Monthly', expr: '0 9 1 * *' },
]

const parsed = computed(() => {
    try {
        return {
            description: describeCron(expression.value),
            runs: nextCronRuns(expression.value, 8).map((date) => date.toLocaleString()),
            error: '',
        }
    } catch (e) {
        return { description: '', runs: [], error: e.message }
    }
})

const description = computed(() => parsed.value.description)
const runs = computed(() => parsed.value.runs)
const error = computed(() => parsed.value.error)
</script>
