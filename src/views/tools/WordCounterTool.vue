<template>
    <div class="tu-stack">
        <textarea v-model="text" class="tu-textarea" spellcheck="false" placeholder="Paste or type text"></textarea>
        <div class="tu-stats">
            <div class="tu-stat"><b>{{ stats.words }}</b><span>Words</span></div>
            <div class="tu-stat"><b>{{ stats.chars }}</b><span>Characters</span></div>
            <div class="tu-stat"><b>{{ stats.noSpace }}</b><span>No spaces</span></div>
            <div class="tu-stat"><b>{{ stats.sentences }}</b><span>Sentences</span></div>
            <div class="tu-stat"><b>{{ stats.paragraphs }}</b><span>Paragraphs</span></div>
            <div class="tu-stat"><b>{{ stats.read }}</b><span>Reading min</span></div>
            <div class="tu-stat"><b>{{ stats.speak }}</b><span>Speaking min</span></div>
        </div>
        <p class="tu-hint">Reading time uses 200 words per minute. Speaking time uses 130.</p>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const text = ref('')

const stats = computed(() => {
    const value = text.value
    const words = value.trim() ? value.trim().split(/\s+/).length : 0
    const sentences = value.trim() ? (value.match(/[^.!?]+[.!?]+/g) || (words ? [value] : [])).length : 0
    const paragraphs = value.trim() ? value.trim().split(/\n\s*\n/).filter(Boolean).length : 0
    return {
        words,
        chars: value.length,
        noSpace: value.replace(/\s/g, '').length,
        sentences,
        paragraphs,
        read: words ? Math.max(1, Math.round(words / 200)) : 0,
        speak: words ? Math.max(1, Math.round(words / 130)) : 0,
    }
})
</script>
