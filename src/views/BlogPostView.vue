<template>
    <main class="post-page">
        <section class="section">
            <div class="container">
                <router-link :to="{ name: 'blog' }" class="back-link">
                    <ArrowLeft :size="14" />
                    <span>All Articles</span>
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
                            <span class="meta-item">
                                <User :size="13" class="meta-icon" />
                                <span>{{ post.author || 'Hassaan Ali' }}</span>
                            </span>
                            <span class="meta-dot">·</span>
                            <span class="meta-item">{{ formatDate(post.published) }}</span>
                            <span class="meta-dot">·</span>
                            <span class="meta-item">
                                <Clock :size="13" class="meta-icon" />
                                <span>{{ post.readingTime || '5 min read' }}</span>
                            </span>
                        </div>
                        <h1 class="post-title">{{ post.title }}</h1>
                        <div v-if="post.tags.length" class="post-tags">
                            <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
                        </div>
                    </header>

                    <!-- Content is the cleaned Blogger HTML -->
                    <div ref="contentRef" class="post-content" v-html="post.html"></div>

                    <!-- Social Share & Engagement Bar -->
                    <div class="post-share-bar">
                        <div class="share-title">
                            <Share2 :size="15" />
                            <span>Share this article</span>
                        </div>
                        <div class="share-actions">
                            <a :href="linkedinShareUrl" target="_blank" rel="noopener" class="share-btn magnetic" title="Share on LinkedIn">
                                <Linkedin :size="14" />
                                <span>LinkedIn</span>
                            </a>
                            <a :href="twitterShareUrl" target="_blank" rel="noopener" class="share-btn magnetic" title="Share on X (Twitter)">
                                <Twitter :size="14" />
                                <span>X / Twitter</span>
                            </a>
                            <button type="button" class="share-btn copy-share-btn magnetic" @click="copyShareLink" title="Copy article link">
                                <Check v-if="linkCopied" :size="14" />
                                <Copy v-else :size="14" />
                                <span>{{ linkCopied ? 'Link Copied!' : 'Copy Link' }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- Author Bio Card & Lead CTA -->
                    <div class="author-card">
                        <div class="author-avatar-wrap">
                            <img src="/avatar.png" alt="Hassaan Ali" class="author-avatar" />
                        </div>
                        <div class="author-info">
                            <div class="author-badge">Author &amp; Systems Engineer</div>
                            <h3 class="author-name">Hassaan Ali</h3>
                            <p class="author-bio">
                                Senior Backend &amp; Full-Stack Engineer with 9+ years building high-throughput Laravel APIs, RabbitMQ event architectures, and mission-critical payment gateways. Author of open-source packages with 2.5M+ downloads.
                            </p>
                            <div class="author-actions">
                                <router-link :to="{ name: 'home', hash: '#contact' }" class="btn-primary magnetic author-cta">
                                    <span>Hire or Discuss a Project</span>
                                    <ArrowRight :size="14" />
                                </router-link>
                                <a href="https://github.com/zfhassaan" target="_blank" rel="noopener" class="author-link-btn magnetic">
                                    <Github :size="14" />
                                    <span>GitHub</span>
                                </a>
                                <a href="https://linkedin.com/in/zfhassaan" target="_blank" rel="noopener" class="author-link-btn magnetic">
                                    <Linkedin :size="14" />
                                    <span>LinkedIn</span>
                                </a>
                                <a href="https://www.upwork.com/freelancers/zfhassaan" target="_blank" rel="noopener" class="author-link-btn magnetic">
                                    <Briefcase :size="14" />
                                    <span>Upwork</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <footer class="post-footer">
                        <router-link :to="{ name: 'blog' }" class="blog-btn magnetic">
                            <ArrowLeft :size="14" />
                            <span>Back to All Articles</span>
                        </router-link>
                        <a v-if="post.url" :href="post.url" target="_blank" rel="noopener" class="original-link" title="Open original source feed">
                            <span>Original source on Blogger</span>
                            <ExternalLink :size="12" />
                        </a>
                    </footer>
                </article>
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    Clock,
    User,
    Share2,
    Linkedin,
    Twitter,
    Copy,
    Check,
    Github,
    Briefcase
} from 'lucide-vue-next'
import { useBlogFeed } from '@/composables/useBlogFeed'
import { formatDate } from '@/lib/format'

