<template>
  <main class="about-page">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="about-breadcrumb" aria-label="Breadcrumb">
        <router-link to="/" class="about-back-link">
          <ArrowLeft :size="16" />
          <span>Back to Overview</span>
        </router-link>
        <span class="about-sep">/</span>
        <span class="about-current">About Me</span>
      </nav>

      <!-- Profile Header Hero -->
      <section class="about-hero">
        <div class="about-avatar-wrap">
          <img
            src="/avatar.png"
            alt="Hassaan Ali (zfhassaan)"
            class="about-avatar"
            width="120"
            height="120"
          />
          <div class="about-status-dot" title="Available for client engagements & contracts"></div>
        </div>

        <div class="about-hero-text">
          <div class="section-label">Senior Software Engineer · Backend &amp; Distributed Systems</div>
          <h1 class="about-name">Hassaan Ali</h1>
          <p class="about-handle mono text-accent">@zfhassaan · Lahore, Pakistan (Global Remote)</p>
          <p class="about-bio-lead">
            I build resilient backend systems, mission-critical payment gateways, and high-throughput messaging pipelines that don't fail under pressure.
          </p>
        </div>
      </section>

      <!-- Quick Stats Counter Strip -->
      <div class="about-stats-grid">
        <div class="about-stat-card">
          <span class="about-stat-num mono">9+</span>
          <span class="about-stat-label">Years Production Experience</span>
        </div>
        <div class="about-stat-card">
          <span class="about-stat-num mono">2.5M+</span>
          <span class="about-stat-label">Package Downloads (Open Source)</span>
        </div>
        <div class="about-stat-card">
          <span class="about-stat-num mono">40+</span>
          <span class="about-stat-label">Countries Served via UAE SWAT</span>
        </div>
        <div class="about-stat-card">
          <span class="about-stat-num mono">100%</span>
          <span class="about-stat-label">Direct Client Delivery Record</span>
        </div>
      </div>

      <!-- Narrative & Background -->
      <div class="about-layout">
        <!-- Main Column -->
        <div class="about-content-col">
          <!-- Biography -->
          <section class="about-section-card">
            <h2 class="about-h2">
              <User :size="20" class="text-accent" />
              <span>Background &amp; Journey</span>
            </h2>
            <div class="about-prose">
              <p>
                Over the past 9+ years, I have architected and maintained production backends spanning enterprise retail marketplaces, government competition platforms, real-time live auction engines, and fintech transaction ledgers.
              </p>
              <p>
                I specialize in <strong>PHP/Laravel</strong>, <strong>Node.js</strong>, <strong>Go</strong>, and <strong>distributed queue architectures (RabbitMQ / AMQP)</strong>. My work focuses on solving difficult technical challenges: preventing concurrency race conditions, guaranteeing transaction idempotency, optimizing relational databases under heavy read/write pressure, and keeping message queues unblocked.
              </p>
              <p>
                As an upstream collaborator on <a href="https://github.com/bschmitt/laravel-amqp" target="_blank" rel="noopener" class="text-accent">bschmitt/laravel-amqp</a> (2.5M+ downloads), I believe in contributing back to foundational tools. If a community library has a bug or drifts behind framework versions, I fix it upstream so entire ecosystems benefit.
              </p>
            </div>
          </section>

          <!-- Engineering Philosophy -->
          <section class="about-section-card">
            <h2 class="about-h2">
              <ShieldCheck :size="20" class="text-accent" />
              <span>Engineering Philosophy</span>
            </h2>
            <div class="about-pillars">
              <div class="about-pillar">
                <h3 class="about-pillar-title">1. Correctness Over Cleverness</h3>
                <p class="about-pillar-desc">
                  Financial calculations and inventory mutations must never rely on optimistic assumptions. I enforce immutable double-entry ledgers, database row-level locking (<span class="mono">SELECT ... FOR UPDATE</span>), and cryptographic hash checks to ensure zero double-spend or data corruption.
                </p>
              </div>

              <div class="about-pillar">
                <h3 class="about-pillar-title">2. Predictable Performance Under Load</h3>
                <p class="about-pillar-desc">
                  Scalability is not about throwing more servers at a slow query. It's about index design, query profiling with <span class="mono">EXPLAIN ANALYZE</span>, Redis caching strategies, and offloading heavy workloads to asynchronous worker pools with dead-letter exchange (DLQ) retry policies.
                </p>
              </div>

              <div class="about-pillar">
                <h3 class="about-pillar-title">3. Comprehensive Automated Verification</h3>
                <p class="about-pillar-desc">
                  Production confidence requires automated CI matrices. Every SDK and backend module I author is backed by strict PHPUnit / integration tests across multiple runtime versions before touching production.
                </p>
              </div>
            </div>
          </section>

          <!-- Selected Milestones -->
          <section class="about-section-card">
            <h2 class="about-h2">
              <Trophy :size="20" class="text-accent" />
              <span>Key Career Milestones</span>
            </h2>
            <ul class="about-milestones">
              <li class="about-milestone-item">
                <div class="milestone-dot"></div>
                <div class="milestone-content">
                  <span class="milestone-year mono">Government Scale</span>
                  <strong class="milestone-title">UAE SWAT Challenge (Dubai Police)</strong>
                  <p class="milestone-desc">
                    Engineered high-concurrency event scoring and spectator registration portal under strict Dubai Police infrastructure guidelines, serving teams from 40+ countries without a single outage.
                  </p>
                </div>
              </li>
              <li class="about-milestone-item">
                <div class="milestone-dot"></div>
                <div class="milestone-content">
                  <span class="milestone-year mono">Enterprise Retail</span>
                  <strong class="milestone-title">Haier Mall D2C Marketplace</strong>
                  <p class="milestone-desc">
                    Architected direct-to-consumer e-commerce backend handling seasonal promotional flash spikes, multi-provider payment reconciliation, and complex multi-region logistics calculations.
                  </p>
                </div>
              </li>
              <li class="about-milestone-item">
                <div class="milestone-dot"></div>
                <div class="milestone-content">
                  <span class="milestone-year mono">Open Source</span>
                  <strong class="milestone-title">Upstream Collaborator · Laravel AMQP (2.5M+ Downloads)</strong>
                  <p class="milestone-desc">
                    Promoted to collaborator with 6 merged PRs, restoring upgrade paths across modern PHP 8 and Laravel 10/11/12/13 releases for millions of production microservices worldwide.
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <!-- Sidebar Column -->
        <aside class="about-sidebar-col">
          <!-- Skills Matrix -->
          <div class="about-side-card">
            <h3 class="about-side-title">
              <Code2 :size="16" class="text-accent" />
              <span>Core Competencies</span>
            </h3>

            <div class="skill-category">
              <span class="skill-cat-title mono">Languages &amp; Runtimes</span>
              <div class="skill-cat-tags">
                <span class="skill-tag">PHP 8.x</span>
                <span class="skill-tag">JavaScript / ESNext</span>
                <span class="skill-tag">TypeScript</span>
                <span class="skill-tag">Go</span>
                <span class="skill-tag">SQL</span>
              </div>
            </div>

            <div class="skill-category">
              <span class="skill-cat-title mono">Frameworks &amp; Core</span>
              <div class="skill-cat-tags">
                <span class="skill-tag">Laravel 8→13</span>
                <span class="skill-tag">Vue.js 3</span>
                <span class="skill-tag">Next.js / Node.js</span>
                <span class="skill-tag">Tailwind CSS</span>
              </div>
            </div>

            <div class="skill-category">
              <span class="skill-cat-title mono">Data &amp; Queuing</span>
              <div class="skill-cat-tags">
                <span class="skill-tag">RabbitMQ (AMQP)</span>
                <span class="skill-tag">Redis Pub/Sub</span>
                <span class="skill-tag">MySQL &amp; PostgreSQL</span>
                <span class="skill-tag">Pessimistic Locking</span>
              </div>
            </div>

            <div class="skill-category">
              <span class="skill-cat-title mono">Fintech &amp; Security</span>
              <div class="skill-cat-tags">
                <span class="skill-tag">Payment Gateways</span>
                <span class="skill-tag">Double-Entry Ledgers</span>
                <span class="skill-tag">HMAC / SHA-256</span>
                <span class="skill-tag">Idempotent Webhooks</span>
              </div>
            </div>
          </div>

          <!-- Direct Contact Card -->
          <div class="about-contact-card">
            <h3 class="about-side-title">
              <Mail :size="16" class="text-accent" />
              <span>Let's Connect</span>
            </h3>
            <p class="about-contact-p">
              Available for technical consulting, remote contracts, and senior architectural advisory.
            </p>

            <a href="mailto:zfhassaan@gmail.com" class="btn-primary-about">
              <Mail :size="15" />
              <span>zfhassaan@gmail.com</span>
            </a>

            <div class="about-social-links">
              <a href="https://linkedin.com/in/zfhassaan" target="_blank" rel="noopener" class="about-social-link">
                <Linkedin :size="15" />
                <span>LinkedIn</span>
                <ArrowUpRight :size="13" />
              </a>
              <a href="https://github.com/zfhassaan" target="_blank" rel="noopener" class="about-social-link">
                <Github :size="15" />
                <span>GitHub</span>
                <ArrowUpRight :size="13" />
              </a>
              <a
                href="https://github.com/zfhassaan/zfhassaan.github.io/raw/master/public/resume.pdf"
                download="Hassaan_Ali_Senior_Software_Engineer_Resume.pdf"
                class="about-social-link"
              >
                <FileText :size="15" />
                <span>Résumé (PDF)</span>
                <ArrowUpRight :size="13" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup>
