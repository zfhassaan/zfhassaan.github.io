<template>
    <!-- ══ OPEN SOURCE ══ -->
    <section id="opensource" class="section">
        <div class="container">
            <div class="os-grid">
                <div class="os-info reveal">
                    <div class="section-label">Open Source · Contributor</div>
                    <h2 class="section-h2">Laravel RabbitMQ</h2>
                    <p class="os-intro">
                        I help maintain <span class="mono os-intro-mono">bschmitt/laravel-amqp</span> —
                        a widely-adopted community package (not mine originally). I've merged compatibility and CI work
                        upstream; my fork keeps the latest messaging features current, and hosts rebuilt docs at
                        <a href="https://zfhassaan.github.io/laravel-amqp" target="_blank" rel="noopener"
                            class="os-intro-link">zfhassaan.github.io/laravel-amqp</a> while the documentation PR
                        is pending review.
                    </p>
                    <div class="os-stat-row">
                        <div class="os-stat">
                            <div class="os-stat-num"><span class="counter" data-target="2500000" data-display="2.5"
                                    data-suffix="M+">0</span></div>
                            <div class="os-stat-label">Pkg downloads</div>
                        </div>
                        <div class="os-stat">
                            <div class="os-stat-num"><span class="os-stat-accent">6</span></div>
                            <div class="os-stat-label">Merged PRs</div>
                        </div>
                        <div class="os-stat">
                            <div class="os-stat-num"><span class="os-stat-accent">PR</span></div>
                            <div class="os-stat-label">Docs pending</div>
                        </div>
                    </div>
                    <div class="os-contrib">
                        <div class="os-contrib-label">CONTRIBUTION ACTIVITY</div>
                        <div class="contrib-grid" id="contrib-grid"></div>
                    </div>
                </div>

                <div class="reveal os-diagram-col">
                    <div class="rmq-diagram">
                        <div class="rmq-diagram-title">Message Flow Architecture</div>
                        <div class="rmq-nodes" id="rmq-flow">
                            <div class="rmq-node">
                                <div class="rmq-box" id="rmq-producer">
                                    <div class="rmq-icon">📤</div>
                                    <div>Producer</div>
                                </div>
                                <div class="rmq-label">Publisher</div>
                            </div>
                            <div class="rmq-arrow" aria-hidden="true"></div>
                            <div class="rmq-node">
                                <div class="rmq-box" id="rmq-exchange">
                                    <div class="rmq-icon">🔀</div>
                                    <div>Exchange</div>
                                </div>
                                <div class="rmq-label">Router</div>
                            </div>
                            <div class="rmq-arrow" aria-hidden="true"></div>
                            <div class="rmq-node">
                                <div class="rmq-box" id="rmq-queue">
                                    <div class="rmq-icon">⬡</div>
                                    <div>Queue</div>
                                </div>
                                <div class="rmq-label">Buffer</div>
                            </div>
                            <div class="rmq-arrow" aria-hidden="true"></div>
                            <div class="rmq-node">
                                <div class="rmq-box" id="rmq-consumer">
                                    <div class="rmq-icon">📥</div>
                                    <div>Consumer</div>
                                </div>
                                <div class="rmq-label">Laravel</div>
                            </div>
                        </div>

                        <div class="rmq-composer">
                            <div class="rmq-composer-label">composer.json</div>
                            <div class="rmq-composer-code">
                                <span class="t-comment">"require"</span>: {<br>
                                &nbsp;&nbsp;<span class="t-str">"bschmitt/laravel-amqp"</span>:<br>
                                &nbsp;&nbsp;<span class="t-val">"^3.0"</span><br>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
