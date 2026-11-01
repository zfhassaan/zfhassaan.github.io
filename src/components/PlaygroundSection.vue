<template>
<!-- ══ ARCHITECTURE PLAYGROUND ══ -->
    <section id="playground" class="section">
        <div class="container">
            <div class="reveal" style="margin-bottom:40px">
                <div class="section-label">{{ t('playground.label') }}</div>
                <h2 class="section-h2">{{ t('playground.title') }}</h2>
                <p style="font-size:0.9rem;color:var(--text-muted);margin-top:12px;max-width:500px;line-height:1.65">
                    {{ t('playground.sub') }}
                </p>
            </div>

            <div class="playground-inner reveal">
                <div class="playground-header">
                    <div class="playground-title">
                        <Layers :size="14" class="text-accent inline-block mr-1" />
                        <span>{{ t('playground.path') }}</span>
                    </div>
                    <div class="pg-status">
                        <div class="pg-status-dot"></div>
                        {{ t('playground.status') }} · <span id="pg-rps" style="color:var(--accent)">0</span> req/s
                    </div>
                </div>
                <div class="playground-body">
                    <!-- Flow stages -->
                    <div id="pg-flow">
                        <div class="pg-stage" id="stage-client">
                            <div class="pg-stage-line" id="line-0"></div>
                            <div class="pg-dot" id="dot-0"><Globe :size="16" /></div>
                            <div class="pg-stage-info">
                                <div class="pg-stage-name">{{ t('playground.client') }}</div>
                                <div class="pg-stage-desc">{{ t('playground.clientDesc') }}</div>
                                <div class="pg-metrics">
                                    <span class="pg-metric">POST /api/orders</span>
                                    <span class="pg-metric">Bearer token valid</span>
                                </div>
                            </div>
                        </div>
                        <div class="pg-stage" id="stage-gateway">
                            <div class="pg-stage-line" id="line-1"></div>
                            <div class="pg-dot" id="dot-1"><Zap :size="16" /></div>
                            <div class="pg-stage-info">
                                <div class="pg-stage-name">{{ t('playground.gateway') }}</div>
                                <div class="pg-stage-desc">{{ t('playground.gatewayDesc') }}</div>
                                <div class="pg-metrics">
                                    <span class="pg-metric">Auth: valid</span>
                                    <span class="pg-metric">Rate: 142/1000</span>
                                    <span class="pg-metric" id="pg-latency-gw">~4ms</span>
                                </div>
                            </div>
                        </div>
                        <div class="pg-stage" id="stage-queue">
                            <div class="pg-stage-line" id="line-2"></div>
                            <div class="pg-dot" id="dot-2"><Layers :size="16" /></div>
                            <div class="pg-stage-info">
                                <div class="pg-stage-name">{{ t('playground.queue') }}</div>
                                <div class="pg-stage-desc">{{ t('playground.queueDesc') }}</div>
                                <div class="pg-metrics">
                                    <span class="pg-metric">Queue: orders.critical</span>
                                    <span class="pg-metric" id="pg-queue-depth">depth: 0</span>
                                </div>
                            </div>
                        </div>
                        <div class="pg-stage" id="stage-worker">
                            <div class="pg-stage-line" id="line-3"></div>
                            <div class="pg-dot" id="dot-3"><Cpu :size="16" /></div>
                            <div class="pg-stage-info">
                                <div class="pg-stage-name">{{ t('playground.worker') }}</div>
                                <div class="pg-stage-desc">{{ t('playground.workerDesc') }}</div>
                                <div class="pg-metrics">
                                    <span class="pg-metric">Worker #3</span>
                                    <span class="pg-metric" id="pg-proc-time">~82ms</span>
                                </div>
                            </div>
                        </div>
                        <div class="pg-stage" id="stage-db">
                            <div class="pg-dot" id="dot-4"><Database :size="16" /></div>
                            <div class="pg-stage-info">
                                <div class="pg-stage-name">{{ t('playground.database') }}</div>
                                <div class="pg-stage-desc">{{ t('playground.databaseDesc') }}</div>
                                <div class="pg-metrics">
                                    <span class="pg-metric">TX committed</span>
                                    <span class="pg-metric">Cache: cleared</span>
                                    <span class="pg-metric" id="pg-total-time">total: 0ms</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Log panel -->
                    <div class="pg-log-col">
                        <div id="pg-log">
                            <div class="pg-log-header">
                                <span class="pg-log-dot"></span>
                                <span>system.log — live output</span>
                                <span class="pg-log-badge">LIVE STREAM</span>
                            </div>
                            <div class="pg-log-body" id="pg-log-body">
                                <div class="log-line"><span class="log-time">00:00:00</span> <span
                                        class="log-label">[SYSTEM]</span> Ready. Waiting for request...</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pg-actions">
                    <button class="pg-btn pg-btn-primary magnetic" id="pg-send-btn" onclick="triggerRequest()"
                        :data-idle="t('playground.send')" :data-busy="t('playground.busy')">
                        <Play class="pg-icon-idle" :size="14" />
                        <Loader2 class="pg-icon-busy" :size="14" />
                        <span>{{ t('playground.send') }}</span>
                    </button>
                    <button class="pg-btn pg-btn-secondary magnetic" onclick="clearLog()">
                        <Trash2 :size="14" />
                        <span>{{ t('playground.clear') }}</span>
                    </button>
                    <button class="pg-btn pg-btn-secondary magnetic" onclick="triggerBurst()">
                        <Zap :size="14" />
                        <span>{{ t('playground.burst') }}</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Layers, Globe, Zap, Cpu, Database, Play, Loader2, Trash2 } from 'lucide-vue-next'
const { t } = useI18n()
</script>

<style scoped>
.pg-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
}

.pg-btn {
    display: inline-flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    white-space: nowrap !important;
    width: auto !important;
    gap: 8px !important;
    padding: 10px 20px !important;
}

.pg-btn svg {
    flex-shrink: 0 !important;
}

.pg-icon-busy {
    display: none;
}

.pg-btn.is-busy .pg-icon-idle {
    display: none;
}

.pg-btn.is-busy .pg-icon-busy {
    display: block;
    animation: pg-spin 0.8s linear infinite;
}

@keyframes pg-spin {
    to { transform: rotate(360deg); }
}
</style>
