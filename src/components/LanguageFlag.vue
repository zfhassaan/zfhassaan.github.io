<template>
  <span class="lang-flag" aria-hidden="true">
    <svg v-if="code === 'en'" viewBox="0 0 60 30">
      <path fill="#012169" d="M0 0h60v30H0z" />
      <path stroke="#fff" stroke-width="6" d="M0 0l60 30M60 0L0 30" />
      <path stroke="#C8102E" stroke-width="4" d="M0 0l60 30M60 0L0 30" />
      <path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60" />
      <path stroke="#C8102E" stroke-width="6" d="M30 0v30M0 15h60" />
    </svg>
    <svg v-else-if="code === 'fr'" viewBox="0 0 3 2">
      <path fill="#fff" d="M0 0h3v2H0z" />
      <path fill="#002395" d="M0 0h1v2H0z" />
      <path fill="#ED2939" d="M2 0h1v2H2z" />
    </svg>
    <svg v-else-if="code === 'es'" viewBox="0 0 3 2">
      <path fill="#AA151B" d="M0 0h3v2H0z" />
      <path fill="#F1BF00" d="M0 .5h3v1H0z" />
    </svg>
    <svg v-else-if="code === 'nl'" viewBox="0 0 9 6">
      <path fill="#21468B" d="M0 0h9v6H0z" />
      <path fill="#fff" d="M0 0h9v4H0z" />
      <path fill="#AE1C28" d="M0 0h9v2H0z" />
    </svg>
    <svg v-else-if="code === 'de'" viewBox="0 0 5 3">
      <path fill="#FFCE00" d="M0 0h5v3H0z" />
      <path fill="#DD0000" d="M0 0h5v2H0z" />
      <path fill="#000" d="M0 0h5v1H0z" />
    </svg>
    <svg v-else viewBox="0 0 60 40">
      <path fill="#006C35" d="M0 0h60v40H0z" />
      <path
        fill="#fff"
        d="M9 13.2c1.6 2.4 3.4-.8 5.4.6 2 1.4 3.2-1.6 5.4-.2 2.2 1.4 3.4-1.2 5.6.2 2.2 1.4 3.2-1.4 5.4 0 2.2 1.4 3.6-1 5.6.4 1.8 1.2 3.2-.2 4.6 1.2-1.2 1.6-2.6.2-4.2-.8-1.8-1.2-3.2.6-5.2-.6-2-1.2-3.2.8-5.2-.4-2-1.2-3.4.4-5.4-.6-1.6-.8-3.4.8-5.2-.4-1.6-1-3.2.6-4.8.6z"
      />
      <path fill="#fff" d="M11 25.4h33.2c.9 0 1.4.7.8 1.3l-1.2.8H12.4L10 26.2l1-.8z" />
      <path fill="#fff" d="M44.2 24.2h2.4c.8 1.2.8 3.2 0 4.4h-2.4c1.1-.6 1.6-1.6 1.6-2.2s-.5-1.6-1.6-2.2z" />
    </svg>
  </span>
</template>

<script setup>
defineProps({
  code: { type: String, required: true },
})
</script>
