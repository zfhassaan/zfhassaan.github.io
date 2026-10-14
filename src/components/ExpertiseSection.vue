<template>
    <!-- ══ SERVICES & CAPABILITIES ══ -->
    <section id="services" class="section">
        <span id="expertise" style="position:relative;top:-84px;display:block;visibility:hidden;"></span>
        <div class="container">
            <div class="reveal" style="margin-bottom:16px">
                <div class="section-label">Services &amp; Capabilities</div>
                <h2 class="section-h2">What I Build &amp; Deliver</h2>
            </div>
            <p style="font-size:0.92rem;color:var(--text-muted);max-width:620px;line-height:1.65;margin-bottom:0"
                class="reveal">
                Direct engineering services for founders, engineering teams, and product leaders who require reliable backend architecture and verifiable results.
            </p>

            <div class="services-minimal-grid">
                <!-- 1. Backend Architecture & APIs -->
                <div class="service-minimal-card reveal">
                    <div class="service-icon-wrap">
                        <Server :size="20" class="service-icon" />
                    </div>
                    <h3 class="service-title">Backend Architecture &amp; APIs</h3>
                    <p class="service-desc">
                        High-throughput Laravel (PHP 8.x) and Node.js backend services. Clean REST and GraphQL APIs engineered for sub-second latency, maintainability, and scale.
                    </p>
                    <div class="service-tags">
                        <span class="service-tag">Laravel 12</span>
                        <span class="service-tag">REST &amp; GraphQL</span>
                        <span class="service-tag">MySQL &amp; Postgres</span>
                    </div>
                </div>

                <!-- 2. Payment Gateways & Fintech -->
                <div class="service-minimal-card reveal">
                    <div class="service-icon-wrap">
                        <CreditCard :size="20" class="service-icon" />
                    </div>
                    <h3 class="service-title">Payment Gateways &amp; Fintech</h3>
                    <p class="service-desc">
                        Production checkout integrations, 3DS verification, webhook reconciliation, and tamper-proof immutable double-entry ledgers.
                    </p>
                    <div class="service-tags">
                        <span class="service-tag">JazzCash &amp; PayFast</span>
                        <span class="service-tag">Idempotent Webhooks</span>
                        <span class="service-tag">Ledger Systems</span>
                    </div>
                </div>

                <!-- 3. Distributed Systems & Queues -->
                <div class="service-minimal-card reveal">
                    <div class="service-icon-wrap">
                        <Layers :size="20" class="service-icon" />
                    </div>
                    <h3 class="service-title">Distributed Systems &amp; Queues</h3>
                    <p class="service-desc">
                        Asynchronous event pipelines, RabbitMQ topologies, dead-letter retry queues (DLQ), and high-performance background workers.
                    </p>
                    <div class="service-tags">
                        <span class="service-tag">RabbitMQ (AMQP)</span>
                        <span class="service-tag">Redis Pub/Sub</span>
                        <span class="service-tag">Go CLI Tooling</span>
                    </div>
                </div>

                <!-- 4. Performance & System Audits -->
                <div class="service-minimal-card reveal">
                    <div class="service-icon-wrap">
                        <Gauge :size="20" class="service-icon" />
                    </div>
                    <h3 class="service-title">Performance Audits &amp; Optimization</h3>
                    <p class="service-desc">
                        Resolving database query bottlenecks, eliminating concurrency race conditions with row-locking, and zero-downtime legacy upgrades.
                    </p>
                    <div class="service-tags">
                        <span class="service-tag">Query Profiling</span>
                        <span class="service-tag">Concurrency Locks</span>
                        <span class="service-tag">Zero Downtime</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { Server, CreditCard, Layers, Gauge } from 'lucide-vue-next'
</script>

<style scoped>
.services-minimal-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 40px;
}

@media (max-width: 768px) {
    .services-minimal-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }
}

.service-minimal-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px;
    display: flex;
    flex-direction: column;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
}

.service-minimal-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.4), transparent);
    opacity: 0;
    transition: opacity 0.25s ease;
}

.service-minimal-card:hover {
    border-color: rgba(45, 212, 191, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 12px 30px -15px rgba(0, 0, 0, 0.5);
}

.service-minimal-card:hover::before {
    opacity: 1;
}

.service-icon-wrap {
    width: 42px;
    height: 42px;
    border-radius: 8px;
    background: rgba(45, 212, 191, 0.08);
    border: 1px solid rgba(45, 212, 191, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.service-icon {
    color: var(--accent);
}

.service-title {
    font-family: var(--font-head);
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 10px;
    line-height: 1.3;
}

.service-desc {
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: 20px;
    flex: 1;
}

.service-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
}

.service-tag {
    font-family: var(--font-mono);
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    color: var(--text-muted);
    letter-spacing: 0.03em;
}
</style>
