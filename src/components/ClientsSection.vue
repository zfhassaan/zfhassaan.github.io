<template>
  <!-- ══ PROMINENT PROJECTS & CLIENTS ══ -->
  <section id="clients" class="section">
    <div class="container">
      <div class="reveal" style="margin-bottom: 20px">
        <div class="section-label">Proven Track Record · Clients &amp; Platforms</div>
        <h2 class="section-h2">Prominent Projects &amp; Client Engagements</h2>
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
          <span class="ribbon-label">{{ c.name }}</span>
        </a>
      </div>

      <!-- Prominent Client Cards Grid -->
      <div class="client-grid">
        <article
          v-for="c in clients"
          :key="c.id"
          class="client-card reveal"
          :class="`client-${c.id}`"
        >
          <div class="client-card-top">
            <div class="client-logo-wrap">
              <img
                :src="c.logo"
                :alt="`${c.name} logo`"
                class="client-card-logo"
                :class="c.logoClass"
              />
            </div>
            <span class="client-badge">
              <span class="client-badge-dot" :style="{ background: c.accentColor }"></span>
              {{ c.badge }}
            </span>
          </div>

          <div class="client-card-body">
            <div class="client-tag mono">{{ c.tag }}</div>
            <h3 class="client-name">
              <a :href="c.url" target="_blank" rel="noopener" class="client-name-link">
                {{ c.name }}
              </a>
            </h3>
            <p class="client-desc">
              {{ c.description }}
            </p>

            <div class="client-deliverables">
              <div v-for="(item, i) in c.highlights" :key="i" class="client-deliv-item">
                <CheckCircle2 :size="13" class="deliv-icon" />
                <span>{{ item }}</span>
              </div>
            </div>
          </div>

          <div class="client-card-footer">
            <div class="client-card-actions">
              <a
                :href="c.url"
                target="_blank"
                rel="noopener"
                class="client-visit-btn magnetic"
              >
                <span>{{ c.ctaLabel }}</span>
                <ExternalLink :size="13" class="btn-ext-icon" />
              </a>
              <a
                v-if="c.githubUrl"
                :href="c.githubUrl"
                target="_blank"
                rel="noopener"
                class="client-github-btn magnetic"
                title="View GitHub Repository"
              >
                <Github :size="13" class="btn-ext-icon" />
                <span>GitHub</span>
              </a>
            </div>
            <span class="client-domain mono">{{ c.displayUrl }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CheckCircle2, ExternalLink, Github } from 'lucide-vue-next'

const clients = [
  {
    id: 'uae-swat',
    name: 'UAE SWAT Challenge',
    url: 'https://www.uaeswatchallenge.com/en',
    displayUrl: 'uaeswatchallenge.com',
    logo: '/images/clients/uae-swat-challenge.svg',
    logoClass: 'logo-swat',
    badge: 'Government Event Platform',
    accentColor: '#10b981',
    tag: 'Dubai Police · Global Special Forces Event',
    description:
      'Official competition and event portal for international law enforcement teams. Features high-traffic tournament draw management, team rosters, live scoring, and visitor pass workflows.',
    highlights: [
      'High-availability cloud architecture (AWS & Cloudflare CDN)',
      'Tournament leaderboard',
      'Multi-lingual international visitor portal'
    ],
    ctaLabel: 'Visit Official Event Site'
  },
  {
    id: 'haier-mall',
    name: 'Haier Mall',
    url: 'https://www.haiermall.pk',
    displayUrl: 'haiermall.pk',
    logo: '/images/clients/haier-white.svg',
    logoClass: 'logo-haier',
    badge: 'Enterprise E-Commerce',
    accentColor: '#0ea5e9',
    tag: 'Haier · Flagship Retail & Appliance Marketplace',
    description:
      'High-volume direct-to-consumer e-commerce marketplace for Haier Pakistan. Engineered for complex catalog navigation, seasonal flash-sale traffic, and multi-channel payment processing.',
    highlights: [
      'Decoupled high-performance backend catalog',
      'Secure checkout & multi-provider payment integrations',
      'Inventory synchronization & order tracking pipelines'
    ],
    ctaLabel: 'Visit Haier Mall'
  },
  {
    id: 'online-auction',
    name: 'Online Auction',
    url: 'https://onlineauction.ae',
    displayUrl: 'onlineauction.ae',
    logo: '/images/clients/online-auction-white.svg',
    logoClass: 'logo-auction',
    badge: 'Real-Time Bidding System',
    accentColor: '#ef4444',
    tag: 'UAE Digital Asset & Vehicle Auction Platform',
    description:
      'Real-time bidding infrastructure where every millisecond counts. Engineered with pessimistic database locking to eliminate race conditions, outbid WebSocket pushes, and automated settlement.',
    highlights: [
      'Sub-second WebSocket live bid streaming',
      'Pessimistic row-level locking preventing bid race conditions',
      'Automated winner notifications, deposits & ledger reconciliation'
    ],
    ctaLabel: 'Visit Online Auction'
  },
  {
    id: 'zoom-packaging',
    name: 'Zoom Packaging',
    url: 'https://zoompackaging.com/',
    displayUrl: 'zoompackaging.com',
    logo: '/images/clients/zoom-packaging.png',
    logoClass: 'logo-zoom',
    badge: 'B2B Manufacturing SaaS',
    accentColor: '#3b82f6',
    tag: 'Custom Packaging & Wholesale Box Manufacturer (USA)',
    description:
      'Digital quotation and manufacturing platform based in Austin, Texas. Features dynamic volumetric box dimension pricing, dieline asset pipelines, and wholesale lead qualification.',
    highlights: [
      'Algorithmic box dimension & material pricing calculator',
      'High-resolution artwork & dieline asset upload pipeline',
      'Automated custom B2B quote-request workflow'
    ],
    ctaLabel: 'Visit Zoom Packaging'
  },
  {
    id: 'laravel-amqp',
    name: 'Laravel AMQP',
    url: 'https://zfhassaan.github.io/laravel-amqp',
    githubUrl: 'https://github.com/bschmitt/laravel-amqp',
    displayUrl: 'zfhassaan.github.io/laravel-amqp',
    logo: '/images/clients/laravel-amqp.png',
    logoClass: 'logo-amqp',
    badge: 'Open Source · 2.2M+ Installs',
    accentColor: '#f97316',
    tag: 'RabbitMQ Messaging Toolkit · Laravel & Lumen',
    description:
      'High-throughput AMQP messaging package powering asynchronous queuing, event-driven microservices, and reliable dead-letter exchange (DLQ) retry pipelines.',
    highlights: [
      '2.2M+ lifetime installs across production architectures',
      'Collaborator on upstream repository (bschmitt/laravel-amqp)',
      'Continuous CI passing across Laravel 8→13 and PHP 7.3→8.5'
    ],
    ctaLabel: 'Visit Official Website'
  }
]
</script>

