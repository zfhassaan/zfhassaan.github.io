<template>
    <div class="tu-stack">
        <div class="tu-fields">
            <label><span class="tu-label">Count</span><input v-model.number="count" class="tu-input" type="number" min="1" max="40" /></label>
            <label>
                <span class="tu-label">Unit</span>
                <select v-model="unit" class="tu-select">
                    <option value="paragraphs">Paragraphs</option>
                    <option value="sentences">Sentences</option>
                    <option value="words">Words</option>
                </select>
            </label>
        </div>
        <div class="tu-actions">
            <button class="tu-btn tu-btn-primary" type="button" @click="generate">Generate</button>
            <button class="tu-btn" type="button" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
        </div>
        <div class="tu-card"><p class="tu-output">{{ output }}</p></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { copyText } from '@/lib/tool-files'

const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')

const count = ref(3)
const unit = ref('paragraphs')
const output = ref('')
const copied = ref(false)

function words(total) {
    const list = []
    for (let i = 0; i < total; i++) list.push(WORDS[i % WORDS.length])
    return list
}

function sentence(start) {
    const size = 8 + (start % 6)
    const chunk = words(size)
    chunk[0] = chunk[0].charAt(0).toUpperCase() + chunk[0].slice(1)
    return `${chunk.join(' ')}.`
}

function generate() {
    const total = Math.min(40, Math.max(1, count.value || 1))
    copied.value = false
    if (unit.value === 'words') {
        output.value = words(total).join(' ')
        return
    }
    if (unit.value === 'sentences') {
        output.value = Array.from({ length: total }, (_, i) => sentence(i)).join(' ')
        return
    }
    output.value = Array.from({ length: total }, (_, p) => (
        Array.from({ length: 4 }, (__, s) => sentence(p * 4 + s)).join(' ')
    )).join('\n\n')
}

async function copy() {
    await copyText(output.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1200)
}

generate()
</script>
