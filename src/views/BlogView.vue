<template>
    <main class="blog-page">
        <section class="section">
            <div class="container">
                <div class="blog-head">
                    <div class="section-label">Engineering Notes &amp; Tutorials</div>
                    <h1 class="section-h2">Technical Articles</h1>
                    <p class="blog-intro">
                        In-depth guides on Laravel, RabbitMQ distributed architectures, AWS deployments, payment gateway patterns, and backend performance engineering.
                    </p>
                </div>

                <!-- Category Filters -->
                <div class="category-filters" role="tablist" aria-label="Article categories">
                    <button
                        v-for="cat in categories"
                        :key="cat.id"
                        type="button"
                        class="filter-pill"
                        :class="{ active: selectedCategory === cat.id }"
                        @click="selectedCategory = cat.id"
                    >
                        <span>{{ cat.label }}</span>
                        <span v-if="cat.id === 'all'" class="filter-count">({{ posts.length }})</span>
                    </button>
                </div>

                <!-- Loading -->
                <div v-if="loading" class="blog-grid">
                    <div v-for="n in 6" :key="n" class="blog-card blog-card--skeleton">
                        <div class="skeleton skeleton-thumb"></div>
                        <div class="blog-card-body">
                            <div class="skeleton skeleton-line"></div>
                            <div class="skeleton skeleton-line short"></div>
                        </div>
                    </div>
                </div>

                <!-- Error -->
                <div v-else-if="error && !posts.length" class="blog-state">
                    <p>{{ error }}</p>
                    <button class="blog-btn" @click="retry">Try again</button>
                </div>

                <!-- Empty -->
                <div v-else-if="!filteredPosts.length" class="blog-state">
                    <p>No articles found in this category.</p>
                    <button class="filter-pill active" @click="selectedCategory = 'all'">Show all articles</button>
                </div>

                <!-- Posts -->
                <template v-else>
                    <div class="blog-grid">
                        <router-link
                            v-for="post in filteredPosts"
                            :key="post.id"
                            class="blog-card"
                            :to="{ name: 'blog-post', params: { id: post.id } }"
                        >
                            <div class="blog-thumb">
                                <img v-if="post.thumbnail" :src="post.thumbnail" :alt="post.title" loading="lazy" />
                                <div v-else class="blog-thumb-fallback">{{ initial(post.title) }}</div>
                            </div>
                            <div class="blog-card-body">
                                <div class="blog-card-meta">
                                    <span>{{ formatDate(post.published) }}</span>
                                    <span class="meta-dot">·</span>
                                    <span>{{ post.readingTime || '5 min read' }}</span>
                                    <span v-if="post.tags.length" class="blog-card-tag">{{ post.tags[0] }}</span>
                                </div>
                                <h2 class="blog-card-title">{{ post.title }}</h2>
                                <p class="blog-card-excerpt">{{ post.excerpt }}…</p>
                                <span class="blog-card-cta">
                                    Read Article
                                    <ArrowRight :size="14" />
                                </span>
                            </div>
                        </router-link>
                    </div>

                    <div v-if="hasMore && selectedCategory === 'all'" class="blog-more">
                        <button class="blog-btn" :disabled="loadingMore" @click="loadMore">
                            {{ loadingMore ? 'Loading…' : 'Load more articles' }}
                        </button>
                    </div>
                    <p v-if="error && posts.length" class="blog-inline-error">{{ error }}</p>
                </template>
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { useBlogFeed } from '@/composables/useBlogFeed'
import { formatDate } from '@/lib/format'

const { posts, loading, loadingMore, error, hasMore, loadInitial, loadMore, retry } = useBlogFeed()

const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'laravel', label: 'Laravel & PHP', match: ['laravel', 'php', 'lumen'] },
    { id: 'architecture', label: 'Architecture & Queues', match: ['microservices', 'docker', 'rabbitmq', 'amqp', 'distributed'] },
    { id: 'devops', label: 'DevOps & AWS', match: ['aws', 'lambda', 'ci', 'cd', 'deployments', 'ssh', 'bash'] },
    { id: 'apis', label: 'APIs & Web Tools', match: ['api', 'rest', 'javascript', 'frontend', 'ux', 'tools'] },
]

