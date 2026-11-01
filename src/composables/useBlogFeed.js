import { ref, computed } from 'vue'

/*
 * Blogger feed loader.
 *
 * The blog's feed sends no CORS headers, so a plain fetch() is blocked in the
 * browser. Blogger does support JSONP via `alt=json-in-script&callback=`, which
 * we use here by injecting a <script> tag — this works from any static origin
 * (e.g. GitHub Pages) with no backend.
 *
 * Full-content entries are cached in module scope so the list page and the
 * single-post page share one source of truth (the post opened from the list is
 * always already in cache; deep links page through the feed until found).
 */

const FEED_BASE = 'https://sstudymaterial.blogspot.com/feeds/posts/default'
const PAGE_SIZE = 12
const JSONP_TIMEOUT = 20000

const posts = ref([])
const total = ref(0)
const loading = ref(false)
const loadingMore = ref(false)
const error = ref('')

let nextIndex = 1
let initialized = false

function jsonp(url) {
    return new Promise((resolve, reject) => {
        const cbName = '__blogcb_' + Math.random().toString(36).slice(2)
        const script = document.createElement('script')
        let settled = false

        const cleanup = () => {
            delete window[cbName]
            script.remove()
        }

        const timer = setTimeout(() => {
            if (settled) return
            settled = true
            cleanup()
            reject(new Error('The blog feed took too long to respond.'))
        }, JSONP_TIMEOUT)

        window[cbName] = (data) => {
            if (settled) return
            settled = true
            clearTimeout(timer)
            cleanup()
            resolve(data)
        }

        script.onerror = () => {
            if (settled) return
            settled = true
            clearTimeout(timer)
            cleanup()
            reject(new Error('Could not reach the blog feed.'))
        }

        const sep = url.includes('?') ? '&' : '?'
        script.src = `${url}${sep}alt=json-in-script&callback=${cbName}`
        document.head.appendChild(script)
    })
}

function stripHtml(html) {
    const tmp = document.createElement('div')
    // Drop embedded styles/scripts so excerpts don't leak CSS from Blogger posts.
    tmp.innerHTML = (html || '').replace(/<(style|script)[^>]*>[\s\S]*?<\/\1>/gi, '')
    return (tmp.textContent || '').replace(/\s+/g, ' ').trim()
}

function cleanBloggerHtml(html) {
    if (!html) return ''
    return html
        // Drop embedded <style> tags so rogue rules (e.g. div { color: black }) never pollute the theme
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        // Drop Blogger footer ads and AdSense containers
        .replace(/<div class="blogger-post-footer"[^>]*>[\s\S]*?<\/div>/gi, '')
        .replace(/<ins class="adsbygoogle"[^>]*>[\s\S]*?<\/ins>/gi, '')
        // Only strip out Google AdSense scripts
        .replace(/<script[^>]*src=["'][^"']*adsbygoogle\.js["'][^>]*><\/script>/gi, '')
        .replace(/<script[^>]*>\s*\(adsbygoogle\s*=\s*window\.adsbygoogle\s*\|\|\s*\[\]\)\.push\(\{.*?\}\);\s*<\/script>/gi, '')
        .trim()
}

function calculateReadingTime(text) {
    const words = (text || '').trim().split(/\s+/).filter(Boolean).length
    const minutes = Math.max(1, Math.ceil(words / 200))
    return `${minutes} min read`
}

function firstImage(html) {
    const m = (html || '').match(/<img[^>]+src=["']([^"']+)["']/i)
    return m ? m[1] : ''
}

// Blogger thumbnails come back tiny (e.g. /s72-c/); request a larger crop.
function upscaleThumb(url) {
    if (!url) return ''
    return url
        .replace(/\/s\d+(-c)?\//, '/w640-h360-p-k-no-nu/')
        .replace(/=s\d+(-c)?$/, '=w640')
}

function readPostId(entry) {
    const raw = entry.id?.$t || ''
    const m = raw.match(/post-(\d+)/)
    return m ? m[1] : raw
}

function normalize(entry) {
    const rawHtml = entry.content?.$t || entry.summary?.$t || ''
    const html = cleanBloggerHtml(rawHtml)
    const text = stripHtml(rawHtml)
    const alt = (entry.link || []).find((l) => l.rel === 'alternate' && l.type === 'text/html')
    const thumb = upscaleThumb(entry['media$thumbnail']?.url || '') || firstImage(rawHtml)
    const rawAuthor = entry.author?.[0]?.name?.$t || ''
    const author = (!rawAuthor || rawAuthor.toLowerCase() === 'admin') ? 'Hassaan Ali' : rawAuthor

    return {
        id: readPostId(entry),
        title: entry.title?.$t || 'Untitled',
        url: alt?.href || '',
        published: entry.published?.$t || '',
        updated: entry.updated?.$t || '',
        author,
        tags: (entry.category || []).map((c) => c.term).filter(Boolean),
        thumbnail: thumb,
        html,
        excerpt: text.slice(0, 180),
        readingTime: calculateReadingTime(text),
    }
}

async function fetchPage(startIndex) {
    const data = await jsonp(`${FEED_BASE}?max-results=${PAGE_SIZE}&start-index=${startIndex}`)
    const feed = data?.feed
    if (!feed) throw new Error('The blog feed returned an unexpected response.')
    total.value = parseInt(feed['openSearch$totalResults']?.$t || '0', 10) || 0
    return (feed.entry || []).map(normalize)
}

async function loadInitial() {
    if (initialized) return
    initialized = true
    loading.value = true
    error.value = ''
    try {
        const batch = await fetchPage(1)
        posts.value = batch
        nextIndex = 1 + batch.length
    } catch (e) {
        error.value = e.message || 'Failed to load posts.'
        initialized = false
    } finally {
        loading.value = false
    }
}

async function loadMore() {
    if (loadingMore.value || loading.value) return
    if (posts.value.length >= total.value) return
    loadingMore.value = true
    error.value = ''
    try {
        const batch = await fetchPage(nextIndex)
        posts.value = posts.value.concat(batch)
        nextIndex += batch.length
    } catch (e) {
        error.value = e.message || 'Failed to load more posts.'
    } finally {
        loadingMore.value = false
    }
}

async function getPost(id) {
    await loadInitial()
    let found = posts.value.find((p) => p.id === id)
    // Deep link to a post that isn't in the first page: page through until found.
    while (!found && posts.value.length < total.value) {
        await loadMore()
        found = posts.value.find((p) => p.id === id)
        if (error.value) break
    }
    return found || null
}

async function retry() {
    initialized = false
    nextIndex = 1
    posts.value = []
    await loadInitial()
}

const hasMore = computed(() => total.value > 0 && posts.value.length < total.value)

export function useBlogFeed() {
    return {
        posts,
        total,
        loading,
        loadingMore,
        error,
        hasMore,
        loadInitial,
        loadMore,
        getPost,
        retry,
    }
}
