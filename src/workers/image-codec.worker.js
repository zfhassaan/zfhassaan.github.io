import encodeJpeg from '@jsquash/jpeg/encode.js'
import encodeWebp from '@jsquash/webp/encode.js'
import { optimise } from '@jsquash/oxipng'

function ownedBytes(result) {
    const view = result instanceof ArrayBuffer ? new Uint8Array(result) : new Uint8Array(result)
    return view.slice()
}

function pngLevel(quality) {
    if (quality >= 90) return 3
    if (quality >= 60) return 2
    return 1
}

self.onmessage = async (event) => {
    const { id, buffer, width, height, mime, quality } = event.data
    try {
        const pixels = new Uint8ClampedArray(buffer)
        const imageData = new ImageData(pixels, width, height)
        const q = Math.min(100, Math.max(1, Math.round(quality)))
        let encoded
        let engine
        let outMime = mime
        if (mime === 'image/jpeg') {
            encoded = await encodeJpeg(imageData, { quality: q })
            engine = 'MozJPEG'
        } else if (mime === 'image/webp') {
            encoded = await encodeWebp(imageData, { quality: q })
            engine = 'libwebp'
        } else {
            encoded = await optimise(imageData, { level: pngLevel(q), interlace: false })
            engine = 'OxiPNG'
            outMime = 'image/png'
        }
        const bytes = ownedBytes(encoded)
        self.postMessage({ id, buffer: bytes.buffer, mime: outMime, engine }, [bytes.buffer])
    } catch (error) {
        self.postMessage({ id, error: error?.message || 'Compression failed.' })
    }
}
