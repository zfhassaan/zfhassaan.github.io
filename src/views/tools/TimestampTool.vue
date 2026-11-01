<template>
    <div class="tu-stack">
        <div class="tu-card">
            <div class="tu-label">Now</div>
            <p class="tu-output">{{ nowLabel }}</p>
            <p class="tu-hint">Unix seconds {{ nowSec }} · milliseconds {{ nowMs }}</p>
        </div>
        <div class="tu-fields">
            <label>
                <span class="tu-label">Unix time</span>
                <input v-model="unix" class="tu-input" inputmode="numeric" />
            </label>
            <label>
                <span class="tu-label">Local date and time</span>
                <input v-model="local" class="tu-input" type="datetime-local" />
            </label>
        </div>
        <div class="tu-actions">
            <button class="tu-btn tu-btn-primary" type="button" @click="fromUnix">From Unix</button>
            <button class="tu-btn" type="button" @click="fromLocal">From local time</button>
        </div>
        <p v-if="error" class="tu-error">{{ error }}</p>
        <div v-else-if="result" class="tu-stats">
            <div class="tu-stat"><b>{{ result.iso }}</b><span>ISO</span></div>
            <div class="tu-stat"><b>{{ result.local }}</b><span>Local</span></div>
            <div class="tu-stat"><b>{{ result.seconds }}</b><span>Seconds</span></div>
            <div class="tu-stat"><b>{{ result.ms }}</b><span>Milliseconds</span></div>
        </div>
        <p class="tu-hint">Values under 10,000,000,000 are treated as seconds. Larger values are milliseconds.</p>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const nowLabel = ref('')
const nowSec = ref(0)
const nowMs = ref(0)
const unix = ref('')
const local = ref('')
const error = ref('')
const result = ref(null)
let timer = 0

function tick() {
    const date = new Date()
    nowLabel.value = date.toLocaleString()
    nowMs.value = date.getTime()
    nowSec.value = Math.floor(nowMs.value / 1000)
}

function show(date) {
    if (Number.isNaN(date.getTime())) {
        error.value = 'That is not a valid time.'
        result.value = null
        return
    }
    error.value = ''
    const ms = date.getTime()
    result.value = {
        iso: date.toISOString(),
        local: date.toLocaleString(),
        seconds: Math.floor(ms / 1000),
        ms,
    }
    unix.value = String(Math.floor(ms / 1000))
    const pad = (n) => String(n).padStart(2, '0')
    local.value = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function fromUnix() {
    const n = Number(unix.value)
    if (!Number.isFinite(n)) {
        error.value = 'Enter a number.'
        return
    }
    show(new Date(Math.abs(n) < 10000000000 ? n * 1000 : n))
}

function fromLocal() {
    show(new Date(local.value))
}

onMounted(() => {
    tick()
    timer = window.setInterval(tick, 1000)
    show(new Date())
})
onUnmounted(() => window.clearInterval(timer))
</script>
