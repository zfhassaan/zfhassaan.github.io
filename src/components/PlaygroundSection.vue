<template>
<!-- ══ ARCHITECTURE PLAYGROUND ══ -->
    <section id="playground" class="section">
        <div class="container">
            <div class="reveal" style="margin-bottom:40px">
                <div class="section-label">Interactive</div>
                <h2 class="section-h2">Architecture Playground</h2>
                <p style="font-size:0.9rem;color:var(--text-muted);margin-top:12px;max-width:500px;line-height:1.65">
                    Simulate a real request flowing through a distributed system. Trigger events and watch the
                    architecture respond in real time.
                </p>
            </div>

            <div class="playground-inner reveal">
                <div class="playground-header">
                    <div class="playground-title">
                        <span>⬡</span> distributed-system / request-lifecycle
                    </div>
                    <div class="pg-status">
                        <div class="pg-status-dot"></div>
                        System Operational · <span id="pg-rps" style="color:var(--accent)">0</span> req/s
                    </div>
                </div>
                <div class="playground-body">
                    <!-- Flow stages -->
                    <div id="pg-flow">
                        <div class="pg-stage" id="stage-client">
                            <div class="pg-stage-line" id="line-0"></div>
                            <div class="pg-dot" id="dot-0">🌐</div>
                            <div class="pg-stage-info">
                                <div class="pg-stage-name">Client Request</div>
                                <div class="pg-stage-desc">HTTP request from browser or mobile app, with auth token and
                                    payload</div>
                                <div class="pg-metrics">
                                    <span class="pg-metric">POST /api/orders</span>
                                    <span class="pg-metric">Bearer token ✓</span>
                                </div>
                            </div>
                        </div>
                        <div class="pg-stage" id="stage-gateway">
                            <div class="pg-stage-line" id="line-1"></div>
                            <div class="pg-dot" id="dot-1">⚡</div>
                            <div class="pg-stage-info">
                                <div class="pg-stage-name">API Gateway</div>
                                <div class="pg-stage-desc">JWT validation, rate limiting (1000 req/min), request routing
                                    and transformation</div>
                                <div class="pg-metrics">
                                    <span class="pg-metric">Auth: valid</span>
                                    <span class="pg-metric">Rate: 142/1000</span>
                                    <span class="pg-metric" id="pg-latency-gw">~4ms</span>
                                </div>
                            </div>
                        </div>
                        <div class="pg-stage" id="stage-queue">
                            <div class="pg-stage-line" id="line-2"></div>
                            <div class="pg-dot" id="dot-2">⬡</div>
                            <div class="pg-stage-info">
                                <div class="pg-stage-name">Message Queue</div>
                                <div class="pg-stage-desc">Job serialized and dispatched to RabbitMQ. Immediate
                                    acknowledgement returned to client.</div>
                                <div class="pg-metrics">
                                    <span class="pg-metric">Queue: orders.critical</span>
                                    <span class="pg-metric" id="pg-queue-depth">depth: 0</span>
                                </div>
                            </div>
                        </div>
                        <div class="pg-stage" id="stage-worker">
                            <div class="pg-stage-line" id="line-3"></div>
                            <div class="pg-dot" id="dot-3">⚙️</div>
                            <div class="pg-stage-info">
                                <div class="pg-stage-name">Worker Processing</div>
                                <div class="pg-stage-desc">Laravel/Node worker picks job. Validates business logic,
                                    checks inventory, calculates pricing.</div>
                                <div class="pg-metrics">
                                    <span class="pg-metric">Worker #3</span>
                                    <span class="pg-metric" id="pg-proc-time">~82ms</span>
                                </div>
                            </div>
                        </div>
                        <div class="pg-stage" id="stage-db">
                            <div class="pg-dot" id="dot-4">🗄️</div>
                            <div class="pg-stage-info">
                                <div class="pg-stage-name">Database Write</div>
                                <div class="pg-stage-desc">Transaction committed. Cache invalidated. Webhook fired.
                                    Event sourced to audit log.</div>
                                <div class="pg-metrics">
                                    <span class="pg-metric">TX committed</span>
                                    <span class="pg-metric">Cache: cleared</span>
                                    <span class="pg-metric" id="pg-total-time">total: 0ms</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Log panel -->
                    <div>
                        <div id="pg-log">
                            <div class="pg-log-header">
                                <span>▶</span> system.log — live output
                            </div>
                            <div class="pg-log-body" id="pg-log-body">
                                <div class="log-line"><span class="log-time">00:00:00</span> <span
                                        class="log-label">[SYSTEM]</span> Ready. Waiting for request...</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pg-actions">
                    <button class="pg-btn pg-btn-primary magnetic" id="pg-send-btn" onclick="triggerRequest()">
                        ▶ Send Request
                    </button>
                    <button class="pg-btn pg-btn-secondary magnetic" onclick="clearLog()">
                        ✕ Clear Log
                    </button>
                    <button class="pg-btn pg-btn-secondary magnetic" onclick="triggerBurst()">
                        ⚡ Burst (10x)
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