const route = useRoute()
const { error, getPost } = useBlogFeed()

const post = ref(null)
const loadingPost = ref(true)
const contentRef = ref(null)
const linkCopied = ref(false)
const injectedScripts = []

const shareUrl = computed(() => {
    if (typeof window === 'undefined') return ''
    return window.location.href
})

const linkedinShareUrl = computed(() => {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl.value)}`
})

const twitterShareUrl = computed(() => {
    const text = post.value?.title ? `${post.value.title} — by @zfhassaan` : 'Engineering article by Hassaan Ali'
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl.value)}`
})

function copyShareLink() {
    navigator.clipboard?.writeText(shareUrl.value)
    linkCopied.value = true
    setTimeout(() => {
        linkCopied.value = false
    }, 2500)
}

function enhanceCodeBlocks() {
    if (!contentRef.value) return
    const pres = contentRef.value.querySelectorAll('pre')
    pres.forEach((pre) => {
        if (pre.querySelector('.code-copy-btn')) return
        pre.style.position = 'relative'
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.className = 'code-copy-btn'
        btn.setAttribute('aria-label', 'Copy code snippet')
        btn.innerHTML = '<span>Copy</span>'
        btn.onclick = () => {
            const code = pre.querySelector('code')?.innerText || pre.innerText
            navigator.clipboard?.writeText(code)
            btn.innerHTML = '<span>Copied!</span>'
            btn.classList.add('copied')
            setTimeout(() => {
                btn.innerHTML = '<span>Copy</span>'
                btn.classList.remove('copied')
            }, 2000)
        }
        pre.appendChild(btn)
    })
}

function cleanupInjectedScripts() {
    injectedScripts.forEach((s) => s.remove())
    injectedScripts.length = 0
}

async function executeEmbeddedScripts() {
    cleanupInjectedScripts()
    if (!contentRef.value) return

    const scripts = Array.from(contentRef.value.querySelectorAll('script'))
    if (!scripts.length) return

    const externalScripts = []
    const inlineScripts = []

    scripts.forEach((s) => {
        if (s.src) {
            externalScripts.push(s)
        } else {
            inlineScripts.push(s)
        }
        s.remove()
    })

    // 1. Load external library scripts sequentially (e.g., JsBarcode, QRCode)
    for (const oldScript of externalScripts) {
        await new Promise((resolve) => {
            const newScript = document.createElement('script')
            Array.from(oldScript.attributes).forEach((attr) => {
                newScript.setAttribute(attr.name, attr.value)
            })
            newScript.async = false
            newScript.onload = () => resolve()
            newScript.onerror = () => resolve()
            document.head.appendChild(newScript)
            injectedScripts.push(newScript)
        })
    }

    // 2. Execute inline scripts in document head to expose functions globally
    for (const oldScript of inlineScripts) {
        const newScript = document.createElement('script')
        Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value)
        })
        newScript.textContent = oldScript.textContent
        document.head.appendChild(newScript)
        injectedScripts.push(newScript)
    }

    // 3. Auto-trigger generator function on initial render if present
    await nextTick()
    if (typeof window.generateBarcode === 'function') {
        try {
            window.generateBarcode()
        } catch (e) {
            console.debug('Auto-trigger barcode generation:', e)
        }
    }
}

