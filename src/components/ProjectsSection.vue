<template>
  <!-- ══ PROJECTS ══ -->
  <section id="projects" class="section" aria-labelledby="projects-heading">
    <div class="container">
      <div class="projects-header">
        <div class="reveal">
          <div class="section-label">Featured Work</div>
          <h2 id="projects-heading" class="section-h2">Case Studies</h2>
        </div>
        <p class="projects-intro text-muted reveal">
          Systems built for scale — not just to ship. Each project solved real business problems at production
          load.
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
                  <div class="case-meta-row">
                    <div class="case-meta-label">Problem</div>
                    <div class="case-meta-value" v-html="active.problem" />
                  </div>
                  <div class="case-meta-row">
                    <div class="case-meta-label">Solution</div>
                    <div class="case-meta-value" v-html="active.solution" />
                  </div>
                  <div class="case-meta-row">
                    <div class="case-meta-label">Stack</div>
                    <div class="case-meta-value">
                      <div class="tech-tags">
                        <span v-for="item in active.stack" :key="item" class="tech-tag">{{ item }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="case-meta-row">
                    <div class="case-meta-label">Impact</div>
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
                          <span v-if="link.icon === 'packagist'" class="case-link-icon">📦</span>
                          <span v-else-if="link.icon === 'docs'" class="case-link-icon">📖</span>
                          <svg
                            v-else-if="link.icon === 'github'"
                            class="case-link-icon"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                            />
                          </svg>
                          {{ link.label }}
                          <span class="case-link-arrow">↗</span>
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
                      :style="row.boxes.length > 1 ? { gap: '6px' } : undefined"
                    >
                      <div
                        v-for="(box, boxIndex) in row.boxes"
                        :key="boxIndex"
                        class="schema-box"
                        :class="{ highlight: box.highlight }"
                        :style="box.small ? { fontSize: '10px' } : undefined"
                      >
                        <span class="s-icon">{{ box.icon }}</span> {{ box.text }}
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
            ←
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
            →
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { projects } from '@/data/projects'

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