const selectedCategory = ref('all')

const filteredPosts = computed(() => {
    if (selectedCategory.value === 'all') return posts.value
    const cat = categories.find((c) => c.id === selectedCategory.value)
    if (!cat || !cat.match) return posts.value
    return posts.value.filter((post) => {
        const postTags = (post.tags || []).map((t) => t.toLowerCase())
        const titleWords = (post.title || '').toLowerCase()
        return cat.match.some((m) => postTags.some((t) => t.includes(m)) || titleWords.includes(m))
    })
})

function initial(title) {
    return (title || '?').trim().charAt(0).toUpperCase()
}

onMounted(loadInitial)
</script>

<style scoped>
.blog-page {
    min-height: 100vh;
    padding-top: 72px;
}

.container--full {
    max-width: none;
}

.blog-head {
    max-width: 660px;
    margin-bottom: 32px;
}

.blog-intro {
    margin-top: 14px;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--text-secondary);
}

/* ── Category Filters ── */
.category-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;
}

.filter-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.02);
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 11.5px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.filter-pill:hover {
    border-color: rgba(45, 212, 191, 0.4);
    color: var(--text-primary);
}

.filter-pill.active {
    background: rgba(45, 212, 191, 0.12);
    border-color: var(--accent);
    color: var(--text-primary);
    font-weight: 500;
}

.filter-count {
    opacity: 0.7;
    font-size: 10.5px;
}

.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 22px;
}

.blog-card {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--card);
    text-decoration: none;
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.blog-card:not(.blog-card--skeleton):hover {
    border-color: rgba(45, 212, 191, 0.45);
    transform: translateY(-3px);
    box-shadow: 0 18px 40px -28px var(--glow-strong);
}

.blog-thumb {
    aspect-ratio: 16 / 9;
    background: var(--bg-secondary);
    overflow: hidden;
}

.blog-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.blog-thumb-fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-head);
    font-size: 2.4rem;
    font-weight: 700;
    color: var(--accent);
    background: var(--glow);
}

.blog-card-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    flex: 1;
}

.blog-card-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.04em;
    color: var(--text-muted);
}

.meta-dot {
    color: var(--border);
}

.blog-card-tag {
    color: var(--accent);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 2px 9px;
    font-size: 10.5px;
    background: rgba(45, 212, 191, 0.04);
}

.blog-card-title {
    font-family: var(--font-head);
    font-size: 1.15rem;
    font-weight: 700;
    line-height: 1.35;
    color: var(--text-primary);
}

.blog-card-excerpt {
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-secondary);
}

.blog-card-cta {
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

.blog-card-cta svg {
    flex-shrink: 0;
}

.blog-state {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    color: var(--text-secondary);
    font-size: 0.95rem;
    padding: 32px 0;
}

.blog-more {
    display: flex;
    justify-content: center;
    margin-top: 36px;
}

.blog-btn {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    width: auto;
    max-width: 100%;
    gap: 8px;
    font-family: var(--font-head);
    font-size: 14px;
    font-weight: 600;
    padding: 12px 28px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.2s ease, color 0.2s ease;
}

.blog-btn svg {
    flex-shrink: 0;
}

.blog-btn:hover:not(:disabled) {
    border-color: rgba(45, 212, 191, 0.45);
    color: var(--text-primary);
}

.blog-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.blog-inline-error {
    margin-top: 20px;
    color: #F87171;
    font-size: 0.85rem;
    text-align: center;
}

/* Skeleton */
.skeleton {
    background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--surface) 37%, var(--bg-secondary) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
    border-radius: 6px;
}

.skeleton-thumb {
    aspect-ratio: 16 / 9;
    border-radius: 0;
}

.skeleton-line {
    height: 14px;
    margin-bottom: 10px;
}

.skeleton-line.short {
    width: 60%;
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
