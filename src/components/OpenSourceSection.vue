<template>
    <!-- ══ OPEN SOURCE & CONTRIBUTIONS ══ -->
    <section id="opensource" class="section">
        <div class="container">
            <div class="os-header reveal">
                <div class="section-label">{{ t('opensource.label') }}</div>
                <h2 class="section-h2">{{ t('opensource.title') }}</h2>
                <p class="os-header-sub text-muted">
                    {{ t('opensource.sub') }}
                </p>
            </div>

            <!-- Tabbed or Dual Grid of Featured Contributions -->
            <div class="os-cards-grid">
                <!-- Card 1: Laravel RabbitMQ (laravel-amqp) -->
                <div class="os-card reveal">
                    <div class="os-card-badge">
                        <Check :size="14" class="text-accent" />
                        <span>{{ t('opensource.badge1') }}</span>
                    </div>

                    <div class="os-card-header">
                        <h3 class="os-card-title">
                            <a href="https://github.com/bschmitt/laravel-amqp" target="_blank" rel="noopener">
                                bschmitt/laravel-amqp
                            </a>
                        </h3>
                        <span class="os-pill mono">RabbitMQ · AMQP</span>
                    </div>

                    <p class="os-card-desc">{{ t('opensource.desc1') }}</p>

                    <div class="os-stat-row">
                        <div class="os-stat">
                            <div class="os-stat-num"><span class="counter" data-target="2500000" data-display="2.5" data-suffix="M+">2.5M+</span></div>
                            <div class="os-stat-label">{{ t('opensource.downloads') }}</div>
                        </div>
                        <div class="os-stat">
                            <div class="os-stat-num"><span class="os-stat-accent">6</span></div>
                            <div class="os-stat-label">{{ t('opensource.prs') }}</div>
                        </div>
                        <div class="os-stat">
                            <div class="os-stat-num"><span class="os-stat-accent">PHP 8+</span></div>
                            <div class="os-stat-label">Laravel 8→13</div>
                        </div>
                    </div>

                    <!-- Compact Message Flow -->
                    <div class="rmq-mini-flow" dir="ltr">
                        <span class="rmq-mini-node">Producer</span>
                        <ArrowRight class="rmq-mini-arrow" :size="14" :stroke-width="1.75" />
                        <span class="rmq-mini-node">Exchange</span>
                        <ArrowRight class="rmq-mini-arrow" :size="14" :stroke-width="1.75" />
                        <span class="rmq-mini-node">Queue</span>
                        <ArrowRight class="rmq-mini-arrow" :size="14" :stroke-width="1.75" />
                        <span class="rmq-mini-node">Consumer</span>
                    </div>

                    <div class="os-card-actions">
                        <a href="https://zfhassaan.github.io/laravel-amqp" target="_blank" rel="noopener" class="btn-primary-sm magnetic">
                            <Globe :size="14" />
                            <span>{{ t('opensource.docs') }}</span>
                            <ExternalLink :size="12" />
                        </a>
                        <a href="https://github.com/bschmitt/laravel-amqp" target="_blank" rel="noopener" class="btn-secondary-sm magnetic">
                            <Github :size="14" />
                            <span>{{ t('opensource.repo') }}</span>
                        </a>
                    </div>
                </div>

                <!-- Card 2: Barcode Studio -->
                <div class="os-card reveal">
                    <div class="os-card-badge">
                        <Sparkles :size="14" class="text-accent" />
                        <span>{{ t('opensource.badge2') }}</span>
                    </div>

                    <div class="os-card-header">
                        <h3 class="os-card-title">
                            <a href="https://github.com/zfhassaan/barcode-studio" target="_blank" rel="noopener">
                                zfhassaan/barcode-studio
                            </a>
                        </h3>
                        <span class="os-pill mono">SVG · Canvas · QR</span>
                    </div>

                    <p class="os-card-desc">{{ t('opensource.desc2') }}</p>

                    <div class="os-stat-row">
                        <div class="os-stat">
                            <div class="os-stat-num"><span class="os-stat-accent">Vector</span></div>
                            <div class="os-stat-label">SVG &amp; Canvas</div>
                        </div>
                        <div class="os-stat">
                            <div class="os-stat-num"><span class="os-stat-accent">10+</span></div>
                            <div class="os-stat-label">{{ t('opensource.symbologies') }}</div>
                        </div>
                        <div class="os-stat">
                            <div class="os-stat-num"><span class="os-stat-accent">Open</span></div>
                            <div class="os-stat-label">MIT License</div>
                        </div>
                    </div>

                    <!-- Visual preview bar -->
                    <div class="barcode-preview-box">
                        <div class="barcode-bars" aria-hidden="true">
                            <span class="b-bar b-1"></span><span class="b-bar b-2"></span><span class="b-bar b-1"></span><span class="b-bar b-3"></span>
                            <span class="b-bar b-2"></span><span class="b-bar b-1"></span><span class="b-bar b-2"></span><span class="b-bar b-1"></span>
                            <span class="b-bar b-3"></span><span class="b-bar b-2"></span><span class="b-bar b-1"></span><span class="b-bar b-3"></span>
                            <span class="b-bar b-1"></span><span class="b-bar b-2"></span><span class="b-bar b-1"></span><span class="b-bar b-3"></span>
                        </div>
                        <span class="barcode-preview-sub mono">BARCODE STUDIO v1.0 // FAST VECTOR ENGINE</span>
                    </div>

                    <div class="os-card-actions">
                        <a
                            href="https://github.com/zfhassaan/barcode-studio/issues/new?labels=enhancement"
                            target="_blank"
                            rel="noopener"
                            class="btn-primary-sm magnetic"
                            :title="t('opensource.featureTitle')"
                        >
                            <PlusCircle :size="14" />
                            <span>{{ t('opensource.feature') }}</span>
                            <ExternalLink :size="12" />
                        </a>
                        <a
                            href="https://github.com/zfhassaan/barcode-studio"
                            target="_blank"
                            rel="noopener"
                            class="btn-secondary-sm magnetic"
                        >
                            <Github :size="14" />
                            <span>{{ t('opensource.githubRepo') }}</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- GitHub Activity Note -->
            <div class="os-footer-note reveal">
                <Github :size="16" class="text-accent" />
                <span>
                    {{ t('opensource.more') }}
                    <a href="https://github.com/zfhassaan" target="_blank" rel="noopener" class="os-footer-link">
                        github.com/zfhassaan
                        <ArrowRight :size="14" />
                    </a>
                </span>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Check, Globe, Github, ExternalLink, Sparkles, PlusCircle, ArrowRight } from 'lucide-vue-next'
