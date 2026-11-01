<template>
    <div class="tu-stack">
        <textarea v-model="text" class="tu-textarea" spellcheck="false" placeholder="convert this label"></textarea>
        <div class="tu-stack">
            <div v-for="row in rows" :key="row.name" class="tu-card">
                <div class="tu-label">{{ row.name }}</div>
                <p class="tu-output">{{ row.value }}</p>
                <button class="tu-btn" type="button" style="margin-top:10px" @click="copy(row)">{{ copied === row.name ? 'Copied' : 'Copy' }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { copyText } from '@/lib/tool-files'

const text = ref('Senior full stack engineer')
const copied = ref('')

function words(value) {
    return value
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .split(/[^A-Za-z0-9]+/)
        .filter(Boolean)
}

function cap(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

const rows = computed(() => {
    const parts = words(text.value)
    const sentence = parts.join(' ')
    return [
        { name: 'Upper', value: text.value.toUpperCase() },
        { name: 'Lower', value: text.value.toLowerCase() },
        { name: 'Title', value: parts.map(cap).join(' ') },
        { name: 'Sentence', value: sentence ? cap(sentence) : '' },
        { name: 'camelCase', value: parts.map((w, i) => (i === 0 ? w.toLowerCase() : cap(w))).join('') },
        { name: 'PascalCase', value: parts.map(cap).join('') },
        { name: 'snake_case', value: parts.map((w) => w.toLowerCase()).join('_') },
        { name: 'kebab-case', value: parts.map((w) => w.toLowerCase()).join('-') },
        { name: 'CONSTANT_CASE', value: parts.map((w) => w.toUpperCase()).join('_') },
    ]
})

async function copy(row) {
    await copyText(row.value)
    copied.value = row.name
    setTimeout(() => { copied.value = '' }, 1200)
}
</script>
