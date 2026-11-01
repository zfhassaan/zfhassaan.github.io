<template>
    <div class="tu-stack">
        <textarea v-model="text" class="tu-textarea" spellcheck="false" placeholder="One line per entry"></textarea>
        <div class="tu-actions">
            <label class="tu-check"><input v-model="ignoreCase" type="checkbox" /> Ignore case</label>
            <label class="tu-check"><input v-model="trim" type="checkbox" /> Trim lines</label>
            <label>
                <span class="tu-label">Sort</span>
                <select v-model="sort" class="tu-select">
                    <option value="none">Keep order</option>
                    <option value="asc">A → Z</option>
                    <option value="desc">Z → A</option>
                </select>
            </label>
        </div>
        <div class="tu-stats">
            <div class="tu-stat"><b>{{ kept.length }}</b><span>Kept</span></div>
            <div class="tu-stat"><b>{{ removed }}</b><span>Removed</span></div>
        </div>
        <div class="tu-card">
            <pre class="tu-output">{{ kept.join('\n') }}</pre>
            <button class="tu-btn" type="button" style="margin-top:10px" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { copyText } from '@/lib/tool-files'

const text = ref('alpha\nbeta\nalpha\nGamma\ngamma')
const ignoreCase = ref(true)
const trim = ref(true)
const sort = ref('none')
const copied = ref(false)

const result = computed(() => {
    const seen = new Set()
    const kept = []
    let removed = 0
    text.value.split('\n').forEach((line) => {
        const value = trim.value ? line.trim() : line
        if (!value) return
        const key = ignoreCase.value ? value.toLowerCase() : value
        if (seen.has(key)) {
            removed += 1
            return
        }
        seen.add(key)
        kept.push(value)
    })
    if (sort.value === 'asc') kept.sort((a, b) => a.localeCompare(b))
    if (sort.value === 'desc') kept.sort((a, b) => b.localeCompare(a))
    return { kept, removed }
})

const kept = computed(() => result.value.kept)
const removed = computed(() => result.value.removed)

async function copy() {
    await copyText(kept.value.join('\n'))
    copied.value = true
    setTimeout(() => { copied.value = false }, 1200)
}
</script>
