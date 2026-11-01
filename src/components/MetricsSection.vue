<template>
<!-- ══ METRICS ══ -->
    <section id="metrics">
        <div class="container">
            <div class="metrics-grid">
                <div class="metric-item reveal-scale">
                    <div class="metric-number"><span class="counter" data-target="2500000" data-suffix="M+"
                            data-display="2.5">0</span></div>
                    <div class="metric-label">{{ t('metrics.downloads') }}</div>
                    <div class="metric-sub mono">{{ t('metrics.downloadsSub') }}</div>
                </div>
                <div class="metric-item reveal-scale">
                    <div class="metric-number"><span class="counter" data-target="200" data-suffix="M+">0</span></div>
                    <div class="metric-label">{{ t('metrics.requests') }}</div>
                    <div class="metric-sub mono">{{ t('metrics.requestsSub') }}</div>
                </div>
                <div class="metric-item reveal-scale">
                    <div class="metric-number"><span class="counter" data-target="60" data-suffix="+">0</span></div>
                    <div class="metric-label">{{ t('metrics.projects') }}</div>
                    <div class="metric-sub mono">{{ t('metrics.projectsSub') }}</div>
                </div>
                <div class="metric-item reveal-scale">
                    <div class="metric-number"><span class="counter" data-target="9" data-suffix="+">0</span></div>
                    <div class="metric-label">{{ t('metrics.years') }}</div>
                    <div class="metric-sub mono">{{ t('metrics.yearsSub') }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
