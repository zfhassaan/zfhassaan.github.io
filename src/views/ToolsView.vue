<template>
    <main class="tools-page">
        <section class="section">
            <div class="container">
                <div class="tools-head">
                    <div class="section-label">Utilities · Free · No signup</div>
                    <h1 class="section-h2">Tools</h1>
                    <p class="tools-intro">
                        {{ tools.length }} free tools for text, images, PDFs, and everyday calculations.
                        They run in your browser, so files are not uploaded.
                    </p>
                </div>

                <div class="tools-controls">
                    <Input v-model="query" class="tools-search" type="search" placeholder="Search tools" aria-label="Search tools" />
                    <div class="tools-filters">
                        <Button type="button" size="sm" :variant="category === 'All' ? 'default' : 'outline'" @click="category = 'All'">
                            All
                        </Button>
                        <Button v-for="name in categories" :key="name" type="button" size="sm"
                            :variant="category === name ? 'default' : 'outline'" @click="category = name">
                            {{ name }}
                        </Button>
                    </div>
                </div>

                <div v-if="filtered.length" class="tools-grid">
                    <router-link v-for="tool in filtered" :key="tool.slug" class="tool-card"
                        :to="{ name: 'tool', params: { slug: tool.slug } }">
                        <div class="tool-card-top">
                            <span class="tool-icon" aria-hidden="true">{{ tool.icon }}</span>
                            <Badge variant="outline">{{ tool.category }}</Badge>
                        </div>
                        <h2 class="tool-name">{{ tool.name }}</h2>
                        <p class="tool-desc">{{ tool.desc }}</p>
                        <span class="tool-cta">
                            Open
                            <ArrowRight :size="14" />
                        </span>
                    </router-link>
                </div>
                <p v-else class="tools-empty">No tools match that search.</p>
            </div>
        </section>
    </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { categories, tools } from '@/data/tools'

const query = ref('')
const category = ref('All')

const filtered = computed(() => {
    const term = query.value.trim().toLowerCase()
    return tools.filter((tool) => {
        if (category.value !== 'All' && tool.category !== category.value) return false
        if (!term) return true
        return `${tool.name} ${tool.desc} ${tool.category}`.toLowerCase().includes(term)
    })
})
</script>

<style scoped>
.section {
    margin-top: 40px !important;
}

.tools-page {
    min-height: 100vh;
    padding-top: 72px;
}

.tools-head {
    max-width: 640px;
    margin-bottom: 48px;
}

.tools-intro {
    margin-top: 16px;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--text-secondary);
}

.tools-controls {
    margin-bottom: 28px;
}

.tools-search {
    width: min(100%, 420px);
    margin-bottom: 16px;
}

.tools-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tools-empty {
    color: var(--text-muted);
}

.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
}

.tool-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--card);
    color: inherit;
    text-decoration: none;
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.tool-card:hover {
    border-color: rgba(45, 212, 191, 0.45);
    transform: translateY(-3px);
    box-shadow: 0 18px 40px -28px var(--glow-strong);
}

.tool-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.tool-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: var(--glow);
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: 18px;
    font-weight: 600;
}

.tool-name {
    font-family: var(--font-head);
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--text-primary);
}

.tool-desc {
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--text-secondary);
}

.tool-cta {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
    width: auto;
    gap: 6px;
    margin-top: auto;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--accent);
}

.tool-cta svg {
    flex-shrink: 0;
}
</style>