<style scoped>
.clients-sub {
  font-size: 0.95rem;
  line-height: 1.65;
  max-width: 680px;
  margin-bottom: 32px;
}

/* ── Ribbon Bar ── */
.client-logo-ribbon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 24px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.ribbon-item {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 6px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
  width: auto;
}

.ribbon-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(45, 212, 191, 0.3);
  transform: translateY(-1px);
}

.ribbon-logo {
  height: 22px;
  max-width: 90px;
  object-fit: contain;
  filter: brightness(0) invert(0.9);
  transition: filter 0.2s ease;
}

.ribbon-item:hover .ribbon-logo {
  filter: brightness(0) invert(1);
}

.ribbon-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 0.04em;
}

.ribbon-item:hover .ribbon-label {
  color: var(--text-primary);
}

/* ── Client Cards Grid ── */
.client-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1080px) {
  .client-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 680px) {
  .client-grid {
    grid-template-columns: 1fr;
  }
}

.client-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.client-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.4), transparent);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.client-card:hover {
  border-color: rgba(45, 212, 191, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.5);
}

.client-card:hover::before {
  opacity: 1;
}

/* ── Top Bar ── */
.client-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.client-logo-wrap {
  height: 38px;
  display: flex;
  align-items: center;
}

.client-card-logo {
  max-height: 34px;
  max-width: 130px;
  object-fit: contain;
}

.logo-swat {
  max-height: 38px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.logo-haier {
  max-height: 24px;
}

.logo-auction {
  max-height: 28px;
}

.logo-zoom {
  max-height: 30px;
  filter: brightness(0) invert(1);
}

.logo-upwork {
  max-height: 22px;
}

.logo-fiverr {
  max-height: 24px;
}

.logo-amqp {
  max-height: 34px;
}

.client-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.client-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ── Body ── */
.client-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.client-tag {
  font-size: 11px;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.client-name {
  font-family: var(--font-head);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
  line-height: 1.25;
}

.client-name-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.client-name-link:hover {
  color: var(--accent);
}

.client-desc {
  font-size: 0.86rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 18px;
}

.client-deliverables {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  margin-top: auto;
}

.client-deliv-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.8125rem;
  color: var(--text-muted);
  line-height: 1.45;
}

.deliv-icon {
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 2px;
}

/* ── Footer ── */
.client-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.client-card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.client-github-btn {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  width: auto;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 11.5px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.client-github-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.2);
}

.client-visit-btn {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  width: auto;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 6px;
  background: rgba(45, 212, 191, 0.08);
  border: 1px solid rgba(45, 212, 191, 0.3);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 11.5px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.client-visit-btn:hover {
  background: var(--accent);
  color: #070b14;
  border-color: var(--accent);
}

.btn-ext-icon {
  flex-shrink: 0;
}

.client-domain {
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
}
</style>

