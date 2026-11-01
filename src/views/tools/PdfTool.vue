<template>
    <div class="tu-stack">
        <FileDropzone
            :model-value="files"
            :accept="mode === 'images' ? 'image/jpeg,image/png' : 'application/pdf'"
            :multiple="mode !== 'split'"
            :reorder="mode !== 'split'"
            :title="mode === 'split' ? t('pdf.splitTitle') : mode === 'images' ? t('pdf.imagesTitle') : t('pdf.mergeTitle')"
            :hint="mode === 'split' ? t('pdf.splitHint') : t('pdf.hint')"
            @update:model-value="onFiles"
        />

        <label v-if="mode === 'split'">
            <span class="tu-label">{{ t('pdf.pages') }}</span>
            <input v-model="range" class="tu-input" placeholder="1-3,5" />
        </label>
        <p v-if="pageCount" class="tu-hint">{{ t('pdf.pageCount', { count: pageCount }) }}</p>
        <p v-if="error" class="tu-error">{{ error }}</p>

        <div class="tu-actions">
            <button class="tu-btn tu-btn-primary" type="button" :disabled="!files.length || busy" @click="run">
                {{ busy ? t('pdf.working') : action }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { PDFDocument } from 'pdf-lib'
import FileDropzone from '@/components/tools/FileDropzone.vue'
import { downloadBlob } from '@/lib/tool-files'

const props = defineProps({
    mode: { type: String, required: true },
})

const { t } = useI18n()

const files = ref([])
const range = ref('1-1')
const error = ref('')
const busy = ref(false)
const pageCount = ref(0)

const action = computed(() => ({ merge: t('pdf.merge'), split: t('pdf.split'), images: t('pdf.images') }[props.mode]))

async function onFiles(list) {
    error.value = ''
    const next = props.mode === 'split' ? list.slice(0, 1) : list
    files.value = next
    pageCount.value = 0
    if (props.mode !== 'split' || !next[0]) return
    try {
        const doc = await PDFDocument.load(await next[0].arrayBuffer())
        pageCount.value = doc.getPageCount()
        range.value = `1-${pageCount.value}`
    } catch {
        error.value = 'Could not read that PDF. It may be encrypted or damaged.'
        files.value = []
    }
}

function parseRange(spec, total) {
    const pages = []
    for (const part of spec.split(',')) {
        const piece = part.trim()
        if (!piece) continue
        if (piece.includes('-')) {
            const [a, b] = piece.split('-').map(Number)
            if (!Number.isInteger(a) || !Number.isInteger(b) || a > b) throw new Error(`Bad range "${piece}"`)
            for (let n = a; n <= b; n++) pages.push(n)
        } else pages.push(Number(piece))
    }
    const unique = [...new Set(pages)]
    if (!unique.length || unique.some((n) => !Number.isInteger(n) || n < 1 || n > total)) {
        throw new Error(`Use pages from 1 to ${total}.`)
    }
    return unique.map((n) => n - 1)
}

async function save(doc, name) {
    const bytes = await doc.save()
    downloadBlob(new Blob([bytes], { type: 'application/pdf' }), name)
}

async function run() {
    error.value = ''
    busy.value = true
    try {
        if (props.mode === 'merge') {
            const merged = await PDFDocument.create()
            for (const file of files.value) {
                const src = await PDFDocument.load(await file.arrayBuffer())
                const pages = await merged.copyPages(src, src.getPageIndices())
                pages.forEach((page) => merged.addPage(page))
            }
            await save(merged, 'merged.pdf')
        } else if (props.mode === 'split') {
            const src = await PDFDocument.load(await files.value[0].arrayBuffer())
            const indices = parseRange(range.value, src.getPageCount())
            const out = await PDFDocument.create()
            const pages = await out.copyPages(src, indices)
            pages.forEach((page) => out.addPage(page))
            await save(out, 'pages.pdf')
        } else {
            const doc = await PDFDocument.create()
            for (const file of files.value) {
                if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                    throw new Error('Use JPEG or PNG images. WebP and other formats are not embedded.')
                }
                const bytes = await file.arrayBuffer()
                const image = file.type === 'image/png' ? await doc.embedPng(bytes) : await doc.embedJpg(bytes)
                const page = doc.addPage([595.28, 841.89])
                const margin = 36
                const maxW = page.getWidth() - margin * 2
                const maxH = page.getHeight() - margin * 2
                const scale = Math.min(maxW / image.width, maxH / image.height)
                const w = image.width * scale
                const h = image.height * scale
                page.drawImage(image, {
                    x: (page.getWidth() - w) / 2,
                    y: (page.getHeight() - h) / 2,
                    width: w,
                    height: h,
                })
            }
            await save(doc, 'images.pdf')
        }
    } catch (e) {
        error.value = e.message || 'Could not build the PDF.'
    } finally {
        busy.value = false
    }
}
</script>
