<template>
  <main class="case-studies-page">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="cs-breadcrumb" aria-label="Breadcrumb">
        <router-link to="/" class="cs-back-link">
          <ArrowLeft :size="16" />
          <span>Back to Overview</span>
        </router-link>
        <span class="cs-sep">/</span>
        <span class="cs-current">Case Studies</span>
      </nav>

      <!-- Hero / Header -->
      <header class="cs-header">
        <div class="section-label">Production Architectures · Engineering Case Studies</div>
        <h1 class="cs-title">Case Studies &amp; Delivered Platforms</h1>
        <p class="cs-lead text-muted">
          Every project represents complex technical requirements solved for production — with deliberate architecture, concrete constraints, and verifiable outcomes.
        </p>
      </header>

      <!-- Category Filter Tabs -->
      <div class="cs-filters" role="tablist" aria-label="Filter Case Studies">
        <button
          v-for="filter in filters"
          :key="filter.id"
          type="button"
          class="cs-filter-btn"
          :class="{ active: activeFilter === filter.id }"
          @click="activeFilter = filter.id"
        >
          <span>{{ filter.label }}</span>
          <span class="cs-filter-count mono">{{ filter.count }}</span>
        </button>
      </div>

      <!-- Case Studies Grid -->
      <div class="cs-grid">
        <article
          v-for="project in filteredProjects"
          :key="project.id"
          class="cs-card"
        >
          <div class="cs-card-top">
            <div class="cs-card-badge-row">
              <span class="cs-tag mono">{{ project.tag }}</span>
            </div>

            <div class="cs-card-brand">
              <img
                v-if="project.logo"
                :src="project.logo"
                :alt="`${project.title} logo`"
                class="cs-card-logo"
                :class="project.logoClass"
              />
              <h2 class="cs-card-title">
                <router-link :to="{ name: 'case-study-detail', params: { id: project.id } }">
                  {{ project.title }}
                </router-link>
              </h2>
            </div>
          </div>

          <div class="cs-card-body">
            <p class="cs-card-problem">
              <strong class="mono text-accent">Problem: </strong>
              <span v-html="project.problem" />
            </p>

            <!-- Key metrics / proof -->
            <div v-if="project.impact && project.impact.length" class="cs-impact-row">
              <span v-for="imp in project.impact" :key="imp" class="cs-impact-pill">
                {{ imp }}
              </span>
            </div>

            <!-- Tech stack badges -->
            <div class="cs-stack-row">
              <span v-for="tech in project.stack" :key="tech" class="cs-tech-pill">
                {{ tech }}
              </span>
            </div>
          </div>

          <div class="cs-card-footer">
            <router-link
              :to="{ name: 'case-study-detail', params: { id: project.id } }"
              class="cs-btn-primary"
            >
              <span>Read Full Case Study</span>
              <ArrowRight :size="14" />
            </router-link>

            <a
              v-if="project.links && project.links[0]"
              :href="project.links[0].href"
              target="_blank"
              rel="noopener"
              class="cs-btn-secondary"
              :title="`Open ${project.links[0].label}`"
            >
              <span>{{ project.links[0].label }}</span>
              <ExternalLink :size="13" />
            </a>
          </div>
        </article>
      </div>

      <!-- Bottom Discussion CTA -->
      <section class="cs-bottom-cta">
        <div class="cs-cta-content">
          <h2 class="cs-cta-heading">Have a Similar Engineering Challenge?</h2>
          <p class="cs-cta-sub">
            Whether you need to scale queue pipelines, integrate fault-tolerant payment gateways, or engineer high-throughput APIs — let's discuss your requirements.
          </p>
          <div class="cs-cta-actions">
            <a href="mailto:zfhassaan@gmail.com" class="btn-primary-cs">
              <Mail :size="16" />
              <span>Contact Directly · zfhassaan@gmail.com</span>
            </a>
            <router-link :to="{ name: 'home', hash: '#contact' }" class="btn-secondary-cs">
              <span>View Engagement Details</span>
              <ArrowRight :size="14" />
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { projects } from '@/data/projects'
import { ArrowLeft, ArrowRight, ExternalLink, Mail } from 'lucide-vue-next'

