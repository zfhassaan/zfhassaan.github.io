<template>
  <main v-if="project" class="case-detail-page">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="cd-breadcrumb" aria-label="Breadcrumb">
        <router-link to="/" class="cd-back-link">Home</router-link>
        <span class="cd-sep">/</span>
        <router-link :to="{ name: 'case-studies' }" class="cd-back-link">Case Studies</router-link>
        <span class="cd-sep">/</span>
        <span class="cd-current">{{ project.title }}</span>
      </nav>

      <!-- Case Study Header -->
      <header class="cd-header">
        <div class="cd-header-top">
          <img
            v-if="project.logo"
            :src="project.logo"
            :alt="`${project.title} logo`"
            class="cd-client-logo"
            :class="project.logoClass"
          />
          <span class="cd-tag mono">{{ project.tag }}</span>
        </div>

        <h1 class="cd-title">{{ project.title }}</h1>
        <p v-if="project.subtitle" class="cd-subtitle text-muted" v-html="project.subtitle" />

        <!-- Impact proof bar -->
        <div v-if="project.impact && project.impact.length" class="cd-impact-bar">
          <div v-for="metric in project.impact" :key="metric" class="cd-impact-item">
            <CheckCircle2 :size="15" class="text-accent" />
            <span class="mono">{{ metric }}</span>
          </div>
        </div>
      </header>

      <!-- Main Layout: Content + Visual Column -->
      <div class="cd-layout">
        <!-- Left: Deep-Dive Problem/Solution Breakdown -->
        <div class="cd-main-col">
          <!-- Problem -->
          <section class="cd-block">
            <div class="cd-block-header">
              <span class="cd-block-num mono">01</span>
              <h2 class="cd-block-title">The Engineering Challenge</h2>
            </div>
            <div class="cd-block-body" v-html="project.problem" />
          </section>

          <!-- Constraints -->
          <section v-if="project.constraints" class="cd-block">
            <div class="cd-block-header">
              <span class="cd-block-num mono">02</span>
              <h2 class="cd-block-title">Production Constraints</h2>
            </div>
            <div class="cd-block-body" v-html="project.constraints" />
          </section>

          <!-- Approach & Architecture -->
          <section v-if="project.approach" class="cd-block">
            <div class="cd-block-header">
              <span class="cd-block-num mono">03</span>
              <h2 class="cd-block-title">Architectural Approach</h2>
            </div>
            <div class="cd-block-body" v-html="project.approach" />
          </section>

          <!-- Delivery & Ownership -->
          <section v-if="project.delivery" class="cd-block">
            <div class="cd-block-header">
              <span class="cd-block-num mono">04</span>
              <h2 class="cd-block-title">Engineering Ownership</h2>
            </div>
            <div class="cd-block-body" v-html="project.delivery" />
          </section>

          <!-- Outcome & Results -->
          <section v-if="project.outcome" class="cd-block">
            <div class="cd-block-header">
              <span class="cd-block-num mono">05</span>
              <h2 class="cd-block-title">Verifiable Outcomes</h2>
            </div>
            <div class="cd-block-body" v-html="project.outcome" />
          </section>

          <!-- Stack -->
          <section class="cd-block">
            <div class="cd-block-header">
              <span class="cd-block-num mono">06</span>
              <h2 class="cd-block-title">Technology Stack</h2>
            </div>
            <div class="cd-tech-tags">
              <span v-for="t in project.stack" :key="t" class="cd-tech-tag mono">{{ t }}</span>
            </div>
          </section>
        </div>

        <!-- Right: Visualizer & Actions Sidebar -->
        <aside class="cd-side-col">
          <!-- Architecture or Terminal Visual -->
          <div class="cd-visual-panel">
            <div class="cd-panel-title">
              <Terminal v-if="project.visual.type === 'terminal'" :size="16" class="text-accent" />
              <Layers v-else :size="16" class="text-accent" />
              <span>{{ project.visual.type === 'terminal' ? 'Architecture Implementation' : 'System Flow Diagram' }}</span>
            </div>

            <!-- Terminal Visualizer -->
            <div v-if="project.visual.type === 'terminal'" class="terminal-card">
              <div class="terminal-bar">
                <div class="t-dot red"></div>
                <div class="t-dot yellow"></div>
                <div class="t-dot green"></div>
                <div class="t-title">{{ project.visual.title }}</div>
              </div>
              <div class="terminal-body">
                <template v-for="(line, lineIndex) in project.visual.lines" :key="lineIndex">
                  <br v-if="line === null" />
                  <div v-else v-html="line" />
                </template>
              </div>
            </div>

            <!-- Schema Visualizer -->
            <div v-else-if="project.visual.type === 'schema'" class="schema-card">
              <template v-for="(row, rowIndex) in project.visual.rows" :key="rowIndex">
                <div
                  class="schema-row"
                  :style="row.boxes.length > 1 ? { gap: '10px' } : undefined"
                >
                  <div
                    v-for="(box, boxIndex) in row.boxes"
                    :key="boxIndex"
                    class="schema-box"
                    :class="{ highlight: box.highlight, 'schema-box-sm': box.small }"
                  >
                    <span class="s-icon">
                      <component
                        :is="schemaIconMap[box.icon]"
                        v-if="schemaIconMap[box.icon]"
                        :size="box.small ? 14 : 16"
                      />
                      <span v-else>{{ box.icon }}</span>
                    </span>
                    <span>{{ box.text }}</span>
                  </div>
                </div>
                <div
                  v-if="rowIndex < project.visual.rows.length - 1"
                  class="schema-connector"
                >
                  <div class="schema-arrow"></div>
                </div>
              </template>
            </div>
          </div>

          <!-- Verified Links -->
          <div v-if="project.links && project.links.length" class="cd-links-panel">
            <div class="cd-panel-title">
              <ExternalLink :size="16" class="text-accent" />
              <span>Verified Project Links</span>
            </div>
            <div class="cd-links-list">
              <a
                v-for="link in project.links"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener"
                class="cd-link-item"
              >
                <div class="cd-link-left">
                  <Box v-if="link.icon === 'packagist'" :size="16" />
                  <BookOpen v-else-if="link.icon === 'docs'" :size="16" />
                  <Github v-else-if="link.icon === 'github'" :size="16" />
                  <Globe v-else :size="16" />
                  <span class="cd-link-label">{{ link.label }}</span>
                </div>
                <ArrowUpRight :size="14" class="cd-link-arrow" />
              </a>
            </div>
          </div>

          <!-- Inquiry Box -->
          <div class="cd-inquiry-box">
            <h3 class="cd-inquiry-title">Need a Similar Solution?</h3>
            <p class="cd-inquiry-desc">
              Discuss this architecture or hire me for your backend, payment, or queue infrastructure.
            </p>
            <a
              :href="`mailto:zfhassaan@gmail.com?subject=${encodeURIComponent(`Project Discussion: ${project.title}`)}`"
              class="btn-primary-cd"
            >
              <Mail :size="15" />
              <span>Discuss This Project</span>
            </a>
          </div>
        </aside>
      </div>

      <!-- Bottom Next / Prev Navigation -->
      <footer class="cd-footer-nav">
        <router-link
          v-if="prevProject"
          :to="{ name: 'case-study-detail', params: { id: prevProject.id } }"
          class="cd-nav-card prev"
        >
          <div class="cd-nav-dir">
            <ArrowLeft :size="14" />
            <span>Previous Case Study</span>
          </div>
          <div class="cd-nav-name">{{ prevProject.title }}</div>
        </router-link>
        <div v-else class="cd-nav-card disabled"></div>

        <router-link :to="{ name: 'case-studies' }" class="cd-nav-all">
          <Layers :size="16" />
          <span>All Case Studies</span>
        </router-link>

        <router-link
          v-if="nextProject"
          :to="{ name: 'case-study-detail', params: { id: nextProject.id } }"
          class="cd-nav-card next"
        >
          <div class="cd-nav-dir">
            <span>Next Case Study</span>
            <ArrowRight :size="14" />
          </div>
          <div class="cd-nav-name">{{ nextProject.title }}</div>
        </router-link>
        <div v-else class="cd-nav-card disabled"></div>
      </footer>
    </div>
  </main>

  <!-- 404 Fallback if not found -->
  <main v-else class="case-detail-page">
    <div class="container text-center" style="padding: 120px 0">
      <h1 class="cd-title">Case Study Not Found</h1>
      <p class="text-muted" style="margin-bottom: 24px">The requested case study could not be located.</p>
      <router-link :to="{ name: 'case-studies' }" class="btn-primary-cd">
        <ArrowLeft :size="16" />
        <span>Back to Case Studies</span>
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '@/data/projects'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  Mail,
  Terminal,
  Layers,
  Box,
  BookOpen,
  Github,
  Globe,
  CreditCard,
  Key,
  Zap,
  Smartphone,
  Check,
  Send,
  Lock,
  Plus,
  Minus,
  QrCode,
  ReceiptText,
  Shield,
  ShoppingCart,
  Gavel,
  Package,
  Trophy,
  Database,
} from 'lucide-vue-next'

