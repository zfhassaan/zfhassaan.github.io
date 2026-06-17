<template>
    <!-- ══ BLOG ══ -->
    <section id="blog" class="section">
        <div class="container">
            <div class="blog-section-header">
                <div class="reveal">
                    <div class="section-label">Writing · Notes &amp; Tutorials</div>
                    <h2 class="section-h2">From the Blog</h2>
                </div>
                <p class="blog-section-intro text-muted reveal">
                    Articles, study material and engineering notes — pulled live from my Blogger feed.
                </p>
            </div>

            <!-- Loading -->
            <div v-if="loading" class="home-blog-grid reveal">
                <div v-for="n in 3" :key="n" class="home-blog-card home-blog-card--skeleton">
                    <div class="skeleton skeleton-thumb"></div>
                    <div class="home-blog-body">
                        <div class="skeleton skeleton-line"></div>
                        <div class="skeleton skeleton-line short"></div>
                    </div>
                </div>
            </div>

            <!-- Error -->
            <div v-else-if="error && !latest.length" class="home-blog-state reveal">
                <p>{{ error }}</p>
                <button class="home-blog-btn" @click="retry">Try again</button>
            </div>

            <!-- Posts -->
            <template v-else>
                <div class="home-blog-grid">
                    <router-link
                        v-for="post in latest"
                        :key="post.id"
                        class="home-blog-card"
                        :to="{ name: 'blog-post', params: { id: post.id } }"
                    >
                        <div class="home-blog-thumb">
                            <img v-if="post.thumbnail" :src="post.thumbnail" :alt="post.title" loading="lazy" />
                            <div v-else class="home-blog-thumb-fallback">{{ initial(post.title) }}</div>
                        </div>
                        <div class="home-blog-body">
                            <div class="home-blog-meta">
                                <span>{{ formatDate(post.published) }}</span>
                                <span v-if="post.tags.length" class="home-blog-tag">{{ post.tags[0] }}</span>
                            </div>
                            <h3 class="home-blog-title">{{ post.title }}</h3>
                            <p class="home-blog-excerpt">{{ post.excerpt }}…</p>
                            <span class="home-blog-cta">
                                Read
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                        </div>
                    </router-link>
                </div>

                <div class="home-blog-foot reveal">
                    <router-link :to="{ name: 'blog' }" class="home-blog-btn home-blog-btn--primary">
                        View all posts
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </router-link>
                </div>
            </template>
        </div>
    </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useBlogFeed } from '@/composables/useBlogFeed'
import { formatDate } from '@/lib/format'

const { posts, loading, error, loadInitial, retry } = useBlogFeed()

// Show only the most recent posts on the home page; the feed is shared with
// the /blog route, so opening the full list reuses the same cached data.
const latest = computed(() => posts.value.slice(0, 3))

function initial(title) {
    return (title || '?').trim().charAt(0).toUpperCase()
}

onMounted(loadInitial)
</script>

<style scoped>
.blog-section-header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 48px;
}

.blog-section-intro {
    max-width: 440px;
    font-size: 0.95rem;
    line-height: 1.7;
}

.home-blog-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
}

@media (max-width: 900px) {
    .home-blog-grid {
        grid-template-columns: 1fr;
    }
}

.home-blog-card {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--card);
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.home-blog-card:not(.home-blog-card--skeleton):hover {
    border-color: rgba(45, 212, 191, 0.45);
    transform: translateY(-3px);
    box-shadow: 0 18px 40px -28px var(--glow-strong);
}

.home-blog-thumb {
    aspect-ratio: 16 / 9;
    background: var(--bg-secondary);
    overflow: hidden;
}

.home-blog-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.home-blog-thumb-fallback {
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

.home-blog-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    flex: 1;
}

.home-blog-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.05em;
    color: var(--text-muted);
}

.home-blog-tag {
    color: var(--accent);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 2px 9px;
}

.home-blog-title {
    font-family: var(--font-head);
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.35;
    color: var(--text-primary);
}

.home-blog-excerpt {
    font-size: 0.86rem;
    line-height: 1.6;
    color: var(--text-secondary);
}

.home-blog-cta {
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

.home-blog-state {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    color: var(--text-secondary);
    font-size: 0.95rem;
}

.home-blog-foot {
    display: flex;
    justify-content: center;
    margin-top: 40px;
}

.home-blog-btn {
    display: inline-flex;
    align-items: center;
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
    transition: border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.home-blog-btn:hover {
    border-color: rgba(45, 212, 191, 0.45);
    color: var(--text-primary);
}

.home-blog-btn--primary {
    background: var(--accent);
    color: var(--bg-primary);
    border-color: var(--accent);
}

.home-blog-btn--primary:hover {
    color: var(--bg-primary);
    box-shadow: 0 8px 24px -10px var(--glow-strong);
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
    margin: 0 20px 10px;
}

.skeleton-line.short {
    width: 60%;
}

.skeleton-line:first-of-type {
    margin-top: 20px;
}

@keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: -100% 0; }
}
</style>
