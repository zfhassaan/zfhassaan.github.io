<template>
<!-- ══ OPEN SOURCE ══ -->
    <section id="opensource" class="section">
        <div class="container">
            <div class="os-grid">
                <div class="os-info reveal">
                    <div class="section-label">Open Source</div>
                    <h2 class="section-h2">Laravel RabbitMQ</h2>
                    <p
                        style="font-size:0.95rem;color:var(--text-secondary);line-height:1.7;margin-top:16px;max-width:480px">
                        Production-grade RabbitMQ integration for Laravel. Powers distributed message queuing,
                        event-driven architectures, and async job processing in enterprise applications across the PHP
                        ecosystem.
                    </p>
                    <div class="os-stat-row">
                        <div class="os-stat">
                            <div class="os-stat-num"><span class="counter" data-target="2500000" data-display="2.5"
                                    data-suffix="M+">0</span></div>
                            <div class="os-stat-label">Total Downloads</div>
                        </div>
                        <div class="os-stat">
                            <div class="os-stat-num"><span style="color:var(--accent)">1.2k</span></div>
                            <div class="os-stat-label">GitHub Stars</div>
                        </div>
                        <div class="os-stat">
                            <div class="os-stat-num"><span style="color:var(--accent)">v3</span></div>
                            <div class="os-stat-label">Current Version</div>
                        </div>
                    </div>
                    <!-- Contrib heatmap -->
                    <div style="margin-top:24px">
                        <div
                            style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);margin-bottom:8px;letter-spacing:0.08em">
                            CONTRIBUTION ACTIVITY</div>
                        <div class="contrib-grid" id="contrib-grid"></div>
                    </div>
                </div>

                <div class="reveal">
                    <div class="rmq-diagram">
                        <div
                            style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:24px">
                            Message Flow Architecture</div>
                        <div class="rmq-nodes" id="rmq-flow">
                            <div class="rmq-node">
                                <div class="rmq-box" id="rmq-producer">
                                    <div class="rmq-icon">📤</div>
                                    <div>Producer</div>
                                </div>
                                <div class="rmq-label">Publisher</div>
                            </div>
                            <div
                                style="flex:0 0 24px;height:1px;background:rgba(255,255,255,0.08);margin-top:-16px;align-self:center;position:relative">
                                <span
                                    style="position:absolute;right:-4px;top:-8px;color:rgba(255,255,255,0.15)">›</span>
                            </div>
                            <div class="rmq-node">
                                <div class="rmq-box" id="rmq-exchange">
                                    <div class="rmq-icon">🔀</div>
                                    <div>Exchange</div>
                                </div>
                                <div class="rmq-label">Router</div>
                            </div>
                            <div
                                style="flex:0 0 24px;height:1px;background:rgba(255,255,255,0.08);margin-top:-16px;align-self:center;position:relative">
                                <span
                                    style="position:absolute;right:-4px;top:-8px;color:rgba(255,255,255,0.15)">›</span>
                            </div>
                            <div class="rmq-node">
                                <div class="rmq-box" id="rmq-queue">
                                    <div class="rmq-icon">⬡</div>
                                    <div>Queue</div>
                                </div>
                                <div class="rmq-label">Buffer</div>
                            </div>
                            <div
                                style="flex:0 0 24px;height:1px;background:rgba(255,255,255,0.08);margin-top:-16px;align-self:center;position:relative">
                                <span
                                    style="position:absolute;right:-4px;top:-8px;color:rgba(255,255,255,0.15)">›</span>
                            </div>
                            <div class="rmq-node">
                                <div class="rmq-box" id="rmq-consumer">
                                    <div class="rmq-icon">📥</div>
                                    <div>Consumer</div>
                                </div>
                                <div class="rmq-label">Laravel</div>
                            </div>
                        </div>

                        <div style="margin-top:28px;padding-top:20px;border-top:1px solid var(--border)">
                            <div
                                style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);margin-bottom:10px">
                                composer.json</div>
                            <div
                                style="background:var(--bg-primary);border:1px solid var(--border);border-radius:6px;padding:12px;font-family:var(--font-mono);font-size:11px;line-height:1.6">
                                <span style="color:var(--text-muted)">"require"</span>: {<br>
                                &nbsp;&nbsp;<span style="color:#F59E0B">"vyuldashev/laravel-rabbitmq"</span>:<br>
                                &nbsp;&nbsp;<span style="color:var(--accent2)">"^3.0"</span><br>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
