<template>
    <!-- ══ WORKING PROCESS & TRUST SIGNALS ══ -->
    <section id="process" class="section">
        <div class="container">
            <div class="reveal" style="margin-bottom:20px">
                <div class="section-label">{{ t('process.label') }}</div>
                <h2 class="section-h2">{{ t('process.title') }}</h2>
            </div>
            <p style="font-size:0.92rem;color:var(--text-muted);max-width:620px;line-height:1.65;margin-bottom:0"
                class="reveal">
                {{ t('process.intro') }}
            </p>

            <!-- 4-step process timeline -->
            <div class="process-steps">
                <div class="process-step reveal">
                    <div class="step-num">01</div>
                    <div class="step-header">
                        <div class="step-badge">{{ t('process.phase', { n: 1 }) }}</div>
                        <h3 class="step-title">{{ t('process.p1title') }}</h3>
                    </div>
                    <p class="step-desc">{{ t('process.p1desc') }}</p>
                    <div class="step-deliverable">
                        <span class="deliverable-label">{{ t('process.deliverable') }}</span>
                        <span>{{ t('process.p1out') }}</span>
                    </div>
                </div>

                <div class="process-step reveal">
                    <div class="step-num">02</div>
                    <div class="step-header">
                        <div class="step-badge">{{ t('process.phase', { n: 2 }) }}</div>
                        <h3 class="step-title">{{ t('process.p2title') }}</h3>
                    </div>
                    <p class="step-desc">{{ t('process.p2desc') }}</p>
                    <div class="step-deliverable">
                        <span class="deliverable-label">{{ t('process.deliverable') }}</span>
                        <span>{{ t('process.p2out') }}</span>
                    </div>
                </div>

                <div class="process-step reveal">
                    <div class="step-num">03</div>
                    <div class="step-header">
                        <div class="step-badge">{{ t('process.phase', { n: 3 }) }}</div>
                        <h3 class="step-title">{{ t('process.p3title') }}</h3>
                    </div>
                    <p class="step-desc">{{ t('process.p3desc') }}</p>
                    <div class="step-deliverable">
                        <span class="deliverable-label">{{ t('process.deliverable') }}</span>
                        <span>{{ t('process.p3out') }}</span>
                    </div>
                </div>

                <div class="process-step reveal">
                    <div class="step-num">04</div>
                    <div class="step-header">
                        <div class="step-badge">{{ t('process.phase', { n: 4 }) }}</div>
                        <h3 class="step-title">{{ t('process.p4title') }}</h3>
                    </div>
                    <p class="step-desc">{{ t('process.p4desc') }}</p>
                    <div class="step-deliverable">
                        <span class="deliverable-label">{{ t('process.deliverable') }}</span>
                        <span>{{ t('process.p4out') }}</span>
                    </div>
                </div>
            </div>

            <!-- Trust signals & working principles -->
            <div class="trust-grid reveal">
                <div class="trust-card">
                    <div class="trust-card-header">
                        <div class="trust-icon"><Globe :size="20" /></div>
                        <h4 class="trust-title">{{ t('process.t1title') }}</h4>
                    </div>
                    <div class="trust-desc">{{ t('process.t1desc') }}</div>
                </div>

                <div class="trust-card">
                    <div class="trust-card-header">
                        <div class="trust-icon"><MessageSquare :size="20" /></div>
                        <h4 class="trust-title">{{ t('process.t2title') }}</h4>
                    </div>
                    <div class="trust-desc">{{ t('process.t2desc') }}</div>
                </div>

                <div class="trust-card">
                    <div class="trust-card-header">
                        <div class="trust-icon"><Shield :size="20" /></div>
                        <h4 class="trust-title">{{ t('process.t3title') }}</h4>
                    </div>
                    <div class="trust-desc">{{ t('process.t3desc') }}</div>
                </div>

                <div class="trust-card">
                    <div class="trust-card-header">
                        <div class="trust-icon"><Users :size="20" /></div>
                        <h4 class="trust-title">{{ t('process.t4title') }}</h4>
                    </div>
                    <div class="trust-desc">{{ t('process.t4desc') }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Globe, MessageSquare, Shield, Users } from 'lucide-vue-next'
const { t } = useI18n()
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
