<template>
    <div class="tu-stack">
        <div class="tu-split">
            <label class="tu-card tu-stack">
                <span class="tu-label">Original</span>
                <textarea v-model="left" class="tu-textarea" spellcheck="false"></textarea>
            </label>
            <label class="tu-card tu-stack">
                <span class="tu-label">Changed</span>
                <textarea v-model="right" class="tu-textarea" spellcheck="false"></textarea>
            </label>
        </div>
        <p v-if="error" class="tu-error">{{ error }}</p>
        <div v-else class="tu-card" style="padding:8px 0">
            <div v-for="(line, index) in lines" :key="index" class="tu-diff-line" :class="line.kind">
                {{ line.mark }} {{ line.text }}
            </div>
            <p v-if="!lines.length" class="tu-hint" style="padding:8px 16px">The texts match.</p>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const left = ref('alpha\nbeta\ngamma')
const right = ref('alpha\nbeta updated\ngamma\ndelta')

function diff(a, b) {
    const n = a.length
    const m = b.length
    const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1))
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
        }
    }
    const out = []
    let i = 0
    let j = 0
    while (i < n && j < m) {
        if (a[i] === b[j]) {
            out.push({ kind: '', mark: ' ', text: a[i] })
            i += 1
            j += 1
        } else if (dp[i + 1][j] >= dp[i][j + 1]) {
            out.push({ kind: 'tu-diff-del', mark: '-', text: a[i] })
            i += 1
        } else {
            out.push({ kind: 'tu-diff-add', mark: '+', text: b[j] })
            j += 1
        }
    }
    while (i < n) {
        out.push({ kind: 'tu-diff-del', mark: '-', text: a[i] })
        i += 1
    }
    while (j < m) {
        out.push({ kind: 'tu-diff-add', mark: '+', text: b[j] })
        j += 1
    }
    return out
}

const result = computed(() => {
    const a = left.value.split('\n')
    const b = right.value.split('\n')
    if (a.length * b.length > 400 * 400) return { error: 'Keep each side under about 400 lines.', lines: [] }
    return { error: '', lines: diff(a, b).filter((line) => line.kind) }
})

const error = computed(() => result.value.error)
const lines = computed(() => result.value.lines)
</script>
