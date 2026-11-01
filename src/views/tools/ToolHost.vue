<script setup>
import { computed, defineAsyncComponent, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { tools } from '@/data/tools'
import ToolPage from '@/components/tools/ToolPage.vue'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
const tool = computed(() => tools.find((item) => item.slug === slug.value) || null)

const cache = new Map()
const view = computed(() => {
    const current = tool.value
    if (!current?.load) return null
    if (!cache.has(current.slug)) cache.set(current.slug, defineAsyncComponent(current.load))
    return cache.get(current.slug)
})

const defaultTitle = document.title
watch(tool, (value) => {
    document.title = value ? `${value.name} · zfhassaan` : defaultTitle
}, { immediate: true })
onUnmounted(() => { document.title = defaultTitle })
</script>

<template>
    <component :is="view" v-if="tool && view && tool.bare" :key="slug" />
    <ToolPage v-else-if="tool && view" :tool="tool" :key="slug">
        <component :is="view" v-bind="tool.props || {}" />
    </ToolPage>
    <main v-else class="tool-page">
        <section class="section">
            <div class="container">
                <router-link :to="{ name: 'tools' }" class="back-link">All tools</router-link>
                <h1 class="section-h2">Tool not found</h1>
                <p class="tool-intro">That tool is not in the catalog.</p>
            </div>
        </section>
    </main>
</template>
