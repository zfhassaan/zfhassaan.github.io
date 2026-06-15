<template>
    <main class="tools-page">
        <section class="section">
            <div class="container">
                <div class="tools-head">
                    <div class="section-label">Utilities · Client-side</div>
                    <h1 class="section-h2">Developer Tools</h1>
                    <p class="tools-intro">
                        A small, growing set of fast, privacy-friendly tools that run entirely in your
                        browser — nothing is uploaded to a server.
                    </p>
                </div>

                <div class="tools-grid">
                    <router-link v-for="tool in tools" :key="tool.name" class="tool-card"
                        :class="{ 'tool-card--soon': !tool.to }" :to="tool.to || ''"
                        @click="!tool.to && $event.preventDefault()">
                        <div class="tool-card-top">
                            <span class="tool-icon" aria-hidden="true">{{ tool.icon }}</span>
                            <span v-if="!tool.to" class="tool-badge">Soon</span>
                        </div>
                        <h2 class="tool-name">{{ tool.name }}</h2>
                        <p class="tool-desc">{{ tool.desc }}</p>
                        <span v-if="tool.to" class="tool-cta">
                            Open
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </router-link>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
const tools = [
    {
        name: 'JSON Formatter',
        icon: '{ }',
        desc: 'Beautify, validate, and minify JSON with adjustable indentation.',
        to: { name: 'tools-json' },
    },
    {
        name: 'QR Code Generator',
        icon: '▦',
        desc: 'Turn any text or URL into a downloadable QR code.',
        to: null,
    },
    {
        name: 'PDF Merge',
        icon: '⧉',
        desc: 'Combine multiple PDF files into one, right in the browser.',
        to: null,
    },
]
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
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.tool-card:not(.tool-card--soon):hover {
    border-color: rgba(45, 212, 191, 0.45);
    transform: translateY(-3px);
    box-shadow: 0 18px 40px -28px var(--glow-strong);
}

.tool-card--soon {
    opacity: 0.6;
    cursor: default;
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

.tool-badge {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 3px 10px;
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
    align-items: center;
    gap: 6px;
    margin-top: auto;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--accent);
}
</style>
