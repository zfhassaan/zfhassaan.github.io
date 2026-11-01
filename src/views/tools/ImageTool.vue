<template>
    <div class="tu-stack">
        <FileDropzone
            :model-value="file ? [file] : []"
            accept="image/*"
            :title="dropTitle"
            :hint="dropHint"
            @update:model-value="onFiles"
        />

        <div v-if="mode === 'compress'" class="tu-fields">
            <label>
                <span class="tu-label">Quality · {{ Math.round(quality * 100) }}%</span>
                <input v-model.number="quality" class="tu-input" type="range" min="0.4" max="1" step="0.01" />
            </label>
            <label>
                <span class="tu-label">Max edge (px, optional)</span>
                <input v-model.number="maxEdge" class="tu-input" type="number" min="0" placeholder="1600" />
            </label>
            <label>
                <span class="tu-label">Format</span>
                <select v-model="format" class="tu-select">
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/webp">WebP</option>
                    <option value="image/png">PNG</option>
                </select>
            </label>
        </div>

        <div v-else-if="mode === 'resize'" class="tu-fields">
            <label>
                <span class="tu-label">Width</span>
                <input v-model.number="width" class="tu-input" type="number" min="1" @input="onWidth" />
            </label>
            <label>
                <span class="tu-label">Height</span>
                <input v-model.number="height" class="tu-input" type="number" min="1" @input="onHeight" />
            </label>
            <label class="tu-check"><input v-model="lock" type="checkbox" /> Lock aspect ratio</label>
            <label>
                <span class="tu-label">Format</span>
                <select v-model="format" class="tu-select">
                    <option value="image/png">PNG</option>
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/webp">WebP</option>
                </select>
            </label>
        </div>

        <div v-else-if="mode === 'convert' || mode === 'strip'" class="tu-fields">
            <label>
                <span class="tu-label">Format</span>
                <select v-model="format" class="tu-select">
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WebP</option>
                </select>
            </label>
        </div>

        <p v-if="error" class="tu-error">{{ error }}</p>
        <div v-if="before" class="tu-stats">
            <div class="tu-stat"><b>{{ beforeLabel }}</b><span>Original</span></div>
            <div v-if="after" class="tu-stat"><b>{{ afterLabel }}</b><span>{{ engine || 'Result' }}</span></div>
        </div>

        <div v-if="mode === 'favicon' && icons.length" class="tu-split">
            <div v-for="icon in icons" :key="icon.size" class="tu-card tu-stack">
                <span class="tu-label">{{ icon.size }} × {{ icon.size }}</span>
                <img class="tu-preview" :src="icon.url" :width="icon.size" :height="icon.size" alt="" />
                <button class="tu-btn" type="button" @click="downloadBlob(icon.blob, `favicon-${icon.size}.png`)">Download</button>
            </div>
        </div>

        <img v-else-if="preview" class="tu-preview" :src="preview" alt="Processed preview" />

        <div class="tu-actions">
            <button v-if="mode !== 'favicon'" class="tu-btn tu-btn-primary" type="button" :disabled="!file || busy" @click="run">
                {{ busy ? 'Working…' : actionLabel }}
            </button>
            <button v-if="blob" class="tu-btn" type="button" @click="downloadBlob(blob, filename)">Download</button>
        </div>
        <p v-if="mode === 'strip'" class="tu-hint">Re-encoding drops EXIF, GPS, and camera notes. The pixels are drawn again, so the file is a new image.</p>
    </div>
</template>

<script setup>
import { computed, onUnmounted, ref } from 'vue'
import FileDropzone from '@/components/tools/FileDropzone.vue'
import { encodeImage } from '@/lib/image-codec'
import { downloadBlob, formatBytes } from '@/lib/tool-files'

const props = defineProps({
    mode: { type: String, required: true },
})

const file = ref(null)
const error = ref('')
const preview = ref('')
const blob = ref(null)
const before = ref(0)
const after = ref(0)
const quality = ref(0.8)
const maxEdge = ref(0)
const format = ref(props.mode === 'compress' ? 'image/jpeg' : 'image/png')
const width = ref(0)
const height = ref(0)
const lock = ref(true)
const ratio = ref(1)
const icons = ref([])
const busy = ref(false)
const engine = ref('')
let natural = { w: 0, h: 0 }

