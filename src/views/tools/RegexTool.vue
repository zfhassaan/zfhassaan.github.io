<template>
    <div class="tu-stack">
        <div class="tu-fields">
            <label>
                <span class="tu-label">Pattern</span>
                <input v-model="pattern" class="tu-input" spellcheck="false" placeholder="(\w+)@(\w+\.\w+)" />
            </label>
            <label>
                <span class="tu-label">Flags</span>
                <input v-model="flags" class="tu-input" spellcheck="false" placeholder="g" />
            </label>
            <label>
                <span class="tu-label">Replacement</span>
                <input v-model="replacement" class="tu-input" spellcheck="false" placeholder="$1" />
            </label>
        </div>
        <label class="tu-card tu-stack">
            <span class="tu-label">Test text</span>
            <textarea v-model="sample" class="tu-textarea" spellcheck="false"></textarea>
        </label>
        <p v-if="error" class="tu-error">{{ error }}</p>
        <div v-else class="tu-stats">
            <div class="tu-stat"><b>{{ matches.length }}</b><span>Matches</span></div>
        </div>
        <div v-if="matches.length" class="tu-card tu-stack">
            <div v-for="(match, index) in matches" :key="index" class="tu-output">
                {{ index + 1 }}. "{{ match[0] }}" at {{ match.index }}
                <template v-if="match.length > 1"> · groups: {{ match.slice(1).join(', ') }}</template>
            </div>
        </div>
        <div v-if="replaced !== null" class="tu-card">
            <div class="tu-label">Replacement preview</div>
            <pre class="tu-output">{{ replaced }}</pre>
        </div>
        <p class="tu-hint">The test text is capped at 5,000 characters so a heavy pattern cannot lock the page.</p>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const pattern = ref('\\b\\w+@\\w+\\.\\w+\\b')
const flags = ref('g')
const replacement = ref('')
const sample = ref('Write ada@example.com or lin@studio.dev')

const result = computed(() => {
    const text = sample.value.slice(0, 5000)
    if (!pattern.value) return { error: '', matches: [], replaced: null }
    if (pattern.value.length > 300) return { error: 'Pattern is limited to 300 characters.', matches: [], replaced: null }
    let re
    try {
        const safeFlags = [...new Set(flags.value.replace(/[^gimsuy]/g, ''))].join('')
        re = new RegExp(pattern.value, safeFlags.includes('g') ? safeFlags : safeFlags + 'g')
    } catch (e) {
        return { error: e.message, matches: [], replaced: null }
    }
    const matches = []
    let guard = 0
    for (const match of text.matchAll(re)) {
        matches.push(match)
        if (++guard > 200) break
    }
    let replaced = null
    if (replacement.value) {
        try {
            replaced = text.replace(re, replacement.value)
        } catch (e) {
            return { error: e.message, matches, replaced: null }
        }
    }
    return { error: '', matches, replaced }
})

const error = computed(() => result.value.error)
const matches = computed(() => result.value.matches)
const replaced = computed(() => result.value.replaced)
</script>
