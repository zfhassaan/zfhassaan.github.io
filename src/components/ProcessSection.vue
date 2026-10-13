<template>
    <!-- ══ WORKING PROCESS & TRUST SIGNALS ══ -->
    <section id="process" class="section">
        <div class="container">
            <div class="reveal" style="margin-bottom:20px">
                <div class="section-label">Working Process &amp; Trust</div>
                <h2 class="section-h2">How We Work Together</h2>
            </div>
            <p style="font-size:0.92rem;color:var(--text-muted);max-width:620px;line-height:1.65;margin-bottom:0"
                class="reveal">
                A structured, milestone-driven engagement model designed to remove friction, provide predictable delivery, and keep international clients informed every step of the way.
            </p>

            <!-- 4-step process timeline -->
            <div class="process-steps">
                <div class="process-step reveal">
                    <div class="step-num">01</div>
                    <div class="step-header">
                        <div class="step-badge">Phase 1</div>
                        <h3 class="step-title">Technical Discovery &amp; Scope Alignment</h3>
                    </div>
                    <p class="step-desc">
                        We begin by reviewing your core business problem, existing architecture, and technical constraints. Rather than jumping straight into code, we clarify requirements, identify hidden edge cases, and evaluate third-party APIs or payment providers.
                    </p>
                    <div class="step-deliverable">
                        <span class="deliverable-label">Deliverable:</span>
                        <span>Architectural summary, scope breakdown, and milestone timeline</span>
                    </div>
                </div>

                <div class="process-step reveal">
                    <div class="step-num">02</div>
                    <div class="step-header">
                        <div class="step-badge">Phase 2</div>
                        <h3 class="step-title">Milestone Planning &amp; Agreement</h3>
                    </div>
                    <p class="step-desc">
                        Every project is broken into distinct, verifiable milestones with defined acceptance criteria. You have complete transparency over what will be delivered, when it will be ready, and the exact investment involved — with zero surprise scope creep.
                    </p>
                    <div class="step-deliverable">
                        <span class="deliverable-label">Deliverable:</span>
                        <span>Prioritized milestone contract, acceptance criteria &amp; delivery dates</span>
                    </div>
                </div>

                <div class="process-step reveal">
                    <div class="step-num">03</div>
                    <div class="step-header">
                        <div class="step-badge">Phase 3</div>
                        <h3 class="step-title">Iterative Delivery &amp; Async Updates</h3>
                    </div>
                    <p class="step-desc">
                        Work proceeds in focused sprints with frequent commits, automated tests, and staging deployments. I provide proactive written updates and Loom video walkthroughs, maintaining 4–6 hours of daily overlap with US and European time zones.
                    </p>
                    <div class="step-deliverable">
                        <span class="deliverable-label">Deliverable:</span>
                        <span>Staging preview URLs, GitHub PRs with test coverage &amp; video walkthroughs</span>
                    </div>
                </div>

                <div class="process-step reveal">
                    <div class="step-num">04</div>
                    <div class="step-header">
                        <div class="step-badge">Phase 4</div>
                        <h3 class="step-title">Production Launch &amp; Knowledge Transfer</h3>
                    </div>
                    <p class="step-desc">
                        Zero-downtime deployment, production telemetry checks, and comprehensive documentation. After launch, I provide a warranty support window and clean knowledge handover so your team can maintain and scale the system with complete confidence.
                    </p>
                    <div class="step-deliverable">
                        <span class="deliverable-label">Deliverable:</span>
                        <span>Production release, OpenAPI/Postman specs, runbook &amp; warranty support</span>
                    </div>
                </div>
            </div>

            <!-- Trust signals & working principles -->
            <div class="trust-grid reveal">
                <div class="trust-card">
                    <div class="trust-card-header">
                        <div class="trust-icon"><Globe :size="20" /></div>
                        <h4 class="trust-title">Global Time Zone Overlap</h4>
                    </div>
                    <div class="trust-desc">
                        Based in Lahore (UTC+5), offering 4–6 hours of regular working overlap with teams in North America (EST/PST mornings), Europe, and the Middle East.
                    </div>
                </div>

                <div class="trust-card">
                    <div class="trust-card-header">
                        <div class="trust-icon"><MessageSquare :size="20" /></div>
                        <h4 class="trust-title">Clear, Proactive Communication</h4>
                    </div>
                    <div class="trust-desc">
                        Concise async updates via Slack, email, or Loom. Technical trade-offs, potential roadblocks, and timelines are communicated early so there are no surprises.
                    </div>
                </div>

                <div class="trust-card">
                    <div class="trust-card-header">
                        <div class="trust-icon"><Shield :size="20" /></div>
                        <h4 class="trust-title">Production-Grade Standards</h4>
                    </div>
                    <div class="trust-desc">
                        Automated test suites (PHPUnit, Pest, Jest), strict typing, database row locks for financial transactions, and cryptographic verification come standard.
                    </div>
                </div>

                <div class="trust-card">
                    <div class="trust-card-header">
                        <div class="trust-icon"><Users :size="20" /></div>
                        <h4 class="trust-title">Direct Senior Ownership</h4>
                    </div>
                    <div class="trust-desc">
                        No agency overhead or middle management. You work directly with a senior engineer who takes personal ownership of system reliability and business success.
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { Globe, MessageSquare, Shield, Users } from 'lucide-vue-next'
</script>

<style scoped>
.process-steps {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 40px;
}

@media (max-width: 860px) {
    .process-steps {
        grid-template-columns: 1fr;
    }
}

.process-step {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 28px;
    position: relative;
    display: flex;
    flex-direction: column;
    transition: border-color 0.25s, transform 0.25s;
}

.process-step:hover {
    border-color: rgba(45, 212, 191, 0.35);
    transform: translateY(-2px);
}

.step-num {
    font-family: var(--font-mono);
    font-size: 2.2rem;
    font-weight: 700;
    color: rgba(45, 212, 191, 0.18);
    position: absolute;
    top: 20px;
    right: 24px;
    line-height: 1;
}

.step-header {
    margin-bottom: 12px;
}

.step-badge {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 6px;
}

.step-title {
    font-family: var(--font-head);
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.35;
    padding-right: 40px;
}

.step-desc {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 20px;
    flex: 1;
}

.step-deliverable {
    border-top: 1px solid var(--border);
    padding-top: 14px;
    font-size: 0.8125rem;
    color: var(--text-secondary);
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: baseline;
}

.deliverable-label {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
}

.trust-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 32px;
}

@media (max-width: 1024px) {
    .trust-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 600px) {
    .trust-grid {
        grid-template-columns: 1fr;
    }
}

.trust-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 22px 18px;
    display: flex;
    flex-direction: column;
}

.trust-card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
}

.trust-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--accent);
    margin-bottom: 0;
}

.trust-title {
    font-family: var(--font-head);
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0;
    line-height: 1.3;
}

.trust-desc {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    line-height: 1.55;
}
</style>
