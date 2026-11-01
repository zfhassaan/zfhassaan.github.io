<template>
  <!-- ══ CLIENT FAQ & OBJECTION BUSTER ══ -->
  <section id="faq" class="section">
    <div class="container">
      <div class="reveal" style="margin-bottom: 20px">
        <div class="section-label">Clarity &amp; Working Relationship</div>
        <h2 class="section-h2">Frequently Asked Questions</h2>
      </div>
      <p class="faq-sub text-muted reveal">
        Everything you need to know about starting an engagement, delivery models, communication, and project handoff.
      </p>

      <div class="faq-grid reveal">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="faq-card"
          :class="{ open: openIndex === index }"
        >
          <button
            type="button"
            class="faq-question-btn"
            :aria-expanded="openIndex === index"
            @click="toggle(index)"
          >
            <span class="faq-q-text">{{ item.question }}</span>
            <ChevronDown
              :size="18"
              class="faq-chevron"
              :class="{ rotated: openIndex === index }"
            />
          </button>

          <div v-show="openIndex === index" class="faq-answer">
            <p>{{ item.answer }}</p>
            <div v-if="item.highlight" class="faq-highlight mono">
              <Check :size="13" class="highlight-icon" />
              <span>{{ item.highlight }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Consultation Callout -->
      <div class="faq-cta-banner reveal">
        <div class="faq-cta-left">
          <div class="faq-cta-title">Have a specific technical question or timeline constraint?</div>
          <div class="faq-cta-sub">I review briefs and provide initial architectural feedback within 24 hours.</div>
        </div>
        <router-link :to="{ name: 'home', hash: '#contact' }" class="btn-primary magnetic faq-cta-btn">
          <span>Discuss Your Project</span>
          <ArrowRight :size="14" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ChevronDown, Check, ArrowRight } from 'lucide-vue-next'

const openIndex = ref(0)

function toggle(index) {
  openIndex.value = openIndex.value === index ? -1 : index
}

const faqs = [
  {
    question: 'How do you structure engagements (milestones, contracts, or hourly)?',
    answer:
      'Most client engagements are structured around clear, milestone-driven deliverables with fixed scope and agreed deadlines. For ongoing architectural guidance, scaling sprints, or fractional engineering, hourly rates and weekly retainers are also available. Every milestone has verifiable acceptance criteria so you never pay for ambiguous work.',
    highlight: 'Milestone escrow via Upwork or direct invoicing available.'
  },
  {
    question: 'What timezones do you work with, and how is communication handled?',
    answer:
      'I operate with strong async communication discipline, providing daily progress summaries and screen recordings (Loom) for complete visibility. I maintain scheduled meeting overlap with US (EST/PST), UK (GMT), and European (CET) business hours via Slack, Discord, Microsoft Teams, or Google Meet.',
    highlight: 'Async-first with guaranteed reply within 24 hours.'
  },
  {
    question: 'Can you work with our existing codebase, or only greenfield projects?',
    answer:
      'A substantial portion of my work involves auditing, refactoring, and scaling existing production monoliths and APIs. I specialize in zero-downtime refactoring, decoupling bottleneck services, adding missing automated test suites, and integrating third-party payment gateways into established applications without disrupting live revenue.',
    highlight: 'Production-safe refactoring with automated test suites.'
  },
  {
    question: 'What is your typical onboarding timeline to kick off a project?',
    answer:
      'Following an initial technical discovery chat and brief review, I provide a scope breakdown and architectural roadmap within 24 to 48 hours. Once milestones are approved, development begins immediately with dedicated sandbox environments and automated staging deployments.',
    highlight: 'Roadmap and kickoff within 24–48 hours of initial brief.'
  },
  {
    question: 'Who owns the intellectual property (IP) and source code?',
    answer:
      'You retain 100% full intellectual property ownership of all source code, architecture documentation, configuration scripts, and assets produced during the engagement. I am always happy to sign standard mutual Non-Disclosure Agreements (NDA) prior to reviewing proprietary codebases.',
    highlight: '100% client IP ownership & mutual NDA signed upfront.'
  },
  {
    question: 'Can I hire you through Upwork or contract directly?',
    answer:
      'Both options are welcome. International clients who prefer escrow protection and automated platform invoicing can hire me through my verified Top-Rated Upwork profile. Alternatively, we can contract directly via milestone invoices with international wire, Stripe, or Wise bank transfer.',
    highlight: 'Hire via Upwork (escrow protection) or direct client engagement.'
  }
]

onMounted(() => {
  // Inject FAQPage Schema for Google Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = 'faq-jsonld'
  script.textContent = JSON.stringify(faqSchema)
  if (!document.getElementById('faq-jsonld')) {
    document.head.appendChild(script)
  }
})
</script>

<style scoped>
.faq-sub {
  font-size: 0.95rem;
  line-height: 1.65;
  max-width: 680px;
  margin-bottom: 36px;
}

.faq-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 920px;
}

.faq-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.faq-card.open {
  border-color: rgba(45, 212, 191, 0.4);
  background: rgba(255, 255, 255, 0.02);
}

.faq-question-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  gap: 16px;
}

.faq-q-text {
  font-family: var(--font-head);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
}

.faq-card.open .faq-q-text {
  color: var(--accent);
}

.faq-chevron {
  color: var(--text-secondary);
  transition: transform 0.25s ease, color 0.2s ease;
  flex-shrink: 0;
}

.faq-chevron.rotated {
  transform: rotate(180deg);
  color: var(--accent);
}

.faq-answer {
  padding: 0 22px 20px 22px;
  font-size: 0.88rem;
  line-height: 1.7;
  color: var(--text-secondary);
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-top: 14px;
}

.faq-highlight {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 6px 12px;
  border-radius: 4px;
  background: rgba(45, 212, 191, 0.08);
  border: 1px solid rgba(45, 212, 191, 0.2);
  color: var(--accent);
  font-size: 0.775rem;
}

.highlight-icon {
  flex-shrink: 0;
}

/* ── FAQ Bottom Banner ── */
.faq-cta-banner {
  margin-top: 36px;
  max-width: 920px;
  background: linear-gradient(135deg, rgba(45, 212, 191, 0.06) 0%, rgba(15, 23, 42, 0.4) 100%);
  border: 1px solid rgba(45, 212, 191, 0.25);
  border-radius: var(--radius);
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.faq-cta-left {
  flex: 1;
  min-width: 280px;
}

.faq-cta-title {
  font-family: var(--font-head);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.faq-cta-sub {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.faq-cta-btn {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  width: auto;
  gap: 8px;
  text-decoration: none;
}
</style>

