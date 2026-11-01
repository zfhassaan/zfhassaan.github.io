<template>
  <!-- ══ PROMINENT CLIENTS & PARTNERS ══ -->
  <section id="clients" class="section">
    <div class="container">
      <div class="reveal" style="margin-bottom: 20px">
        <div class="section-label">{{ t('clients.label') }}</div>
        <h2 class="section-h2">{{ t('clients.title') }}</h2>
      </div>
      <p class="clients-sub text-muted reveal">
        {{ t('clients.sub') }}
      </p>

      <!-- Client Logo Bar (Single Row / Flex Ribbon) -->
      <div class="client-logo-ribbon reveal">
        <a
          v-for="c in clients"
          :key="c.id"
          :href="c.url"
          target="_blank"
          rel="noopener"
          class="ribbon-item magnetic"
          :title="`${clientName(c.id)} — ${t(`clients.items.${c.id}.tag`)}`"
        >
          <img
            :src="c.logo"
            :alt="t('clients.logo', { name: clientName(c.id) })"
            class="ribbon-logo"
            :class="c.logoClass"
          />
          <div class="ribbon-meta">
            <span class="ribbon-label">{{ clientName(c.id) }}</span>
            <span class="ribbon-tag mono">{{ t(`clients.items.${c.id}.badge`) }}</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
function clientName(id) {
  return t(`clients.items.${id}.name`)
}
const clients = [
  {
    id: 'uae-swat',
    url: 'https://www.uaeswatchallenge.com/en',
    logo: '/images/clients/uae-swat-challenge.svg',
    logoClass: 'logo-swat',
  },
  {
    id: 'haier-mall',
    url: 'https://www.haiermall.pk',
    logo: '/images/clients/haier-white.svg',
    logoClass: 'logo-haier',
  },
  {
    id: 'online-auction',
    url: 'https://onlineauction.ae',
    logo: '/images/clients/online-auction-white.svg',
    logoClass: 'logo-auction',
  },
  {
    id: 'zoom-packaging',
    url: 'https://zoompackaging.com/',
    logo: '/images/clients/zoom-packaging.png',
    logoClass: 'logo-zoom',
  },
  {
    id: 'laravel-amqp',
    url: 'https://zfhassaan.github.io/laravel-amqp',
    logo: '/images/clients/laravel-amqp.png',
    logoClass: 'logo-amqp',
  }
]
</script>

<style scoped>
.clients-sub {
  font-size: 0.95rem;
  line-height: 1.65;
  max-width: 680px;
  margin-bottom: 28px;
}

/* ── Ribbon Bar ── */
.client-logo-ribbon {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.ribbon-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.ribbon-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(45, 212, 191, 0.3);
  transform: translateY(-2px);
}

.ribbon-item:hover .ribbon-label {
  color: var(--text-primary);
}

.ribbon-item:hover .ribbon-tag {
  color: var(--text-muted);
}

.ribbon-logo {
  height: 28px;
  max-width: 70px;
  object-fit: contain;
  opacity: 0.85;
  filter: grayscale(0.2);
  transition: opacity 0.2s ease, filter 0.2s ease;
}

.ribbon-item:hover .ribbon-logo {
  opacity: 1;
}

.ribbon-item:hover .ribbon-logo:not(.logo-haier):not(.logo-auction),
.ribbon-item:hover .logo-haier,
.ribbon-item:hover .logo-auction {
  filter: grayscale(0);
}

.logo-swat {
  height: 32px;
  max-width: 80px;
}

.logo-haier {
  height: 22px;
}

.logo-amqp {
  height: 28px;
}

.ribbon-meta {
  display: flex;
  flex-direction: column;
}

.ribbon-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.ribbon-tag {
  font-size: 0.7rem;
  color: var(--text-muted);
}
</style>