import {
  ArrowLeft,
  ArrowUpRight,
  User,
  ShieldCheck,
  Trophy,
  Code2,
  Mail,
  Linkedin,
  Github,
  FileText
} from 'lucide-vue-next'
</script>

<style scoped>
.about-page {
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

.about-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  margin-bottom: 32px;
}

.about-back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.about-back-link:hover {
  color: var(--accent);
}

.about-sep {
  color: var(--text-muted);
}

.about-current {
  color: var(--accent);
}

.about-hero {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 48px;
  padding-bottom: 36px;
  border-bottom: 1px solid var(--border);
}

@media (max-width: 680px) {
  .about-hero {
    flex-direction: column;
    align-items: flex-start;
  }
}

.about-avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.about-avatar {
  border-radius: 50%;
  border: 2px solid var(--accent);
  object-fit: cover;
  background: var(--card);
}

.about-status-dot {
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #10b981;
  border: 3px solid var(--bg);
  box-shadow: 0 0 10px #10b981;
}

.about-name {
  font-family: var(--font-head);
  font-size: 2.75rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.15;
  margin: 6px 0;
}

.about-handle {
  font-size: 0.875rem;
  margin-bottom: 12px;
}

.about-bio-lead {
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 650px;
}

.about-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 48px;
}

@media (max-width: 800px) {
  .about-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.about-stat-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.about-stat-num {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--accent);
}

