<template>
  <!-- ══ PROMINENT CLIENTS & PARTNERS ══ -->
  <section id="clients" class="section">
    <div class="container">
      <div class="reveal" style="margin-bottom: 20px">
        <div class="section-label">Proven Track Record · Clients &amp; Platforms</div>
        <h2 class="section-h2">Trusted by Government &amp; Enterprise Teams</h2>
      </div>
      <p class="clients-sub text-muted reveal">
        Production systems delivered for government organizations, enterprise retail, real-time auction platforms, and verified international freelance engagements.
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
          :title="`${c.name} — ${c.tag}`"
        >
          <img
            :src="c.logo"
            :alt="`${c.name} logo`"
            class="ribbon-logo"
            :class="c.logoClass"
          />
          <div class="ribbon-meta">
            <span class="ribbon-label">{{ c.name }}</span>
            <span class="ribbon-tag mono">{{ c.badge }}</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const clients = [
  {
    id: 'uae-swat',
    name: 'UAE SWAT Challenge',
    url: 'https://www.uaeswatchallenge.com/en',
    logo: '/images/clients/uae-swat-challenge.svg',
    logoClass: 'logo-swat',
    badge: 'Dubai Police',
    tag: 'Dubai Police · Global Special Forces Event'
  },
  {
    id: 'haier-mall',
    name: 'Haier Mall',
    url: 'https://www.haiermall.pk',
    logo: '/images/clients/haier-white.svg',
    logoClass: 'logo-haier',
    badge: 'Enterprise Retail',
    tag: 'Haier · Flagship Retail & Appliance Marketplace'
  },
  {
    id: 'online-auction',
    name: 'Online Auction',
    url: 'https://onlineauction.ae',
    logo: '/images/clients/online-auction-white.svg',
    logoClass: 'logo-auction',
    badge: 'Real-Time WebSockets',
    tag: 'UAE Digital Asset & Vehicle Auction Platform'
  },
  {
    id: 'zoom-packaging',
    name: 'Zoom Packaging',
    url: 'https://zoompackaging.com/',
    logo: '/images/clients/zoom-packaging.png',
    logoClass: 'logo-zoom',
    badge: 'B2B Manufacturing (USA)',
    tag: 'Custom Packaging & Wholesale Box Manufacturer (Austin, TX)'
  },
  {
    id: 'laravel-amqp',
    name: 'Laravel AMQP',
    url: 'https://zfhassaan.github.io/laravel-amqp',
    logo: '/images/clients/laravel-amqp.png',
    logoClass: 'logo-amqp',
    badge: '2.5M+ Downloads',
    tag: 'RabbitMQ Messaging Toolkit · Upstream Collaborator'
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
