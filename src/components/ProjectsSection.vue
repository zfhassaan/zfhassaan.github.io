<template>
<!-- ══ PROJECTS ══ -->
    <section id="projects" class="section">
        <div class="container">
            <div class="projects-header">
                <div class="reveal">
                    <div class="section-label">Featured Work</div>
                    <h2 class="section-h2">Case Studies</h2>
                </div>
                <p class="text-muted reveal" style="font-size:0.875rem;max-width:280px;line-height:1.6">
                    Systems built for scale — not just to ship. Each project solved real business problems at production
                    load.
                </p>
            </div>

            <!-- Project 1: eCommerce -->
            <div class="case-study reveal">
                <div class="case-info">
                    <div>
                        <div class="case-tag">Enterprise eCommerce</div>
                        <h3 class="case-h3" style="margin-top:12px">Multi-Vendor eCommerce Platform</h3>
                    </div>
                    <div class="case-meta">
                        <div class="case-meta-row">
                            <div class="case-meta-label">Problem</div>
                            <div class="case-meta-value">Monolithic checkout system failing at 5k concurrent users. Cart
                                abandonment at 40% during flash sales.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Solution</div>
                            <div class="case-meta-value">Event-driven microservices with RabbitMQ queues, inventory
                                locking, and async order processing pipeline.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Stack</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="tech-tag">Laravel</span>
                                    <span class="tech-tag">Next.js</span>
                                    <span class="tech-tag">RabbitMQ</span>
                                    <span class="tech-tag">Redis</span>
                                    <span class="tech-tag">MySQL</span>
                                    <span class="tech-tag">Stripe</span>
                                    <span class="tech-tag">React Native</span>
                                </div>
                            </div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Impact</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="impact-tag">↑ 10k concurrent users</span>
                                    <span class="impact-tag">↓ 12% cart abandonment</span>
                                    <span class="impact-tag">99.9% uptime</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="case-visual">
                    <div class="terminal-card">
                        <div class="terminal-bar">
                            <div class="t-dot red"></div>
                            <div class="t-dot yellow"></div>
                            <div class="t-dot green"></div>
                            <div class="t-title">order-service.php</div>
                        </div>
                        <div class="terminal-body">
                            <div class="t-comment">// Event-driven order processing</div>
                            <br>
                            <div><span class="t-key">OrderPlaced</span>::<span class="t-fn">dispatch</span>([</div>
                            <div>&nbsp;&nbsp;<span class="t-str">'order_id'</span> =&gt; <span
                                    class="t-val">$order->id</span>,</div>
                            <div>&nbsp;&nbsp;<span class="t-str">'items'</span> =&gt; <span
                                    class="t-val">$cart->items</span>,</div>
                            <div>&nbsp;&nbsp;<span class="t-str">'payment'</span> =&gt; <span
                                    class="t-str">'stripe'</span>,</div>
                            <div>]);</div>
                            <br>
                            <div class="t-comment">// Queue → Workers → DB</div>
                            <div><span class="t-fn">ProcessInventory</span>::<span class="t-fn">onQueue</span>(</div>
                            <div>&nbsp;&nbsp;<span class="t-str">'critical'</span></div>
                            <div>)-&gt;<span class="t-fn">dispatch</span>();</div>
                            <br>
                            <div class="t-dim">// 200M+ requests served ✓</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Project 2: Payment Gateway -->
            <div class="case-study reverse reveal">
                <div class="case-info">
                    <div>
                        <div class="case-tag">FinTech · Payments</div>
                        <h3 class="case-h3" style="margin-top:12px">Payment Gateway Integration Suite</h3>
                    </div>
                    <div class="case-meta">
                        <div class="case-meta-row">
                            <div class="case-meta-label">Problem</div>
                            <div class="case-meta-value">SaaS platform needed unified payment processing across Stripe,
                                PayPal, and local gateways with idempotent retry logic.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Solution</div>
                            <div class="case-meta-value">Abstraction layer with gateway adapters, webhook verification,
                                automatic reconciliation, and PCI-compliant tokenization.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Stack</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="tech-tag">Node.js</span>
                                    <span class="tech-tag">Express</span>
                                    <span class="tech-tag">Stripe API</span>
                                    <span class="tech-tag">PayPal</span>
                                    <span class="tech-tag">PostgreSQL</span>
                                    <span class="tech-tag">Redis</span>
                                </div>
                            </div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Impact</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="impact-tag">$4.2M monthly volume</span>
                                    <span class="impact-tag">0.003% failure rate</span>
                                    <span class="impact-tag">3 gateways unified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="case-visual">
                    <div class="schema-card">
                        <div class="schema-row">
                            <div class="schema-box highlight"><span class="s-icon">💳</span> Payment Request</div>
                        </div>
                        <div class="schema-connector">
                            <div class="schema-arrow"></div>
                        </div>
                        <div class="schema-row">
                            <div class="schema-box"><span class="s-icon">🔀</span> Gateway Router</div>
                        </div>
                        <div class="schema-connector">
                            <div class="schema-arrow"></div>
                        </div>
                        <div class="schema-row" style="gap:6px">
                            <div class="schema-box" style="font-size:10px"><span class="s-icon">⚡</span> Stripe</div>
                            <div class="schema-box" style="font-size:10px"><span class="s-icon">💙</span> PayPal</div>
                            <div class="schema-box" style="font-size:10px"><span class="s-icon">🏦</span> Local</div>
                        </div>
                        <div class="schema-connector">
                            <div class="schema-arrow"></div>
                        </div>
                        <div class="schema-row">
                            <div class="schema-box highlight"><span class="s-icon">✓</span> Idempotent Response</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Project 3: ERP -->
            <div class="case-study reveal">
                <div class="case-info">
                    <div>
                        <div class="case-tag">Enterprise ERP</div>
                        <h3 class="case-h3" style="margin-top:12px">Custom ERP Platform</h3>
                    </div>
                    <div class="case-meta">
                        <div class="case-meta-row">
                            <div class="case-meta-label">Problem</div>
                            <div class="case-meta-value">Manufacturing company managing inventory, HR, finance, and
                                production in disconnected spreadsheets. Zero real-time visibility.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Solution</div>
                            <div class="case-meta-value">Modular ERP with real-time dashboards, role-based access, audit
                                trails, automated procurement triggers, and financial reporting.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Stack</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="tech-tag">Laravel</span>
                                    <span class="tech-tag">Vue.js</span>
                                    <span class="tech-tag">Nuxt.js</span>
                                    <span class="tech-tag">MySQL</span>
                                    <span class="tech-tag">Redis</span>
                                    <span class="tech-tag">Docker</span>
                                    <span class="tech-tag">Linux</span>
                                </div>
                            </div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Impact</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="impact-tag">↓ 60% manual reporting</span>
                                    <span class="impact-tag">500 concurrent users</span>
                                    <span class="impact-tag">12 modules shipped</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="case-visual">
                    <div class="terminal-card">
                        <div class="terminal-bar">
                            <div class="t-dot red"></div>
                            <div class="t-dot yellow"></div>
                            <div class="t-dot green"></div>
                            <div class="t-title">erp-modules.ts</div>
                        </div>
                        <div class="terminal-body">
                            <div class="t-comment">// ERP Module Registry</div>
                            <br>
                            <div><span class="t-key">const</span> modules = [</div>
                            <div>&nbsp;&nbsp;{ <span class="t-str">id</span>: <span class="t-val">'inventory'</span>,
                                <span class="t-str">realtime</span>: <span class="t-fn">true</span> },
                            </div>
                            <div>&nbsp;&nbsp;{ <span class="t-str">id</span>: <span class="t-val">'finance'</span>,
                                <span class="t-str">reports</span>: <span class="t-fn">true</span> },
                            </div>
                            <div>&nbsp;&nbsp;{ <span class="t-str">id</span>: <span class="t-val">'hr'</span>, <span
                                    class="t-str">payroll</span>: <span class="t-fn">true</span> },</div>
                            <div>&nbsp;&nbsp;{ <span class="t-str">id</span>: <span class="t-val">'production'</span> },
                            </div>
                            <div>];</div>
                            <br>
                            <div class="t-comment">// RBAC: 8 roles, 200+ perms</div>
                            <div><span class="t-fn">authorize</span>(<span class="t-str">'inventory.write'</span>);
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Project 4: AI Automation -->
            <div class="case-study reverse reveal">
                <div class="case-info">
                    <div>
                        <div class="case-tag">AI · Automation</div>
                        <h3 class="case-h3" style="margin-top:12px">AI Automation Platform</h3>
                    </div>
                    <div class="case-meta">
                        <div class="case-meta-row">
                            <div class="case-meta-label">Problem</div>
                            <div class="case-meta-value">Agency spending 200+ hours/month on repetitive content
                                workflows, client reporting, and data extraction tasks.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Solution</div>
                            <div class="case-meta-value">Multi-agent AI platform with orchestration layer, RAG
                                pipelines, custom tools, and human-in-the-loop approval workflows.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Stack</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="tech-tag">Node.js</span>
                                    <span class="tech-tag">Next.js</span>
                                    <span class="tech-tag">OpenAI</span>
                                    <span class="tech-tag">Claude API</span>
                                    <span class="tech-tag">Pinecone</span>
                                    <span class="tech-tag">PostgreSQL</span>
                                </div>
                            </div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Impact</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="impact-tag">↓ 180hrs/month saved</span>
                                    <span class="impact-tag">94% accuracy rate</span>
                                    <span class="impact-tag">12 agents deployed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="case-visual">
                    <div class="schema-card">
                        <div class="schema-row">
                            <div class="schema-box highlight"><span class="s-icon">🧠</span> Orchestrator Agent</div>
                        </div>
                        <div class="schema-connector">
                            <div class="schema-arrow"></div>
                        </div>
                        <div class="schema-row" style="gap:6px">
                            <div class="schema-box" style="font-size:10px"><span class="s-icon">📝</span> Writer</div>
                            <div class="schema-box" style="font-size:10px"><span class="s-icon">🔍</span> Research</div>
                            <div class="schema-box" style="font-size:10px"><span class="s-icon">📊</span> Analyst</div>
                        </div>
                        <div class="schema-connector">
                            <div class="schema-arrow"></div>
                        </div>
                        <div class="schema-row">
                            <div class="schema-box"><span class="s-icon">🔎</span> RAG · Vector DB</div>
                        </div>
                        <div class="schema-connector">
                            <div class="schema-arrow"></div>
                        </div>
                        <div class="schema-row">
                            <div class="schema-box highlight"><span class="s-icon">✅</span> Human Approval Loop</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>