.about-stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.about-layout {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  align-items: start;
}

@media (max-width: 900px) {
  .about-layout {
    grid-template-columns: 1fr;
  }
}

.about-content-col {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.about-section-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 32px;
}

.about-h2 {
  font-family: var(--font-head);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.about-prose p {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.about-prose p:last-child {
  margin-bottom: 0;
}

.about-pillars {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-pillar {
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 8px;
}

.about-pillar-title {
  font-family: var(--font-head);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.about-pillar-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
}

.about-milestones {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.about-milestone-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.milestone-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  margin-top: 6px;
  flex-shrink: 0;
  box-shadow: 0 0 8px var(--accent);
}

.milestone-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.milestone-year {
  font-size: 0.7rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.milestone-title {
  font-size: 1rem;
  color: var(--text-primary);
}

.milestone-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.about-sidebar-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 90px;
}

.about-side-card, .about-contact-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 24px;
}

.about-side-title {
  font-family: var(--font-head);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
}

.skill-category {
  margin-bottom: 16px;
}

.skill-category:last-child {
  margin-bottom: 0;
}

.skill-cat-title {
  display: block;
  font-size: 0.725rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.skill-cat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.skill-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  padding: 4px 8px;
  border-radius: 4px;
}

.about-contact-p {
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.btn-primary-about {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--accent);
  color: #0b0f17;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  margin-bottom: 16px;
  transition: background 0.2s ease;
}

.btn-primary-about:hover {
  background: var(--accent-hover, #34d399);
}

.about-social-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}

.about-social-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 0.8125rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.about-social-link:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: rgba(255, 255, 255, 0.05);
}
</style>
