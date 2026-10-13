<template>
  <!-- ══ CLIENT REVIEWS & SOCIAL PROOF ══ -->
  <section id="testimonials" class="section">
    <div class="container">
      <div class="reveal" style="margin-bottom: 20px">
        <div class="section-label">Client Feedback &amp; Verification</div>
        <h2 class="section-h2">What Founders &amp; Engineering Leaders Say</h2>
      </div>
      <p class="testim-sub text-muted reveal">
        Feedback from founders, product managers, and engineering teams across verified Upwork and direct client engagements.
      </p>

      <div class="testim-grid">
        <article
          v-for="(t, i) in testimonials"
          :key="i"
          class="testim-card reveal"
        >
          <!-- Stars & Platform Badge -->
          <div class="testim-top">
            <div class="testim-stars" aria-label="5 out of 5 stars">
              <Star v-for="s in 5" :key="s" :size="14" class="star-icon" />
            </div>
            <span class="testim-platform-badge mono">
              <CheckCircle2 :size="12" class="badge-check" />
              {{ t.platform }}
            </span>
          </div>

          <!-- Quote -->
          <blockquote class="testim-quote">
            “{{ t.quote }}”
          </blockquote>

          <!-- Author Info -->
          <div class="testim-author">
            <div class="testim-author-avatar">
              <span>{{ t.initials }}</span>
            </div>
            <div class="testim-author-meta">
              <div class="testim-name">{{ t.author }}</div>
              <div class="testim-role mono">{{ t.role }} · {{ t.location }}</div>
            </div>
          </div>
        </article>
      </div>

      <!-- Trust Badges Summary -->
      <div class="testim-trust-row reveal">
        <div class="trust-stat">
          <div class="trust-stat-num">100%</div>
          <div class="trust-stat-label mono">Job Success on Remote Engagements</div>
        </div>
        <div class="trust-sep"></div>
        <div class="trust-stat">
          <div class="trust-stat-num">5.0 ★</div>
          <div class="trust-stat-label mono">Average Client Rating</div>
        </div>
        <div class="trust-sep"></div>
        <div class="trust-stat">
          <div class="trust-stat-num">&lt; 24h</div>
          <div class="trust-stat-label mono">Initial Technical Response Time</div>
        </div>
        <div class="trust-sep"></div>
        <div class="trust-stat">
          <div class="trust-stat-num">60+</div>
          <div class="trust-stat-label mono">Commercial Deliveries &amp; Packages</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Star, CheckCircle2 } from 'lucide-vue-next'

const testimonials = [
  {
    quote:
      'Hassaan is exceptional at tackling complex backend requirements that other engineers shy away from. He delivered a flawless payment gateway integration with idempotent webhook processing ahead of our production launch schedule.',
    author: 'Fintech Founder & CTO',
    role: 'Payment Infrastructure',
    location: 'United States',
    initials: 'FT',
    platform: 'Verified Upwork Contract'
  },
  {
    quote:
      'Great communication, transparent milestone updates, and rock-solid code. Refactored our high-volume inventory and order processing bottlenecks without a minute of downtime during our peak sales season.',
    author: 'Head of Digital Products',
    role: 'E-Commerce Platform',
    location: 'UAE / GCC',
    initials: 'DP',
    platform: 'Direct Client Engagement'
  },
  {
    quote:
      'Very dependable senior engineer. Designed our multi-tenant database architecture and RabbitMQ queue pipelines. He anticipates edge cases before they become production bugs and documents everything meticulously.',
    author: 'B2B SaaS Founder',
    role: 'Cloud Platform & CRM',
    location: 'Austin, TX',
    initials: 'SB',
    platform: 'Verified Remote Client'
  }
]
</script>

<style scoped>
.testim-sub {
  font-size: 0.95rem;
  line-height: 1.65;
  max-width: 680px;
  margin-bottom: 36px;
}

.testim-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

@media (max-width: 960px) {
  .testim-grid {
    grid-template-columns: 1fr;
  }
}

.testim-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.25s ease;
}

.testim-card:hover {
  border-color: rgba(45, 212, 191, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -12px rgba(0, 0, 0, 0.5);
}

.testim-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.testim-stars {
  display: flex;
  gap: 3px;
  color: #f59e0b;
}

.star-icon {
  fill: #f59e0b;
}

.testim-platform-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px;
  border-radius: 4px;
  background: rgba(45, 212, 191, 0.08);
  border: 1px solid rgba(45, 212, 191, 0.2);
  color: var(--accent);
  font-size: 10.5px;
  font-weight: 500;
}

.badge-check {
  flex-shrink: 0;
}

.testim-quote {
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--text-secondary);
  font-style: normal;
  margin: 0 0 20px 0;
  flex: 1;
}

.testim-author {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.testim-author-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(45, 212, 191, 0.12);
  border: 1px solid rgba(45, 212, 191, 0.3);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.testim-name {
  font-family: var(--font-head);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.testim-role {
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.03em;
}

/* ── Trust Summary Strip ── */
.testim-trust-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 32px;
  flex-wrap: wrap;
  gap: 20px;
}

.trust-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.trust-stat-num {
  font-family: var(--font-head);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
}

.trust-stat-label {
  font-size: 11px;
  color: var(--text-secondary);
  letter-spacing: 0.04em;
}

.trust-sep {
  width: 1px;
  height: 36px;
  background: var(--border);
}

@media (max-width: 768px) {
  .trust-sep {
    display: none;
  }
  .testim-trust-row {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
}
</style>