const actionLabel = computed(() => ({
    compress: 'Compress',
    resize: 'Resize',
    convert: 'Convert',
    strip: 'Strip metadata',
}[props.mode] || 'Run'))

const dropTitle = computed(() => ({
    compress: 'Drop an image to compress',
    resize: 'Drop an image to resize',
    convert: 'Drop an image to convert',
    strip: 'Drop a photo to strip metadata',
    favicon: 'Drop an image for favicons',
}[props.mode] || 'Drop an image'))

const dropHint = computed(() => (
    props.mode === 'favicon'
        ? 'Click to browse. Icons are encoded with OxiPNG.'
        : 'Click to browse, or drop a file. JPEG, PNG, and WebP are encoded with WebAssembly.'
))

const beforeLabel = computed(() => formatBytes(before.value))
const afterLabel = computed(() => formatBytes(after.value))
const filename = computed(() => {
    const ext = format.value === 'image/jpeg' ? 'jpg' : format.value === 'image/webp' ? 'webp' : 'png'
    return `image.${ext}`
})

function revokeAll() {
    if (preview.value) URL.revokeObjectURL(preview.value)
    icons.value.forEach((icon) => URL.revokeObjectURL(icon.url))
}

onUnmounted(revokeAll)

function onFiles(list) {
    const next = list[0] || null
    if (!next) {
        file.value = null
        revokeAll()
        preview.value = ''
        blob.value = null
        icons.value = []
        before.value = 0
        after.value = 0
        engine.value = ''
        return
    }
    if (next !== file.value) useFile(next)
}

function loadImage(source) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(source)
        const img = new Image()
        img.onload = () => {
            URL.revokeObjectURL(url)
            resolve(img)
        }
        img.onerror = () => {
            URL.revokeObjectURL(url)
            reject(new Error('This browser could not read that image.'))
        }
        img.src = url
    })
}

async function useFile(next) {
    error.value = ''
    revokeAll()
    preview.value = ''
    blob.value = null
    icons.value = []
    after.value = 0
    file.value = next
    before.value = next.size
    try {
        const img = await loadImage(next)
        if (img.width * img.height > 40000000) throw new Error('Image is too large to process here.')
        natural = { w: img.width, h: img.height }
        ratio.value = img.width / img.height
        width.value = img.width
        height.value = img.height
        if (props.mode === 'favicon') await makeFavicons(img)
    } catch (e) {
        error.value = e.message
        file.value = null
    }
}

function onWidth() {
    if (lock.value && ratio.value) height.value = Math.max(1, Math.round(width.value / ratio.value))
}

function onHeight() {
    if (lock.value && ratio.value) width.value = Math.max(1, Math.round(height.value * ratio.value))
}

async function exportCanvas(canvas, type, q = 90) {
    const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
    const encoded = await encodeImage(imageData, type, q)
    engine.value = encoded.engine
    return encoded.blob
}

function draw(img, w, h) {
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, w, h)
    return canvas
}

async function run() {
    if (!file.value) return
    error.value = ''
    try {
        const img = await loadImage(file.value)
        let w = img.width
        let h = img.height
        if (props.mode === 'resize') {
            w = Math.max(1, Number(width.value) || 1)
            h = Math.max(1, Number(height.value) || 1)
        } else if (props.mode === 'compress' && Number(maxEdge.value) > 0) {
            const edge = Number(maxEdge.value)
            const scale = Math.min(1, edge / Math.max(w, h))
            w = Math.max(1, Math.round(w * scale))
            h = Math.max(1, Math.round(h * scale))
        }
        const type = format.value
        const canvas = draw(img, w, h)
        busy.value = true
        engine.value = ''
        const qualityValue = props.mode === 'compress' ? Math.round(quality.value * 100) : 90
        const result = await exportCanvas(canvas, type, qualityValue)
        if (preview.value) URL.revokeObjectURL(preview.value)
        blob.value = result
        after.value = result.size
        preview.value = URL.createObjectURL(result)
    } catch (e) {
        error.value = e.message
    } finally {
        busy.value = false
    }
}

async function makeFavicons(img) {
    const next = []
    busy.value = true
    try {
        for (const size of [16, 32, 180]) {
            const result = await exportCanvas(draw(img, size, size), 'image/png', 80)
            next.push({ size, blob: result, url: URL.createObjectURL(result) })
        }
        icons.value = next
    } finally {
        busy.value = false
    }
}
</script>
