<template>
    <main class="tool-page">
        <section class="section">
            <div class="container">
                <router-link :to="{ name: 'tools' }" class="back-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    {{ t('tools.back') }}
                </router-link>
                <div class="section-label">{{ t('tools.free', { category: t(`tools.categories.${tool.category}`) }) }}</div>
                <h1 class="section-h2">{{ toolField(tool, 'name') }}</h1>
                <p class="tool-intro">{{ toolField(tool, 'desc') }}</p>
                <slot />
            </div>
        </section>
    </main>
</template>

<script setup>
import { useCopy } from '@/composables/useCopy'

defineProps({
    tool: { type: Object, required: true },
})

const { t, toolField } = useCopy()
</script>