const activeFilter = ref('all')

const categories = {
  enterprise: ['uae-swat', 'haier-mall', 'online-auction', 'zoom-packaging'],
  opensource: ['laravel-amqp', 'dbx'],
  fintech: ['jazzcash', 'payfast', 'laravel-wallet']
}

const filters = computed(() => [
  { id: 'all', label: 'All Case Studies', count: projects.length },
  { id: 'enterprise', label: 'Enterprise & Platforms', count: categories.enterprise.length },
  { id: 'fintech', label: 'Fintech & Payment SDKs', count: categories.fintech.length },
  { id: 'opensource', label: 'Open Source & Queues', count: categories.opensource.length },
])

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  const ids = categories[activeFilter.value] || []
  return projects.filter(p => ids.includes(p.id))
})
</script>

<style scoped>
.case-studies-page {
  padding: 100px 0 80px 0;
  min-height: 100vh;
  animation: pageFadeIn 0.35s ease-out;
}

@keyframes pageFadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cs-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  margin-bottom: 24px;
}

.cs-back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.cs-back-link:hover {
  color: var(--accent);
}

.cs-sep {
  color: var(--text-muted);
}

.cs-current {
  color: var(--accent);
}

.cs-header {
  margin-bottom: 40px;
  max-width: 800px;
}

.cs-title {
  font-family: var(--font-head);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 12px 0 16px 0;
  line-height: 1.2;
}

@media (max-width: 640px) {
  .cs-title {
    font-size: 1.85rem;
  }
}

.cs-lead {
  font-size: 1.05rem;
  line-height: 1.65;
}

.cs-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 36px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.cs-filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cs-filter-btn:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.cs-filter-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #0b0f17;
  font-weight: 600;
}

.cs-filter-count {
  font-size: 0.75rem;
  opacity: 0.8;
}

.cs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 28px;
  margin-bottom: 64px;
}

@media (max-width: 640px) {
  .cs-grid {
    grid-template-columns: 1fr;
  }
}

.cs-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.cs-card:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
}

.cs-card-top {
  margin-bottom: 18px;
}

.cs-card-badge-row {
  margin-bottom: 14px;
}

.cs-tag {
  font-size: 0.7rem;
  color: var(--accent);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.cs-card-brand {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cs-card-logo {
  height: 26px;
  max-width: 100px;
  object-fit: contain;
  align-self: flex-start;
}

.cs-card-logo.logo-swat {
  height: 30px;
}

.cs-card-logo.logo-haier {
  height: 22px;
}

.cs-card-logo.logo-amqp {
  height: 28px;
}

.cs-card-title {
  font-family: var(--font-head);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.35;
  margin: 0;
}

.cs-card-title a {
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.cs-card-title a:hover {
  color: var(--accent);
}

.cs-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.cs-card-problem {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.cs-impact-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.cs-impact-pill {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--accent);
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  padding: 3px 8px;
  border-radius: 4px;
}

.cs-stack-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.cs-tech-pill {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  padding: 3px 8px;
  border-radius: 4px;
}

.cs-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 18px;
  border-top: 1px solid var(--border);
}

.cs-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--accent);
  color: #0b0f17;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.2s ease;
}

.cs-btn-primary:hover {
  background: var(--accent-hover, #34d399);
}

.cs-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.cs-btn-secondary:hover {
  color: var(--text-primary);
  border-color: var(--accent);
}

.cs-bottom-cta {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 48px 36px;
  text-align: center;
}

.cs-cta-heading {
  font-family: var(--font-head);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.cs-cta-sub {
  font-size: 0.95rem;
  color: var(--text-secondary);
  max-width: 640px;
  margin: 0 auto 28px auto;
  line-height: 1.6;
}

.cs-cta-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px;
}

.btn-primary-cs {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  background: var(--accent);
  color: #0b0f17;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
}

.btn-secondary-cs {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
}
</style>
