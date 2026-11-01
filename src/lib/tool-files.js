export function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) return '0 B'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export async function copyText(text) {
    await navigator.clipboard.writeText(text)
}

export function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
}

export function downloadText(text, filename, type = 'text/plain') {
    downloadBlob(new Blob([text], { type }), filename)
}

export function readAsText(file) {
    return file.text()
}

export function readAsArrayBuffer(file) {
    return file.arrayBuffer()
}

export function bytesToBase64(bytes) {
    let bin = ''
    const chunk = 0x8000
    for (let i = 0; i < bytes.length; i += chunk) {
        bin += String.fromCharCode(...bytes.subarray(i, i + chunk))
    }
    return btoa(bin)
}

export function base64ToBytes(value) {
    const bin = atob(value.replace(/\s/g, ''))
    const bytes = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    return bytes
}

export function encodeUtf8Base64(text) {
    return bytesToBase64(new TextEncoder().encode(text))
}

export function decodeUtf8Base64(value) {
    return new TextDecoder().decode(base64ToBytes(value))
}

export async function shaHex(algorithm, bytes) {
    const digest = await crypto.subtle.digest(algorithm, bytes)
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}
