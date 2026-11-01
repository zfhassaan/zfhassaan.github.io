<template>
  <div class="lang-switch-wrap" ref="root">
    <button
      type="button"
      class="lang-switch"
      :aria-label="t('lang.label')"
      aria-haspopup="listbox"
      :aria-expanded="open"
      @click="open = !open"
    >
      <LanguageFlag :code="current.code" />
      <span>{{ current.native }}</span>
    </button>
    <ul v-if="open" class="lang-menu" role="listbox" :aria-label="t('lang.label')">
      <li v-for="item in LOCALES" :key="item.code">
        <button
          type="button"
          class="lang-option"
          role="option"
          :aria-selected="item.code === locale"
          @click="choose(item.code)"
        >
          <LanguageFlag :code="item.code" />
          <span>{{ item.native }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALES, applyDocumentLocale, localeMeta, saveLocale } from '@/lib/locale'
import LanguageFlag from '@/components/LanguageFlag.vue'

const { locale, t } = useI18n()
const open = ref(false)
const root = ref(null)
const current = computed(() => localeMeta(locale.value))

function choose(code) {
  locale.value = code
  saveLocale(code)
  applyDocumentLocale(code)
  open.value = false
}

function onPointerDown(event) {
  if (root.value && !root.value.contains(event.target)) open.value = false
}

function onKey(event) {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKey)
})
</script>
