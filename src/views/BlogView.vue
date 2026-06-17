<template>
    <main class="blog-page container">
        <section class="section">
            <div class="container container--full">
                <div class="blog-head">
                    <div class="section-label">Writing · Notes &amp; Tutorials</div>
                    <h1 class="section-h2">Blog</h1>
                    <p class="blog-intro">
                        Articles, study material and notes — pulled live from my Blogger feed.
                    </p>
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
                <div v-else-if="!posts.length" class="blog-state">
                    <p>No posts found.</p>
                </div>

                <!-- Posts -->
                <template v-else>
                    <div class="blog-grid">
                        <router-link v-for="post in posts" :key="post.id" class="blog-card"
                            :to="{ name: 'blog-post', params: { id: post.id } }">
                            <div class="blog-thumb">
                                <img v-if="post.thumbnail" :src="post.thumbnail" :alt="post.title" loading="lazy" />
                                <div v-else class="blog-thumb-fallback">{{ initial(post.title) }}</div>
                            </div>
                            <div class="blog-card-body">
                                <div class="blog-card-meta">
                                    <span>{{ formatDate(post.published) }}</span>
                                    <span v-if="post.tags.length" class="blog-card-tag">{{ post.tags[0] }}</span>
                                </div>
                                <h2 class="blog-card-title">{{ post.title }}</h2>
                                <p class="blog-card-excerpt">{{ post.excerpt }}…</p>
                                <span class="blog-card-cta">
                                    Read
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </router-link>
                    </div>

                    <div v-if="hasMore" class="blog-more">
                        <button class="blog-btn" :disabled="loadingMore" @click="loadMore">
                            {{ loadingMore ? 'Loading…' : 'Load more posts' }}
                        </button>
                    </div>
                    <p v-if="error && posts.length" class="blog-inline-error">{{ error }}</p>
                </template>
            </div>
        </section>
    </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBlogFeed } from '@/composables/useBlogFeed'
import { formatDate } from '@/lib/format'

const { posts, loading, loadingMore, error, hasMore, loadInitial, loadMore, retry } = useBlogFeed()

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

/* Override the global 1200px cap so the listing spans the full viewport. */
.container--full {
    max-width: none;
}

.blog-head {
    max-width: 660px;
    margin-bottom: 40px;
}

.blog-intro {
    margin-top: 14px;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--text-secondary);
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
    gap: 10px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.05em;
    color: var(--text-muted);
}

.blog-card-tag {
    color: var(--accent);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 2px 9px;
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
    align-items: center;
    gap: 6px;
    margin-top: auto;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--accent);
}

.blog-state {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    color: var(--text-secondary);
    font-size: 0.95rem;
}

.blog-more {
    display: flex;
    justify-content: center;
    margin-top: 36px;
}

.blog-btn {
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
