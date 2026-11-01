<template>
    <div class="tu-stack">
        <div class="tu-fields">
            <label>
                <span class="tu-label">Title</span>
                <input v-model="title" class="tu-input" />
            </label>
            <label>
                <span class="tu-label">URL</span>
                <input v-model="url" class="tu-input" />
            </label>
            <label>
                <span class="tu-label">Image URL</span>
                <input v-model="image" class="tu-input" />
            </label>
            <label>
                <span class="tu-label">Site name</span>
                <input v-model="site" class="tu-input" />
            </label>
        </div>
        <label>
            <span class="tu-label">Description</span>
            <textarea v-model="description" class="tu-textarea" style="min-height:90px"></textarea>
        </label>
        <div class="tu-card">
            <div class="tu-label">Search preview</div>
            <p style="color:#60a5fa;font-size:1.05rem;margin-top:8px">{{ title || 'Page title' }}</p>
            <p style="color:var(--success);font-size:0.8rem">{{ url || 'https://example.com' }}</p>
            <p class="tu-hint" style="margin-top:6px">{{ description || 'Description' }}</p>
        </div>
        <div class="tu-card">
            <div class="tu-label">Tags</div>
            <pre class="tu-output">{{ tags }}</pre>
            <button class="tu-btn" type="button" style="margin-top:10px" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { copyText } from '@/lib/tool-files'

const title = ref('zfhassaan — Senior Full Stack Engineer')
const description = ref('Portfolio, writing, and free browser tools.')
const url = ref('https://zfhassaan.github.io/')
const image = ref('https://zfhassaan.github.io/avatar.png')
const site = ref('zfhassaan')
const copied = ref(false)

function attr(value) {
    return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

const tags = computed(() => [
    `<title>${attr(title.value)}</title>`,
    `<meta name="description" content="${attr(description.value)}" />`,
    `<link rel="canonical" href="${attr(url.value)}" />`,
    `<meta property="og:title" content="${attr(title.value)}" />`,
    `<meta property="og:description" content="${attr(description.value)}" />`,
    `<meta property="og:url" content="${attr(url.value)}" />`,
    `<meta property="og:image" content="${attr(image.value)}" />`,
    `<meta property="og:site_name" content="${attr(site.value)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attr(title.value)}" />`,
    `<meta name="twitter:description" content="${attr(description.value)}" />`,
    `<meta name="twitter:image" content="${attr(image.value)}" />`,
].join('\n'))

async function copy() {
    await copyText(tags.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1200)
}
</script>
