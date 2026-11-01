<template>
    <main class="tool-page">
        <section class="section">
            <div class="container">
                <router-link :to="{ name: 'tools' }" class="back-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    All tools
                </router-link>
                <div class="section-label">{{ tool.category }} · Free · In your browser</div>
                <h1 class="section-h2">{{ tool.name }}</h1>
                <p class="tool-intro">{{ tool.desc }}</p>
                <slot />
            </div>
        </section>
    </main>
</template>

<script setup>
defineProps({
    tool: { type: Object, required: true },
})
</script>
