<template>
  <!-- ══ PROJECTS ══ -->
  <section id="projects" class="section" aria-labelledby="projects-heading">
    <div class="container">
      <div class="projects-header">
        <div class="reveal">
          <div class="section-label">Verified Case Studies</div>
          <h2 id="projects-heading" class="section-h2">Engineering Problems &amp; Solutions</h2>
        </div>
        <p class="projects-intro text-muted reveal">
          Every project represents complex technical requirements solved for production — with deliberate architecture, concrete constraints, and verifiable outcomes.
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
                  <div class="case-tag">{{ active.tag }}</div>
                  <h3 class="case-h3" style="margin-top:12px">
                    <a :href="active.href" target="_blank" rel="noopener">
                      {{ active.title }}
                    </a>
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
              v-for="(project, index) in projects"
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
            {{ String(projects.length).padStart(2, '0') }}
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
}

const activeIndex = ref(0)
const paused = ref(false)
const AUTO_MS = 7000
let timer = null

const active = computed(() => projects[activeIndex.value])

function goTo(index) {
  activeIndex.value = (index + projects.length) % projects.length
  restart()
}

function next() {
  goTo(activeIndex.value + 1)
}

function prev() {
  goTo(activeIndex.value - 1)
}

function pause() {
  paused.value = true
  clearInterval(timer)
  timer = null
}

function resume() {
  paused.value = false
  restart()
}

function restart() {
  clearInterval(timer)
  timer = null
  if (paused.value || typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % projects.length
  }, AUTO_MS)
}

onMounted(() => restart())
onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped>
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
</style>
