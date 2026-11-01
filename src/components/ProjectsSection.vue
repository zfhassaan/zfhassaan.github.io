<template>
  <!-- ══ PROJECTS & CASE STUDIES ══ -->
  <section id="projects" class="section" aria-labelledby="projects-heading">
    <div class="container">
      <div class="projects-header">
        <div class="reveal">
          <div class="section-label">Featured Case Studies</div>
          <h2 id="projects-heading" class="section-h2">Production Problems &amp; Solutions</h2>
        </div>
        <p class="projects-intro text-muted reveal">
          Selected high-impact production architectures solved for government scale, enterprise retail, and high-throughput messaging.
        </p>
      </div>

      <div
        class="projects-carousel reveal"
        @mouseenter="pause"
        @mouseleave="resume"
        @focusin="pause"
        @focusout="resume"
      >
        <div class="projects-stage" aria-live="polite">
          <Transition name="case-fade" mode="out-in">
            <article
              :key="active.id"
              class="case-study"
              :class="{ reverse: activeIndex % 2 === 1 }"
            >
              <div class="case-info">
                <div>
                  <div class="case-header-row">
                    <img
                      v-if="active.logo"
                      :src="active.logo"
                      :alt="`${active.title} logo`"
                      class="case-client-logo"
                      :class="active.logoClass"
                    />
                    <div class="case-tag">{{ active.tag }}</div>
                  </div>
                  <h3 class="case-h3" style="margin-top:10px">
                    <router-link :to="{ name: 'case-study-detail', params: { id: active.id } }">
                      {{ active.title }}
                    </router-link>
                  </h3>
                  <p v-if="active.subtitle" class="case-sub" v-html="active.subtitle" />
                </div>
                <div class="case-meta">
                  <div v-if="active.problem" class="case-meta-row">
                    <div class="case-meta-label">Problem</div>
                    <div class="case-meta-value" v-html="active.problem" />
                  </div>
                  <div v-if="active.constraints" class="case-meta-row">
                    <div class="case-meta-label">Constraints</div>
                    <div class="case-meta-value" v-html="active.constraints" />
                  </div>
                  <div v-if="active.approach" class="case-meta-row">
                    <div class="case-meta-label">Approach</div>
                    <div class="case-meta-value" v-html="active.approach" />
                  </div>
                  <div v-if="active.delivery" class="case-meta-row">
                    <div class="case-meta-label">Ownership</div>
                    <div class="case-meta-value" v-html="active.delivery" />
                  </div>
                  <div v-if="active.outcome" class="case-meta-row">
                    <div class="case-meta-label">Outcome</div>
                    <div class="case-meta-value" v-html="active.outcome" />
                  </div>
                  <div v-if="active.stack" class="case-meta-row">
                    <div class="case-meta-label">Stack</div>
                    <div class="case-meta-value">
                      <div class="tech-tags">
                        <span v-for="item in active.stack" :key="item" class="tech-tag">{{ item }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-if="active.impact" class="case-meta-row">
                    <div class="case-meta-label">Proof</div>
                    <div class="case-meta-value">
                      <div class="tech-tags">
                        <span v-for="item in active.impact" :key="item" class="impact-tag">{{ item }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="case-meta-row">
                    <div class="case-meta-label">Links</div>
                    <div class="case-meta-value">
                      <div class="case-links">
                        <!-- Primary CTA to single detail page -->
                        <router-link
                          :to="{ name: 'case-study-detail', params: { id: active.id } }"
                          class="case-link case-link-highlight magnetic"
                        >
                          <BookOpen class="case-link-icon" :size="14" />
                          <span class="case-link-label">Full Case Study</span>
                          <ArrowRight class="case-link-arrow" :size="12" />
                        </router-link>

                        <a
                          v-for="link in active.links"
                          :key="link.href + link.label"
                          :href="link.href"
                          target="_blank"
                          rel="noopener"
                          class="case-link magnetic"
                        >
                          <Box v-if="link.icon === 'packagist'" class="case-link-icon" :size="14" />
                          <BookOpen v-else-if="link.icon === 'docs'" class="case-link-icon" :size="14" />
                          <Github v-else-if="link.icon === 'github'" class="case-link-icon" :size="14" />
                          <Globe v-else-if="link.icon === 'globe'" class="case-link-icon" :size="14" />
                          <span class="case-link-label">{{ link.label }}</span>
                          <ExternalLink class="case-link-arrow" :size="12" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="case-visual">
                <div v-if="active.visual.type === 'terminal'" class="terminal-card">
                  <div class="terminal-bar">
                    <div class="t-dot red"></div>
                    <div class="t-dot yellow"></div>
                    <div class="t-dot green"></div>
                    <div class="t-title">{{ active.visual.title }}</div>
                  </div>
                  <div class="terminal-body">
                    <template v-for="(line, lineIndex) in active.visual.lines" :key="lineIndex">
                      <br v-if="line === null" />
                      <div v-else v-html="line" />
                    </template>
                  </div>
                </div>

                <div v-else-if="active.visual.type === 'schema'" class="schema-card">
                  <template v-for="(row, rowIndex) in active.visual.rows" :key="rowIndex">
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
                      v-if="rowIndex < active.visual.rows.length - 1"
                      class="schema-connector"
                    >
                      <div class="schema-arrow"></div>
                    </div>
                  </template>
                </div>
              </div>
            </article>
          </Transition>
        </div>

        <div class="projects-controls">
          <button
            type="button"
            class="projects-nav-btn magnetic"
            aria-label="Previous project"
            @click="prev"
          >
            <ArrowLeft :size="16" />
          </button>

          <div class="projects-dots" role="tablist" aria-label="Project slides">
            <button
              v-for="(project, index) in featuredProjects"
              :key="project.id"
              type="button"
              class="projects-dot"
              role="tab"
              :aria-selected="index === activeIndex"
              :aria-label="`Show ${project.title}`"
              :class="{ active: index === activeIndex }"
              @click="goTo(index)"
            />
          </div>

          <div class="projects-pager mono">
            {{ String(activeIndex + 1).padStart(2, '0') }}
            <span class="projects-pager-sep">/</span>
            {{ String(featuredProjects.length).padStart(2, '0') }}
          </div>

          <button
            type="button"
            class="projects-nav-btn magnetic"
            aria-label="Next project"
            @click="next"
          >
            <ArrowRight :size="16" />
          </button>
        </div>

        <!-- Link to all case studies -->
        <div class="projects-view-all">
          <router-link :to="{ name: 'case-studies' }" class="btn-view-all-cs magnetic">
            <span>Explore All 9 Case Studies &amp; Projects</span>
            <ArrowRight :size="16" />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { projects } from '@/data/projects'
import {
  Box,
  BookOpen,
  Github,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
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

// 3 Strongest projects as requested: UAE SWAT, Haier Mall, Laravel AMQP
const FEATURED_IDS = ['uae-swat', 'haier-mall', 'laravel-amqp']
const featuredProjects = computed(() => {
  return FEATURED_IDS.map(id => projects.find(p => p.id === id)).filter(Boolean)
})

const activeIndex = ref(0)
const paused = ref(false)
const AUTO_MS = 7000
let timer = null

const active = computed(() => featuredProjects.value[activeIndex.value] || featuredProjects.value[0])

function goTo(index) {
  activeIndex.value = (index + featuredProjects.value.length) % featuredProjects.value.length
}

function next() {
  goTo(activeIndex.value + 1)
}

function prev() {
  goTo(activeIndex.value - 1)
}

function startTimer() {
  stopTimer()
  timer = setInterval(() => {
    if (!paused.value) next()
  }, AUTO_MS)
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function pause() {
  paused.value = true
}

function resume() {
  paused.value = false
}

onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<style scoped>
.case-header-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}

.case-client-logo {
  height: 28px;
  max-width: 120px;
  object-fit: contain;
}

.case-client-logo.logo-swat {
  height: 32px;
}

.case-client-logo.logo-haier {
  height: 22px;
}

.case-client-logo.logo-amqp {
  height: 30px;
}

.case-links {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.case-link {
  display: inline-flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: center !important;
  white-space: nowrap !important;
  width: auto !important;
  gap: 8px !important;
  padding: 8px 14px !important;
  text-decoration: none;
  font-size: 0.8125rem;
}

.case-link-highlight {
  background: rgba(16, 185, 129, 0.12) !important;
  border-color: rgba(16, 185, 129, 0.4) !important;
  color: var(--accent) !important;
  font-weight: 600;
}

.case-link-highlight:hover {
  background: var(--accent) !important;
  color: #0b0f17 !important;
}

.case-link-icon,
.case-link-arrow {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}

.case-link-label {
  white-space: nowrap !important;
}

.projects-view-all {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}

.btn-view-all-cs {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
}

.btn-view-all-cs:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}
</style>
