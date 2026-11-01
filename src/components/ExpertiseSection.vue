<template>
    <!-- ══ SERVICES & CAPABILITIES ══ -->
    <section id="services" class="section">
        <span id="expertise" style="position:relative;top:-84px;display:block;visibility:hidden;"></span>
        <div class="container">
            <div class="reveal" style="margin-bottom:16px">
                <div class="section-label">{{ t('services.label') }}</div>
                <h2 class="section-h2">{{ t('services.title') }}</h2>
            </div>
            <p style="font-size:0.92rem;color:var(--text-muted);max-width:620px;line-height:1.65;margin-bottom:0"
                class="reveal">
                {{ t('services.intro') }}
            </p>

            <div class="services-minimal-grid">
                <!-- 1. Backend Architecture & APIs -->
                <div class="service-minimal-card reveal">
                    <div class="service-icon-wrap">
                        <Server :size="20" class="service-icon" />
                    </div>
                    <h3 class="service-title">{{ t('services.s1title') }}</h3>
                    <p class="service-desc">{{ t('services.s1desc') }}</p>
                    <div class="service-tags">
                        <span class="service-tag">{{ t('services.tagLaravel') }}</span>
                        <span class="service-tag">{{ t('services.tagRest') }}</span>
                        <span class="service-tag">{{ t('services.tagDb') }}</span>
                    </div>
                </div>

                <!-- 2. Payment Gateways & Fintech -->
                <div class="service-minimal-card reveal">
                    <div class="service-icon-wrap">
                        <CreditCard :size="20" class="service-icon" />
                    </div>
                    <h3 class="service-title">{{ t('services.s2title') }}</h3>
                    <p class="service-desc">{{ t('services.s2desc') }}</p>
                    <div class="service-tags">
                        <span class="service-tag">{{ t('services.tagPay') }}</span>
                        <span class="service-tag">{{ t('services.tagWebhooks') }}</span>
                        <span class="service-tag">{{ t('services.tagLedger') }}</span>
                    </div>
                </div>

                <!-- 3. Distributed Systems & Queues -->
                <div class="service-minimal-card reveal">
                    <div class="service-icon-wrap">
                        <Layers :size="20" class="service-icon" />
                    </div>
                    <h3 class="service-title">{{ t('services.s3title') }}</h3>
                    <p class="service-desc">{{ t('services.s3desc') }}</p>
                    <div class="service-tags">
                        <span class="service-tag">{{ t('services.tagAmqp') }}</span>
                        <span class="service-tag">{{ t('services.tagRedis') }}</span>
                        <span class="service-tag">{{ t('services.tagGo') }}</span>
                    </div>
                </div>

                <!-- 4. Performance & System Audits -->
                <div class="service-minimal-card reveal">
                    <div class="service-icon-wrap">
                        <Gauge :size="20" class="service-icon" />
                    </div>
                    <h3 class="service-title">{{ t('services.s4title') }}</h3>
                    <p class="service-desc">{{ t('services.s4desc') }}</p>
                    <div class="service-tags">
                        <span class="service-tag">{{ t('services.tagQuery') }}</span>
                        <span class="service-tag">{{ t('services.tagLocks') }}</span>
                        <span class="service-tag">{{ t('services.tagZero') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Server, CreditCard, Layers, Gauge } from 'lucide-vue-next'
const { t } = useI18n()
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
