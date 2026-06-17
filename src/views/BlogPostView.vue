<template>
    <main class="post-page container">
        <section class="section">
            <div class="container container--full">
                <router-link :to="{ name: 'blog' }" class="back-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    All posts
                </router-link>

                <!-- Loading -->
                <div v-if="loadingPost" class="post-loading">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta"></div>
                    <div class="skeleton skeleton-block"></div>
                    <div class="skeleton skeleton-block"></div>
                </div>

                <!-- Not found / error -->
                <div v-else-if="!post" class="post-state">
                    <h1 class="section-h2">Post not available</h1>
                    <p>{{ error || "We couldn't find this post in the feed." }}</p>
                    <div class="post-state-actions">
                        <router-link :to="{ name: 'blog' }" class="blog-btn">Back to blog</router-link>
                    </div>
                </div>

                <!-- Post -->
                <article v-else class="post">
                    <header class="post-header">
                        <div class="post-meta">
                            <span>{{ formatDate(post.published) }}</span>
                            <span v-if="post.author">· {{ post.author }}</span>
                        </div>
                        <h1 class="post-title">{{ post.title }}</h1>
                        <div v-if="post.tags.length" class="post-tags">
                            <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
                        </div>
                    </header>

                    <!-- Content is the author's own Blogger HTML -->
                    <div class="post-content" v-html="post.html"></div>

                    <footer class="post-footer">
                        <a v-if="post.url" :href="post.url" target="_blank" rel="noopener" class="blog-btn">
                            View original on Blogger ↗
                        </a>
                    </footer>
                </article>
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogFeed } from '@/composables/useBlogFeed'
import { formatDate } from '@/lib/format'

const route = useRoute()
const { error, getPost } = useBlogFeed()

const post = ref(null)
const loadingPost = ref(true)

async function load(id) {
    loadingPost.value = true
    post.value = null
    post.value = await getPost(String(id))
    loadingPost.value = false
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 })
}

watch(() => route.params.id, (id) => { if (id) load(id) }, { immediate: true })
</script>

<style scoped>
.post-page {
    min-height: 100vh;
    padding-top: 72px;
}

/* Override the global 1200px cap so the post spans the full viewport. */
.container--full {
    max-width: none;
}

.back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.06em;
    color: var(--text-secondary);
    margin-bottom: 28px;
    transition: color 0.2s ease;
}

.back-link:hover {
    color: var(--accent);
}

.post-header {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
}

.post-meta {
    display: flex;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: 14px;
}

.post-title {
    font-family: var(--font-head);
    font-size: clamp(1.7rem, 4vw, 2.6rem);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--text-primary);
}

.post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 18px;
}

.post-tag {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.05em;
    color: var(--accent);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 4px 12px;
}

.post-footer {
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
}

.blog-btn {
    display: inline-flex;
    align-items: center;
    font-family: var(--font-head);
    font-size: 14px;
    font-weight: 600;
    padding: 12px 28px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: border-color 0.2s ease, color 0.2s ease;
}

.blog-btn:hover {
    border-color: rgba(45, 212, 191, 0.45);
    color: var(--text-primary);
}

.post-state {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    color: var(--text-secondary);
}

.post-state-actions {
    margin-top: 8px;
}

/* ── Rendered Blogger content ── */
.post-content {
    font-size: 1.02rem;
    line-height: 1.8;
    color: var(--text-secondary);
}

.post-content :deep(p) {
    margin: 0 0 1.2em;
}

.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3),
.post-content :deep(h4) {
    font-family: var(--font-head);
    color: var(--text-primary);
    line-height: 1.3;
    margin: 1.6em 0 0.6em;
}

.post-content :deep(h2) {
    font-size: 1.5rem;
}

.post-content :deep(h3) {
    font-size: 1.25rem;
}

.post-content :deep(a) {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 2px;
}

.post-content :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius);
    margin: 1.4em 0;
}

.post-content :deep(ul),
.post-content :deep(ol) {
    margin: 0 0 1.2em;
    padding-left: 1.4em;
}

.post-content :deep(li) {
    margin-bottom: 0.5em;
}

.post-content :deep(blockquote) {
    margin: 1.4em 0;
    padding: 8px 18px;
    border-left: 3px solid var(--accent);
    background: var(--surface);
    color: var(--text-secondary);
    border-radius: 0 var(--radius) var(--radius) 0;
}

.post-content :deep(pre),
.post-content :deep(code) {
    font-family: var(--font-mono);
    font-size: 0.88em;
}

.post-content :deep(pre) {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px;
    overflow-x: auto;
    margin: 1.4em 0;
}

.post-content :deep(code) {
    background: var(--bg-secondary);
    padding: 2px 6px;
    border-radius: 4px;
}

.post-content :deep(pre code) {
    background: transparent;
    padding: 0;
}

.post-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.4em 0;
    font-size: 0.92rem;
}

.post-content :deep(th),
.post-content :deep(td) {
    border: 1px solid var(--border);
    padding: 8px 12px;
    text-align: left;
}

.post-content :deep(iframe) {
    max-width: 100%;
}

/* Skeletons */
.post-loading {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.skeleton {
    background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--surface) 37%, var(--bg-secondary) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
    border-radius: 6px;
}

.skeleton-title {
    height: 38px;
    width: 80%;
}

.skeleton-meta {
    height: 14px;
    width: 40%;
}

.skeleton-block {
    height: 120px;
    margin-top: 12px;
}

@keyframes shimmer {
    0% {
        background-position: 100% 0;
    }

    100% {
        background-position: -100% 0;
    }
}
</style>
