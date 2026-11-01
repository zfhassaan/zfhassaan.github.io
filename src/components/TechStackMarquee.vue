<template>
  <!-- ══ TECH STACK CONTINUOUS LOGO SLIDER ══ -->
  <section class="tech-marquee-section" aria-label="Core Technical Stack">

    <!-- Seamless Infinite Logo Ticker (No background, No border, No boundary) -->
    <div
      class="marquee-viewport"
      @mouseenter="isPaused = true"
      @mouseleave="isPaused = false"
      @focusin="isPaused = true"
      @focusout="isPaused = false"
    >
      <div class="marquee-track" :class="{ paused: isPaused }">
        <!-- Render duplicated set to guarantee seamless continuous scroll -->
        <div
          v-for="(tech, index) in duplicatedTechnologies"
          :key="`${tech.name}-${index}`"
          class="tech-item"
          :title="tech.name"
        >
          <img
            :src="tech.icon"
            :alt="`${tech.name} logo`"
            class="tech-logo"
            :class="tech.customClass"
            loading="lazy"
          />
          <span class="tech-name mono">{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const isPaused = ref(false)

const technologies = [
  { name: 'PHP 8+', icon: '/images/skills/php.svg', customClass: 'logo-php' },
  { name: 'Laravel', icon: '/images/skills/laravel.svg', customClass: 'logo-laravel' },
  { name: 'RabbitMQ', icon: '/images/skills/rabbitmq.svg', customClass: 'logo-rabbitmq' },
  { name: 'Redis', icon: '/images/skills/redis.svg', customClass: 'logo-redis' },
  { name: 'PostgreSQL', icon: '/images/skills/postgresql.svg', customClass: 'logo-postgres' },
  { name: 'MySQL', icon: '/images/skills/mysql.svg', customClass: 'logo-mysql' },
  { name: 'Go', icon: '/images/skills/go.svg', customClass: 'logo-go' },
  { name: 'Vue.js 3', icon: '/images/skills/vuejs.svg', customClass: 'logo-vue' },
  { name: 'Node.js', icon: '/images/skills/nodejs.svg', customClass: 'logo-node' },
  { name: 'Docker', icon: '/images/skills/docker.svg', customClass: 'logo-docker' },
  { name: 'AWS Cloud', icon: '/images/skills/aws.svg', customClass: 'logo-aws' },
  { name: 'Tailwind CSS', icon: '/images/skills/tailwindcss.svg', customClass: 'logo-tailwind' },
  { name: 'TypeScript', icon: '/images/skills/typescript.svg', customClass: 'logo-ts' },
  { name: 'Git', icon: '/images/skills/git.svg', customClass: 'logo-git' }
]

// Duplicated for seamless CSS translate -50% loop
const duplicatedTechnologies = computed(() => [...technologies, ...technologies])
</script>

<style scoped>
.tech-marquee-section {
  padding: 36px 0 24px 0;
  position: relative;
  overflow: hidden;
  background: transparent;
}

.marquee-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}

.marquee-kicker {
  font-size: 0.725rem;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  text-transform: uppercase;
}

/* Gradient edge mask so items fade smoothly in and out at viewport edges */
.marquee-viewport {
  width: 100%;
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  padding: 12px 0;
  background: transparent;
}

.marquee-track {
  display: flex;
  align-items: center;
  gap: 56px;
  width: max-content;
  animation: marqueeContinuous 38s linear infinite;
  will-change: transform;
}

.marquee-track.paused {
  animation-play-state: paused;
}

@keyframes marqueeContinuous {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation-duration: 90s;
  }
}

/* ── Seamless Item: ZERO background, ZERO border, ZERO border-radius ── */
.tech-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: none;
  outline: none;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  margin: 0;
  user-select: none;
  cursor: default;
  opacity: 0.82;
  filter: grayscale(15%);
  transition: opacity 0.25s ease, filter 0.25s ease, transform 0.25s ease;
  white-space: nowrap;
}

.tech-item:hover {
  opacity: 1;
  filter: grayscale(0%);
  transform: translateY(-2px);
}

.tech-logo {
  height: 38px;
  width: auto;
  max-width: 44px;
  object-fit: contain;
  display: block;
}

/* Specialized sizing to keep visual balance across different logo aspect ratios */
.logo-php {
  height: 32px;
}

.logo-laravel {
  height: 36px;
}

.logo-rabbitmq {
  height: 36px;
}

.logo-redis {
  height: 34px;
}

.logo-postgres {
  height: 38px;
}

.logo-mysql {
  height: 36px;
}

.logo-go {
  height: 28px;
  max-width: 52px;
}

.logo-vue {
  height: 32px;
}

.logo-node {
  height: 36px;
}

.logo-docker {
  height: 34px;
}

.logo-aws {
  height: 30px;
  max-width: 50px;
}

.logo-tailwind {
  height: 28px;
}

.logo-ts {
  height: 32px;
}

.logo-git {
  height: 34px;
}

.tech-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.2s ease;
  letter-spacing: 0.02em;
}

.tech-item:hover .tech-name {
  color: var(--text-primary);
}

@media (max-width: 640px) {
  .marquee-track {
    gap: 40px;
  }
  .tech-logo {
    height: 32px;
  }
  .tech-name {
    font-size: 0.8rem;
  }
}
</style>