const schemaIconMap = {
  CreditCard,
  Key,
  Zap,
  Globe,
  Smartphone,
  Check,
  Send,
  Lock,
  Plus,
  Minus,
  QrCode,
  ReceiptText,
  Shield,
  ShoppingCart,
  Gavel,
  Package,
  Trophy,
  Database,
}

const route = useRoute()

const currentIndex = computed(() => {
  const paramId = route.params.id
  return projects.findIndex(p => p.id === paramId)
})

const project = computed(() => {
  if (currentIndex.value === -1) return null
  return projects[currentIndex.value]
})

const prevProject = computed(() => {
  if (currentIndex.value <= 0) return null
  return projects[currentIndex.value - 1]
})

const nextProject = computed(() => {
  if (currentIndex.value === -1 || currentIndex.value >= projects.length - 1) return null
  return projects[currentIndex.value + 1]
})
</script>

<style scoped>
.case-detail-page {
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

.cd-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.cd-back-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.cd-back-link:hover {
  color: var(--accent);
}

.cd-sep {
  color: var(--text-muted);
}

.cd-current {
  color: var(--accent);
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cd-header {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border);
}

.cd-header-top {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.cd-client-logo {
  height: 32px;
  max-width: 120px;
  object-fit: contain;
}

.cd-tag {
  font-size: 0.75rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.cd-title {
  font-family: var(--font-head);
  font-size: 2.75rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .cd-title {
    font-size: 1.85rem;
  }
}

.cd-subtitle {
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 800px;
  margin-bottom: 24px;
}

.cd-impact-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
}

.cd-impact-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 6px;
  font-size: 0.8125rem;
  color: var(--text-primary);
}

.cd-layout {
  display: grid;
  grid-template-columns: 1.25fr 0.95fr;
  gap: 48px;
  align-items: start;
  margin-bottom: 64px;
}

@media (max-width: 960px) {
  .cd-layout {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}

.cd-main-col {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.cd-block {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 28px;
}

.cd-block-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.cd-block-num {
  font-size: 0.8rem;
  color: var(--accent);
  background: rgba(16, 185, 129, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.cd-block-title {
  font-family: var(--font-head);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.cd-block-body {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

.cd-tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cd-tech-tag {
  font-size: 0.8125rem;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  padding: 6px 12px;
  border-radius: 6px;
}

.cd-side-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 90px;
}

.cd-visual-panel {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 24px;
}

.cd-panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
}

.cd-links-panel {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 24px;
}

.cd-links-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cd-link-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.cd-link-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--accent);
  color: var(--accent);
}

.cd-link-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cd-inquiry-box {
  background: rgba(16, 185, 129, 0.05);
  border: 1px dashed rgba(16, 185, 129, 0.35);
  border-radius: 10px;
  padding: 24px;
  text-align: center;
}

.cd-inquiry-title {
  font-family: var(--font-head);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.cd-inquiry-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 16px;
}

.btn-primary-cd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 18px;
  background: var(--accent);
  color: #0b0f17;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.2s ease;
}

.btn-primary-cd:hover {
  background: var(--accent-hover, #34d399);
}

.cd-footer-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 36px;
  border-top: 1px solid var(--border);
}

@media (max-width: 640px) {
  .cd-footer-nav {
    flex-direction: column;
  }
}

.cd-nav-card {
  flex: 1;
  padding: 16px 20px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.cd-nav-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.cd-nav-card.disabled {
  visibility: hidden;
}

.cd-nav-dir {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

.cd-nav-card.next .cd-nav-dir {
  justify-content: flex-end;
}

.cd-nav-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cd-nav-all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  text-decoration: none;
  white-space: nowrap;
}

.cd-nav-all:hover {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
