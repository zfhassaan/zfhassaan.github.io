<template>
    <div class="tu-stack">
        <div class="tu-actions">
            <button v-for="item in tabs" :key="item.id" class="tu-btn" :class="{ 'tu-btn-primary': tab === item.id }" type="button" @click="tab = item.id">
                {{ item.label }}
            </button>
        </div>
        <div v-if="tab === 'concrete'" class="tu-fields">
            <label><span class="tu-label">Length (m)</span><input v-model.number="length" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">Width (m)</span><input v-model.number="width" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">Thickness (m)</span><input v-model.number="depth" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">Waste %</span><input v-model.number="waste" class="tu-input" type="number" min="0" /></label>
        </div>
        <div v-else-if="tab === 'paint'" class="tu-fields">
            <label><span class="tu-label">Wall area (m²)</span><input v-model.number="area" class="tu-input" type="number" min="0" /></label>
            <label><span class="tu-label">Coats</span><input v-model.number="coats" class="tu-input" type="number" min="1" /></label>
            <label><span class="tu-label">Coverage (m² / litre)</span><input v-model.number="coverage" class="tu-input" type="number" min="0.1" /></label>
        </div>
        <div v-else class="tu-fields">
            <label><span class="tu-label">Room length (m)</span><input v-model.number="length" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">Room width (m)</span><input v-model.number="width" class="tu-input" type="number" min="0" step="0.01" /></label>
            <label><span class="tu-label">Waste %</span><input v-model.number="waste" class="tu-input" type="number" min="0" /></label>
        </div>
        <div class="tu-stats">
            <div v-for="row in rows" :key="row.label" class="tu-stat">
                <b>{{ row.value }}</b>
                <span>{{ row.label }}</span>
            </div>
        </div>
        <p class="tu-hint">These are order-of-magnitude estimates. Confirm coverage with the product you actually buy.</p>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const tabs = [
    { id: 'concrete', label: 'Concrete' },
    { id: 'paint', label: 'Paint' },
    { id: 'floor', label: 'Flooring' },
]
const tab = ref('concrete')
const length = ref(5)
const width = ref(4)
const depth = ref(0.1)
const waste = ref(10)
const area = ref(40)
const coats = ref(2)
const coverage = ref(10)

function num(n) {
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

const rows = computed(() => {
    const factor = 1 + Math.max(0, waste.value) / 100
    if (tab.value === 'concrete') {
        const volume = length.value * width.value * depth.value * factor
        return [
            { label: 'Cubic metres', value: num(volume) },
            { label: 'Cubic feet', value: num(volume * 35.3147) },
        ]
    }
    if (tab.value === 'paint') {
        const litres = coverage.value ? (area.value * coats.value) / coverage.value : 0
        return [
            { label: 'Litres', value: num(litres) },
            { label: 'US gallons', value: num(litres / 3.78541) },
        ]
    }
    const floor = length.value * width.value * factor
    return [
        { label: 'Square metres', value: num(floor) },
        { label: 'Square feet', value: num(floor * 10.7639) },
    ]
})
</script>
