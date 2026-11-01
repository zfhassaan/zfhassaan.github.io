<template>
    <div class="tu-stack">
        <div class="tu-swatch" :style="{ background: css }"></div>
        <div class="tu-fields">
            <label>
                <span class="tu-label">Type</span>
                <select v-model="type" class="tu-select">
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                </select>
            </label>
            <label v-if="type === 'linear'">
                <span class="tu-label">Angle · {{ angle }}°</span>
                <input v-model.number="angle" class="tu-input" type="range" min="0" max="360" />
            </label>
            <label>
                <span class="tu-label">Start</span>
                <input v-model="from" class="tu-input" type="color" />
            </label>
            <label>
                <span class="tu-label">End</span>
                <input v-model="to" class="tu-input" type="color" />
            </label>
        </div>
        <div class="tu-card">
            <div class="tu-label">CSS</div>
            <pre class="tu-output">{{ css }}</pre>
            <button class="tu-btn" type="button" style="margin-top:10px" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { copyText } from '@/lib/tool-files'

const type = ref('linear')
const angle = ref(135)
const from = ref('#0f172a')
const to = ref('#2dd4bf')
const copied = ref(false)

const css = computed(() => {
    if (type.value === 'radial') return `radial-gradient(circle, ${from.value}, ${to.value})`
    return `linear-gradient(${angle.value}deg, ${from.value}, ${to.value})`
})

async function copy() {
    await copyText(`background: ${css.value};`)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1200)
}
</script>
