<template>
    <div class="tu-stack">
        <div class="tu-fields">
            <label>
                <span class="tu-label">Type</span>
                <select v-model="type" class="tu-select">
                    <option value="text">Text or URL</option>
                    <option value="wifi">Wi-Fi</option>
                    <option value="vcard">Contact</option>
                </select>
            </label>
            <label>
                <span class="tu-label">Size</span>
                <input v-model.number="size" class="tu-input" type="number" min="180" max="800" />
            </label>
        </div>
        <template v-if="type === 'text'">
            <textarea v-model="text" class="tu-textarea" style="min-height:120px" placeholder="https://zfhassaan.github.io"></textarea>
        </template>
        <div v-else-if="type === 'wifi'" class="tu-fields">
            <label><span class="tu-label">Network</span><input v-model="ssid" class="tu-input" /></label>
            <label><span class="tu-label">Password</span><input v-model="wifiPassword" class="tu-input" /></label>
            <label>
                <span class="tu-label">Security</span>
                <select v-model="security" class="tu-select">
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None</option>
                </select>
            </label>
        </div>
        <div v-else class="tu-fields">
            <label><span class="tu-label">Name</span><input v-model="contactName" class="tu-input" /></label>
            <label><span class="tu-label">Phone</span><input v-model="phone" class="tu-input" /></label>
            <label><span class="tu-label">Email</span><input v-model="email" class="tu-input" /></label>
        </div>
        <div class="tu-actions">
            <button class="tu-btn tu-btn-primary" type="button" @click="build">Generate</button>
            <button class="tu-btn" type="button" :disabled="!url" @click="save">Download PNG</button>
        </div>
        <p v-if="error" class="tu-error">{{ error }}</p>
        <img v-if="url" class="tu-preview" :src="url" alt="QR code" width="280" height="280" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import QRCode from 'qrcode'

const type = ref('text')
const text = ref('https://zfhassaan.github.io/#/tools')
const ssid = ref('')
const wifiPassword = ref('')
const security = ref('WPA')
const contactName = ref('')
const phone = ref('')
const email = ref('')
const size = ref(320)
const url = ref('')
const error = ref('')

function payload() {
    if (type.value === 'wifi') {
        const esc = (value) => value.replace(/([\\;,:"])/g, '\\$1')
        return `WIFI:T:${security.value};S:${esc(ssid.value)};P:${esc(wifiPassword.value)};;`
    }
    if (type.value === 'vcard') {
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName.value}\nTEL:${phone.value}\nEMAIL:${email.value}\nEND:VCARD`
    }
    return text.value
}

async function build() {
    error.value = ''
    const value = payload()
    if (!value.trim()) {
        error.value = 'Add something to encode.'
        url.value = ''
        return
    }
    try {
        url.value = await QRCode.toDataURL(value, {
            width: Math.min(800, Math.max(180, size.value || 320)),
            margin: 2,
            errorCorrectionLevel: 'M',
            color: { dark: '#0f172a', light: '#ffffff' },
        })
    } catch (e) {
        error.value = e.message
        url.value = ''
    }
}

function save() {
    if (!url.value) return
    const binary = atob(url.value.split(',')[1])
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
    const blobUrl = URL.createObjectURL(new Blob([bytes], { type: 'image/png' }))
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = 'qr.png'
    a.click()
    URL.revokeObjectURL(blobUrl)
}

build()
</script>
