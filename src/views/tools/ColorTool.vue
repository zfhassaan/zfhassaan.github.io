<template>
    <div class="tu-stack">
        <div class="tu-split">
            <div class="tu-card tu-stack">
                <div class="tu-swatch" :style="{ background: hex }"></div>
                <label>
                    <span class="tu-label">Picker</span>
                    <input :value="hex" class="tu-input" type="color" @input="setHex($event.target.value)" />
                </label>
                <label>
                    <span class="tu-label">HEX</span>
                    <input v-model="hexInput" class="tu-input" spellcheck="false" @change="applyHex" />
                </label>
            </div>
            <div class="tu-stats">
                <div class="tu-stat"><b>{{ hex }}</b><span>HEX</span></div>
                <div class="tu-stat"><b>rgb({{ rgb.r }}, {{ rgb.g }}, {{ rgb.b }})</b><span>RGB</span></div>
                <div class="tu-stat"><b>hsl({{ hsl.h }}, {{ hsl.s }}%, {{ hsl.l }}%)</b><span>HSL</span></div>
                <div class="tu-stat"><b>{{ contrastWhite.toFixed(2) }}</b><span>Contrast vs white · {{ grade(contrastWhite) }}</span></div>
                <div class="tu-stat"><b>{{ contrastBlack.toFixed(2) }}</b><span>Contrast vs black · {{ grade(contrastBlack) }}</span></div>
            </div>
        </div>
        <div class="tu-actions">
            <button class="tu-btn" type="button" @click="copy(hex)">Copy HEX</button>
            <button class="tu-btn" type="button" @click="copy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)">Copy RGB</button>
            <button class="tu-btn" type="button" @click="copy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)">Copy HSL</button>
            <span v-if="copied" class="tu-ok">Copied</span>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { copyText } from '@/lib/tool-files'

const hex = ref('#2dd4bf')
const hexInput = ref('#2dd4bf')
const copied = ref(false)

function normalize(value) {
    let h = value.trim().replace('#', '')
    if (/^[0-9a-fA-F]{3}$/.test(h)) h = h.split('').map((c) => c + c).join('')
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return null
    return `#${h.toLowerCase()}`
}

function setHex(value) {
    const next = normalize(value)
    if (!next) return
    hex.value = next
    hexInput.value = next
}

function applyHex() {
    const next = normalize(hexInput.value)
    if (next) setHex(next)
    else hexInput.value = hex.value
}

const rgb = computed(() => {
    const n = parseInt(hex.value.slice(1), 16)
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
})

const hsl = computed(() => {
    const r = rgb.value.r / 255
    const g = rgb.value.g / 255
    const b = rgb.value.b / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const l = (max + min) / 2
    if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) }
    const d = max - min
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    let h = 0
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    return { h: Math.round(h * 60), s: Math.round(s * 100), l: Math.round(l * 100) }
})

function channel(c) {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}

function luminance({ r, g, b }) {
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

function ratio(a, b) {
    const [hi, lo] = a > b ? [a, b] : [b, a]
    return (hi + 0.05) / (lo + 0.05)
}

const contrastWhite = computed(() => ratio(luminance(rgb.value), 1))
const contrastBlack = computed(() => ratio(luminance(rgb.value), 0))

function grade(value) {
    if (value >= 7) return 'AAA'
    if (value >= 4.5) return 'AA'
    if (value >= 3) return 'AA large'
    return 'Fail'
}

async function copy(value) {
    await copyText(value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1200)
}
</script>
