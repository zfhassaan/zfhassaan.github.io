<template>
    <div class="tu-stack">
        <label class="tu-card tu-stack">
            <span class="tu-label">Token</span>
            <textarea v-model="token" class="tu-textarea" spellcheck="false" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."></textarea>
        </label>
        <p v-if="error" class="tu-error">{{ error }}</p>
        <div v-else-if="decoded" class="tu-split">
            <div class="tu-card">
                <div class="tu-label">Header</div>
                <pre class="tu-output">{{ decoded.header }}</pre>
            </div>
            <div class="tu-card">
                <div class="tu-label">Payload</div>
                <pre class="tu-output">{{ decoded.payload }}</pre>
                <p v-if="decoded.exp" class="tu-hint" style="margin-top:10px">Expires {{ decoded.exp }} · {{ decoded.expired ? 'expired' : 'not expired' }}</p>
            </div>
        </div>
        <p class="tu-hint">This only decodes the token. It does not check the signature, so do not treat the contents as trusted.</p>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { decodeUtf8Base64 } from '@/lib/tool-files'

const token = ref('')

function decodePart(part) {
    const pad = part.replace(/-/g, '+').replace(/_/g, '/')
    const padded = pad + '='.repeat((4 - (pad.length % 4)) % 4)
    return JSON.parse(decodeUtf8Base64(padded))
}

const decoded = computed(() => {
    const raw = token.value.trim()
    if (!raw) return null
    const parts = raw.split('.')
    if (parts.length < 2) return null
    try {
        const header = decodePart(parts[0])
        const payload = decodePart(parts[1])
        let exp = ''
        let expired = false
        if (typeof payload.exp === 'number') {
            const date = new Date(payload.exp * 1000)
            exp = date.toLocaleString()
            expired = date.getTime() < Date.now()
        }
        return {
            header: JSON.stringify(header, null, 2),
            payload: JSON.stringify(payload, null, 2),
            exp,
            expired,
        }
    } catch {
        return { error: true }
    }
})

const error = computed(() => {
    if (!token.value.trim()) return ''
    if (!decoded.value || decoded.value.error) return 'Could not decode that token. Paste the full header.payload.signature string.'
    return ''
})
</script>
