<template>
    <div class="tu-stack">
        <textarea v-model="text" class="tu-textarea" style="min-height:100px" spellcheck="false" placeholder="Hello"></textarea>
        <div v-for="row in rows" :key="row.name" class="tu-card">
            <div class="tu-label">{{ row.name }}</div>
            <p class="tu-output">{{ row.value }}</p>
            <button class="tu-btn" type="button" style="margin-top:10px" @click="copy(row)">{{ copied === row.name ? 'Copied' : 'Copy' }}</button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { copyText } from '@/lib/tool-files'

const text = ref('Hello zfhassaan')
const copied = ref('')

function mapLetters(value, upperStart, lowerStart) {
    return [...value].map((char) => {
        const code = char.codePointAt(0)
        if (code >= 65 && code <= 90) return String.fromCodePoint(upperStart + (code - 65))
        if (code >= 97 && code <= 122) return String.fromCodePoint(lowerStart + (code - 97))
        return char
    }).join('')
}

function italic(value) {
    return [...value].map((char) => {
        const code = char.codePointAt(0)
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d434 + (code - 65))
        if (code === 104) return '\u210e'
        if (code >= 97 && code <= 103) return String.fromCodePoint(0x1d44e + (code - 97))
        if (code >= 105 && code <= 122) return String.fromCodePoint(0x1d456 + (code - 105))
        return char
    }).join('')
}

const rows = computed(() => [
    { name: 'Bold', value: mapLetters(text.value, 0x1d400, 0x1d41a) },
    { name: 'Italic', value: italic(text.value) },
    { name: 'Monospace', value: mapLetters(text.value, 0x1d670, 0x1d68a) },
    { name: 'Fullwidth', value: mapLetters(text.value, 0xff21, 0xff41) },
    { name: 'Circled', value: mapLetters(text.value, 0x24b6, 0x24d0) },
])

async function copy(row) {
    await copyText(row.value)
    copied.value = row.name
    setTimeout(() => { copied.value = '' }, 1200)
}
</script>
