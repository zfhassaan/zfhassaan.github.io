<script setup>
import { ref } from 'vue'
import { GripVertical, Upload, X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { formatBytes } from '@/lib/tool-files'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  accept: { type: String, default: '' },
  multiple: { type: Boolean, default: false },
  reorder: { type: Boolean, default: false },
  title: { type: String, default: 'Drop a file here' },
  hint: { type: String, default: 'or click to browse' },
})

const emit = defineEmits(['update:modelValue'])

const over = ref(false)
const notice = ref('')
const inputEl = ref(null)
const dragIndex = ref(null)

function allowed(file) {
  if (!props.accept) return true
  return props.accept.split(',').some((rule) => {
    const token = rule.trim().toLowerCase()
    if (!token) return false
    if (token.startsWith('.')) return file.name.toLowerCase().endsWith(token)
    if (token.endsWith('/*')) return (file.type || '').startsWith(token.slice(0, -1))
    return (file.type || '') === token
  })
}

function commit(list) {
  const incoming = [...list]
  const accepted = incoming.filter(allowed)
  if (incoming.length && !accepted.length) {
    notice.value = 'That file type is not accepted here.'
    return
  }
  notice.value = ''
  emit('update:modelValue', props.multiple ? [...props.modelValue, ...accepted] : accepted.slice(0, 1))
}

function openPicker() {
  inputEl.value?.click()
}

function onBrowse(event) {
  commit(event.target.files || [])
  event.target.value = ''
}

function onDrop(event) {
  over.value = false
  commit(event.dataTransfer?.files || [])
}

function remove(index) {
  const next = props.modelValue.slice()
  next.splice(index, 1)
  emit('update:modelValue', next)
}

function onDragStart(index) {
  dragIndex.value = index
}

function onDragEnd() {
  dragIndex.value = null
}

function onItemDrop(index) {
  const from = dragIndex.value
  dragIndex.value = null
  if (from === null || from === index) return
  const next = props.modelValue.slice()
  const [item] = next.splice(from, 1)
  next.splice(index, 0, item)
  emit('update:modelValue', next)
}
</script>

<template>
  <div class="space-y-3">
    <div
      class="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-8 text-center transition-colors"
      :class="over ? 'border-primary bg-primary/10' : 'border-border bg-background hover:border-primary/60'"
      role="button"
      tabindex="0"
      @click="openPicker"
      @keydown.enter.prevent="openPicker"
      @keydown.space.prevent="openPicker"
      @dragover.prevent="over = true"
      @dragleave.prevent="over = false"
      @drop.prevent="onDrop"
    >
      <Upload class="h-5 w-5 text-primary" />
      <p class="text-sm font-medium text-foreground">{{ title }}</p>
      <p class="text-sm text-muted-foreground">{{ hint }}</p>
      <input
        ref="inputEl"
        class="hidden"
        type="file"
        :accept="accept"
        :multiple="multiple"
        @change="onBrowse"
      />
    </div>

    <p v-if="notice" class="text-sm text-destructive">{{ notice }}</p>

    <ul v-if="modelValue.length" class="space-y-2">
      <li
        v-for="(file, index) in modelValue"
        :key="`${file.name}-${file.size}-${index}`"
        class="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2"
        :draggable="reorder"
        @dragstart="onDragStart(index)"
        @dragend="onDragEnd"
        @dragover.prevent
        @drop.prevent="onItemDrop(index)"
      >
        <GripVertical v-if="reorder" class="h-4 w-4 shrink-0 text-muted-foreground" />
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm text-foreground">{{ file.name }}</p>
          <p class="text-xs text-muted-foreground">{{ formatBytes(file.size) }}</p>
        </div>
        <Button variant="ghost" size="icon" type="button" aria-label="Remove file" @click.stop="remove(index)">
          <X />
        </Button>
      </li>
    </ul>
  </div>
</template>
