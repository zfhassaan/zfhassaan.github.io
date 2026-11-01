<template>
    <div class="tu-stack">
        <div class="tu-fields">
            <label>
                <span class="tu-label">Category</span>
                <select v-model="category" class="tu-select" @change="resetUnits">
                    <option v-for="name in names" :key="name" :value="name">{{ name }}</option>
                </select>
            </label>
            <label>
                <span class="tu-label">Amount</span>
                <input v-model.number="amount" class="tu-input" type="number" step="any" />
            </label>
            <label>
                <span class="tu-label">From</span>
                <select v-model="from" class="tu-select">
                    <option v-for="unit in units" :key="unit.id" :value="unit.id">{{ unit.label }}</option>
                </select>
            </label>
            <label>
                <span class="tu-label">To</span>
                <select v-model="to" class="tu-select">
                    <option v-for="unit in units" :key="`to-${unit.id}`" :value="unit.id">{{ unit.label }}</option>
                </select>
            </label>
        </div>
        <div class="tu-actions">
            <button class="tu-btn" type="button" @click="swap">Swap</button>
        </div>
        <div class="tu-stat"><b>{{ output }}</b><span>{{ toLabel }}</span></div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const groups = {
    Length: [
        { id: 'mm', label: 'Millimetres', factor: 0.001 },
        { id: 'cm', label: 'Centimetres', factor: 0.01 },
        { id: 'm', label: 'Metres', factor: 1 },
        { id: 'km', label: 'Kilometres', factor: 1000 },
        { id: 'in', label: 'Inches', factor: 0.0254 },
        { id: 'ft', label: 'Feet', factor: 0.3048 },
        { id: 'mi', label: 'Miles', factor: 1609.344 },
    ],
    Weight: [
        { id: 'mg', label: 'Milligrams', factor: 0.001 },
        { id: 'g', label: 'Grams', factor: 1 },
        { id: 'kg', label: 'Kilograms', factor: 1000 },
        { id: 'oz', label: 'Ounces', factor: 28.349523125 },
        { id: 'lb', label: 'Pounds', factor: 453.59237 },
    ],
    Temperature: [
        { id: 'c', label: 'Celsius' },
        { id: 'f', label: 'Fahrenheit' },
        { id: 'k', label: 'Kelvin' },
    ],
    Area: [
        { id: 'm2', label: 'Square metres', factor: 1 },
        { id: 'ft2', label: 'Square feet', factor: 0.09290304 },
        { id: 'acre', label: 'Acres', factor: 4046.8564224 },
        { id: 'ha', label: 'Hectares', factor: 10000 },
    ],
    Speed: [
        { id: 'mps', label: 'Metres / second', factor: 1 },
        { id: 'kph', label: 'Kilometres / hour', factor: 1 / 3.6 },
        { id: 'mph', label: 'Miles / hour', factor: 0.44704 },
        { id: 'knot', label: 'Knots', factor: 0.514444 },
    ],
    Data: [
        { id: 'b', label: 'Bytes', factor: 1 },
        { id: 'kb', label: 'Kilobytes', factor: 1024 },
        { id: 'mb', label: 'Megabytes', factor: 1024 ** 2 },
        { id: 'gb', label: 'Gigabytes', factor: 1024 ** 3 },
    ],
    Time: [
        { id: 's', label: 'Seconds', factor: 1 },
        { id: 'min', label: 'Minutes', factor: 60 },
        { id: 'h', label: 'Hours', factor: 3600 },
        { id: 'd', label: 'Days', factor: 86400 },
    ],
}

const names = Object.keys(groups)
const category = ref('Length')
const amount = ref(1)
const from = ref('m')
const to = ref('ft')

const units = computed(() => groups[category.value])
const toLabel = computed(() => units.value.find((unit) => unit.id === to.value)?.label || '')

function resetUnits() {
    from.value = units.value[0].id
    to.value = units.value[1].id
    amount.value = 1
}

function toCelsius(value, unit) {
    if (unit === 'f') return (value - 32) * 5 / 9
    if (unit === 'k') return value - 273.15
    return value
}

function fromCelsius(value, unit) {
    if (unit === 'f') return value * 9 / 5 + 32
    if (unit === 'k') return value + 273.15
    return value
}

const output = computed(() => {
    const value = Number(amount.value)
    if (!Number.isFinite(value)) return '—'
    if (category.value === 'Temperature') {
        const converted = fromCelsius(toCelsius(value, from.value), to.value)
        return converted.toLocaleString(undefined, { maximumFractionDigits: 4 })
    }
    const source = units.value.find((unit) => unit.id === from.value)
    const target = units.value.find((unit) => unit.id === to.value)
    const converted = value * source.factor / target.factor
    return converted.toLocaleString(undefined, { maximumFractionDigits: 6 })
})

function swap() {
    const current = from.value
    from.value = to.value
    to.value = current
}
</script>
