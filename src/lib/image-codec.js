let worker
let nextId = 0
const pending = new Map()

function failAll(error) {
    for (const job of pending.values()) job.reject(error)
    pending.clear()
    worker = null
}

function codecWorker() {
    if (worker) return worker
    worker = new Worker(new URL('../workers/image-codec.worker.js', import.meta.url), { type: 'module' })
    worker.onmessage = (event) => {
        const { id, buffer, mime, engine, error } = event.data || {}
        const job = pending.get(id)
        if (!job) return
        pending.delete(id)
        if (error) job.reject(new Error(error))
        else job.resolve({ blob: new Blob([buffer], { type: mime }), engine })
    }
    worker.onerror = (event) => {
        failAll(new Error(event.message || 'The WebAssembly codec could not start.'))
    }
    return worker
}

/** Encode pixels with a WebAssembly codec. Runs off the main thread. */
export function encodeImage(imageData, mime, quality) {
    const id = ++nextId
    const pixels = new Uint8ClampedArray(imageData.data)
    return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject })
        codecWorker().postMessage({
            id,
            buffer: pixels.buffer,
            width: imageData.width,
            height: imageData.height,
            mime,
            quality,
        }, [pixels.buffer])
    })
}