function formatRawCodeDivs() {
    if (!contentRef.value) return
    const divs = contentRef.value.querySelectorAll('div')
    divs.forEach((div) => {
        if (div.closest('pre') || div.querySelector('pre')) return
        const text = (div.innerText || '').trim()
        if (text.startsWith('<?php') && (text.includes('class ') || text.includes('namespace ') || text.length > 80)) {
            const pre = document.createElement('pre')
            const code = document.createElement('code')
            code.className = 'hljs language-php'
            code.textContent = text
            pre.appendChild(code)
            div.replaceWith(pre)
        }
    })
}

async function load(id) {
    loadingPost.value = true
    post.value = null
    post.value = await getPost(String(id))
    loadingPost.value = false
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 })
    await nextTick()
    formatRawCodeDivs()
    enhanceCodeBlocks()
    await executeEmbeddedScripts()
}

onUnmounted(() => {
    cleanupInjectedScripts()
})

watch(() => route.params.id, (id) => { if (id) load(id) }, { immediate: true })
</script>

<style scoped>
.post-page {
    min-height: 100vh;
    padding-top: 72px;
}

.container--full {
    max-width: none;
}

.back-link {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
    width: auto;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.06em;
    color: var(--text-secondary);
    margin-bottom: 28px;
    text-decoration: none;
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
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.04em;
    color: var(--text-muted);
    margin-bottom: 14px;
}

.meta-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

.meta-icon {
    color: var(--accent);
    flex-shrink: 0;
}

.meta-dot {
    color: var(--border);
}

.post-title {
    font-family: var(--font-head);
    font-size: clamp(1.7rem, 4vw, 2.6rem);
    font-weight: 800;
    line-height: 1.25;
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
    background: rgba(45, 212, 191, 0.04);
}

/* ── Social Share Bar ── */
.post-share-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    padding: 18px 0;
    margin: 40px 0 32px;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
}

.share-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-head);
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--text-primary);
}

.share-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.share-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 6px;
    background: var(--card);
    border: 1px solid var(--border);
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 11.5px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.share-btn:hover {
    border-color: var(--accent);
    color: var(--text-primary);
}

.copy-share-btn {
    font-family: var(--font-mono);
}

/* ── Author Bio Card & Lead CTA ── */
.author-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px;
    margin: 36px 0;
    display: flex;
    gap: 22px;
    align-items: flex-start;
}

@media (max-width: 640px) {
    .author-card {
        flex-direction: column;
        padding: 20px;
    }
}

.author-avatar-wrap {
    flex-shrink: 0;
}

.author-avatar {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    border: 2px solid var(--accent);
    object-fit: cover;
}

.author-info {
    flex: 1;
}

.author-badge {
    font-family: var(--font-mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
    margin-bottom: 4px;
}

.author-name {
    font-family: var(--font-head);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 8px;
}

.author-bio {
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: 18px;
}

.author-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.author-cta {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    font-size: 12.5px;
    text-decoration: none;
    white-space: nowrap;
}

.author-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 11.5px;
    text-decoration: none;
    transition: all 0.2s ease;
}

.author-link-btn:hover {
    border-color: rgba(255, 255, 255, 0.25);
    color: var(--text-primary);
}

/* ── Post Footer ── */
.post-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
}

.blog-btn {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    width: auto;
    gap: 8px;
    font-family: var(--font-head);
    font-size: 13.5px;
    font-weight: 600;
    padding: 10px 22px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
}

.blog-btn:hover {
    border-color: rgba(45, 212, 191, 0.45);
    color: var(--text-primary);
}

.original-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--font-mono);
    font-size: 11.5px;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s ease;
}