const { t } = useI18n()
</script>

<style scoped>
.os-header {
    margin-bottom: 36px;
    max-width: 760px;
}

.os-header-sub {
    font-size: 1rem;
    line-height: 1.6;
    margin-top: 10px;
}

.os-cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
    margin-bottom: 32px;
}

@media (max-width: 900px) {
    .os-cards-grid {
        grid-template-columns: 1fr;
    }
}

.os-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: border-color 0.25s ease, transform 0.25s ease;
}

.os-card:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
}

.os-card-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 16px;
}

.os-card-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
}

.os-card-title {
    font-family: var(--font-head);
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
}

.os-card-title a {
    color: inherit;
    text-decoration: none;
}

.os-card-title a:hover {
    color: var(--accent);
}

.os-pill {
    font-size: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    padding: 4px 8px;
    border-radius: 4px;
    color: var(--text-muted);
}

.os-card-desc {
    color: var(--text-secondary);
    font-size: 0.925rem;
    line-height: 1.6;
    margin-bottom: 24px;
}

.os-stat-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 20px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    margin-bottom: 20px;
}

.os-stat {
    display: flex;
    flex-direction: column;
}

.os-stat-num {
    font-family: var(--font-head);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
}

.os-stat-accent {
    color: var(--accent);
}

.os-stat-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 2px;
}

.rmq-mini-flow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 10px 14px;
    margin-bottom: 24px;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-secondary);
}

.rmq-mini-node {
    background: rgba(255, 255, 255, 0.04);
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.rmq-mini-arrow {
    color: var(--accent);
}

.barcode-preview-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 12px 14px;
    margin-bottom: 24px;
    gap: 6px;
}

.barcode-bars {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 24px;
}

.b-bar {
    background: var(--accent);
    height: 100%;
    display: inline-block;
    border-radius: 1px;
    opacity: 0.85;
}

.b-1 { width: 2px; }
.b-2 { width: 4px; }
.b-3 { width: 6px; }

.barcode-preview-sub {
    font-size: 0.65rem;
    color: var(--text-muted);
    letter-spacing: 0.08em;
}

.os-card-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin-top: auto;
}

.btn-primary-sm, .btn-secondary-sm {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 500;
    padding: 8px 14px;
    border-radius: 6px;
    text-decoration: none;
    transition: all 0.2s ease;
}

.btn-primary-sm {
    background: var(--accent);
    color: var(--on-accent);
    font-weight: 600;
}

.btn-primary-sm:hover {
    background: var(--accent-hover, #34d399);
}

.btn-secondary-sm {
    background: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border);
}

.btn-secondary-sm:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--accent);
}

.os-footer-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px dashed var(--border);
    border-radius: 8px;
    font-size: 0.875rem;
    color: var(--text-secondary);
    text-align: center;
}

.os-footer-link {
    color: var(--accent);
    font-weight: 500;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-inline-start: 4px;
}

.os-footer-link:hover {
    text-decoration: underline;
}
</style>