.original-link:hover {
    color: var(--text-secondary);
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

.post-content :deep(div) {
    color: var(--text-secondary);
}

.post-content :deep(pre),
.post-content :deep(code) {
    font-family: var(--font-mono);
    font-size: 0.88em;
}

.post-content :deep(pre) {
    background: #0d1322 !important;
    border: 1px solid var(--border) !important;
    border-radius: var(--radius);
    padding: 20px;
    padding-top: 38px;
    overflow-x: auto;
    margin: 1.6em 0;
    position: relative;
    color: var(--text-primary);
    line-height: 1.65;
}

.post-content :deep(code:not(pre code)) {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    padding: 3px 8px;
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 0.88em;
    color: var(--accent);
    white-space: pre-wrap;
    word-break: break-word;
}

.post-content :deep(pre code) {
    background: transparent !important;
    padding: 0 !important;
    border: none !important;
    color: inherit;
    font-family: var(--font-mono);
    white-space: pre;
}

.post-content :deep(pre div) {
    background: transparent !important;
    border: none !important;
    color: inherit !important;
}

.post-content :deep(pre .bg-token-main-surface-secondary) {
    background: rgba(255, 255, 255, 0.04) !important;
    border-bottom: 1px solid var(--border) !important;
    border-radius: 4px 4px 0 0;
    padding: 6px 12px;
    margin-bottom: 8px;
    color: var(--text-secondary) !important;
    font-family: var(--font-mono);
    font-size: 0.82rem;
}

/* Syntax Highlighting */
.post-content :deep(.hljs-keyword),
.post-content :deep(.hljs-selector-tag),
.post-content :deep(.hljs-section) {
    color: #f43f5e !important;
    font-weight: 600;
}

.post-content :deep(.hljs-variable),
.post-content :deep(.hljs-template-variable),
.post-content :deep(.hljs-params) {
    color: #38bdf8 !important;
}

.post-content :deep(.hljs-string),
.post-content :deep(.hljs-type) {
    color: #34d399 !important;
}

.post-content :deep(.hljs-number),
.post-content :deep(.hljs-literal) {
    color: #fb923c !important;
}

.post-content :deep(.hljs-built_in),
.post-content :deep(.hljs-title) {
    color: #fbbf24 !important;
}

.post-content :deep(.hljs-comment),
.post-content :deep(.hljs-quote) {
    color: #64748b !important;
    font-style: italic;
}

.post-content :deep(.hljs-subst) {
    color: #e2e8f0 !important;
}

.post-content :deep(.hljs-function) {
    color: #a78bfa !important;
}

/* Floating Code Copy Button */
.post-content :deep(.code-copy-btn) {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 3px 8px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
}

.post-content :deep(.code-copy-btn:hover) {
    background: rgba(45, 212, 191, 0.12);
    border-color: var(--accent);
    color: var(--text-primary);
}

.post-content :deep(.code-copy-btn.copied) {
    background: rgba(16, 185, 129, 0.15);
    border-color: #10b981;
    color: #10b981;
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

/* Embedded Interactive Tools (e.g. Barcode / QR generator) */
.post-content :deep(svg#barcode),
.post-content :deep(#barcode),
.post-content :deep(canvas#barcode) {
    background: #ffffff !important;
    border-radius: 6px;
    padding: 12px;
    display: block;
    margin: 14px 0;
    max-width: 100%;
    box-sizing: border-box;
}

.post-content :deep(input[type="text"]),
.post-content :deep(input[type="number"]),
.post-content :deep(textarea),
.post-content :deep(select) {
    background: var(--bg-secondary) !important;
    border: 1px solid var(--border) !important;
    border-radius: 6px !important;
    color: var(--text-primary) !important;
    font-family: var(--font-body);
    font-size: 0.95rem;
    padding: 10px 12px !important;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.2s ease;
}

.post-content :deep(input[type="text"]:focus),
.post-content :deep(input[type="number"]:focus),
.post-content :deep(textarea:focus),
.post-content :deep(select:focus) {
    border-color: var(--accent) !important;
}

.post-content :deep(button:not(.code-copy-btn)) {
    background: rgba(45, 212, 191, 0.12) !important;
    border: 1px solid var(--accent) !important;
    color: var(--accent) !important;
    padding: 8px 16px !important;
    border-radius: 6px !important;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    margin: 6px 8px 6px 0;
    transition: all 0.2s ease;
}

.post-content :deep(button:not(.code-copy-btn):hover) {
    background: var(--accent) !important;
    color: #070b14 !important;
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
