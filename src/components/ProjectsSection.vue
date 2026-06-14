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

            <!-- Project 1: JazzCash Laravel SDK -->
            <div class="case-study reveal">
                <div class="case-info">
                    <div>
                        <div class="case-tag">Open Source · Payments · Pakistan</div>
                        <h3 class="case-h3" style="margin-top:12px">
                            <a href="https://github.com/zfhassaan/jazzcash" target="_blank" rel="noopener">
                                JazzCash Laravel SDK
                            </a>
                        </h3>
                    </div>
                    <div class="case-meta">
                        <div class="case-meta-row">
                            <div class="case-meta-label">Problem</div>
                            <div class="case-meta-value">Integrating JazzCash — Pakistan's leading mobile-money gateway —
                                meant hand-rolling undocumented hash-key signing, assembling hosted-checkout payloads by
                                hand, and juggling sandbox/production switching. No Laravel-native package existed.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Solution</div>
                            <div class="case-meta-value">A Laravel package
                                (<span class="mono">composer require zfhassaan/jazzcash</span>) wrapping hosted checkout —
                                a fluent <span class="mono">setAmount/setBillReference</span> API, secure hash-key
                                request signing, env-driven sandbox↔production switching, auto-discovered provider &amp;
                                facade, and a CI test matrix.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Stack</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="tech-tag">Laravel</span>
                                    <span class="tech-tag">PHP</span>
                                    <span class="tech-tag">JazzCash API</span>
                                    <span class="tech-tag">Packagist</span>
                                    <span class="tech-tag">GitHub Actions</span>
                                    <span class="tech-tag">PHPUnit</span>
                                </div>
                            </div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Impact</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="impact-tag">15★ · 8 forks</span>
                                    <span class="impact-tag">Laravel 8→13 · PHP 7.3→8.5</span>
                                    <span class="impact-tag">Published on Packagist</span>
                                    <span class="impact-tag">Hosted checkout + sandbox</span>
                                </div>
                            </div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Links</div>
                            <div class="case-meta-value">
                                <div class="case-links">
                                    <a href="https://packagist.org/packages/zfhassaan/jazzcash" target="_blank"
                                        rel="noopener" class="case-link magnetic">
                                        <span class="case-link-icon">📦</span> Packagist
                                        <span class="case-link-arrow">↗</span>
                                    </a>
                                    <a href="https://github.com/zfhassaan/jazzcash" target="_blank" rel="noopener"
                                        class="case-link magnetic">
                                        <svg class="case-link-icon" width="14" height="14" viewBox="0 0 24 24"
                                            fill="currentColor">
                                            <path
                                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        GitHub
                                        <span class="case-link-arrow">↗</span>
                                    </a>
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
                            <div class="t-title">JazzCashController.php</div>
                        </div>
                        <div class="terminal-body">
                            <div class="t-comment">// Hosted checkout in four lines</div>
                            <br>
                            <div><span class="t-val">$jazzcash</span> = <span class="t-key">new</span> <span
                                    class="t-fn">JazzCash</span>();</div>
                            <div><span class="t-val">$jazzcash</span>-&gt;<span class="t-fn">setAmount</span>(<span
                                    class="t-val">$request->amount</span>);</div>
                            <div><span class="t-val">$jazzcash</span>-&gt;<span
                                    class="t-fn">setBillReference</span>(<span class="t-val">$ref</span>);</div>
                            <div><span class="t-key">return</span> <span class="t-val">$jazzcash</span>-&gt;<span
                                    class="t-fn">sendRequest</span>();</div>
                            <br>
                            <div class="t-comment">// Hash-key signed · sandbox ↔ production</div>
                            <div class="t-dim">// 15★ · Laravel 8→13 · PHP 7.3→8.5 ✓</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Project 2: PayFast Laravel SDK -->
            <div class="case-study reverse reveal">
                <div class="case-info">
                    <div>
                        <div class="case-tag">Open Source · Payments · Pakistan</div>
                        <h3 class="case-h3" style="margin-top:12px">
                            <a href="https://github.com/zfhassaan/payfast" target="_blank" rel="noopener">
                                PayFast Laravel SDK
                            </a>
                        </h3>
                    </div>
                    <div class="case-meta">
                        <div class="case-meta-row">
                            <div class="case-meta-label">Problem</div>
                            <div class="case-meta-value">PayFast — a major Pakistani payment gateway — had thin
                                documentation and no proper Laravel SDK. Integrations were hand-rolled, with no
                                idempotency guarantees and no IPN (Instant Payment Notification) handling.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Solution</div>
                            <div class="case-meta-value">Built and published an open-source Laravel SDK
                                (<span class="mono">composer require zfhassaan/payfast</span>) for the Pakistan payments
                                environment — direct &amp; hosted checkout, 3DS OTP flow, auth-token management, mobile
                                wallets, idempotent transaction checks, and IPN listeners — shipped with full docs.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Stack</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="tech-tag">Laravel</span>
                                    <span class="tech-tag">PHP 8</span>
                                    <span class="tech-tag">PayFast API</span>
                                    <span class="tech-tag">Packagist</span>
                                    <span class="tech-tag">Blade</span>
                                    <span class="tech-tag">PHPUnit</span>
                                </div>
                            </div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Impact</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="impact-tag">Laravel 9→12 · PHP 8+</span>
                                    <span class="impact-tag">9 releases · v1.1.0</span>
                                    <span class="impact-tag">IPN + idempotent checks</span>
                                    <span class="impact-tag">Direct + Hosted checkout</span>
                                </div>
                            </div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Links</div>
                            <div class="case-meta-value">
                                <div class="case-links">
                                    <a href="https://zfhassaan.github.io/payfast/" target="_blank" rel="noopener"
                                        class="case-link magnetic">
                                        <span class="case-link-icon">📖</span> Documentation
                                        <span class="case-link-arrow">↗</span>
                                    </a>
                                    <a href="https://github.com/zfhassaan/payfast" target="_blank" rel="noopener"
                                        class="case-link magnetic">
                                        <svg class="case-link-icon" width="14" height="14" viewBox="0 0 24 24"
                                            fill="currentColor">
                                            <path
                                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        GitHub
                                        <span class="case-link-arrow">↗</span>
                                    </a>
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
                            <div class="schema-box"><span class="s-icon">🔑</span> Auth Token · 3DS OTP</div>
                        </div>
                        <div class="schema-connector">
                            <div class="schema-arrow"></div>
                        </div>
                        <div class="schema-row" style="gap:6px">
                            <div class="schema-box" style="font-size:10px"><span class="s-icon">⚡</span> Direct</div>
                            <div class="schema-box" style="font-size:10px"><span class="s-icon">🌐</span> Hosted</div>
                            <div class="schema-box" style="font-size:10px"><span class="s-icon">📱</span> Wallet</div>
                        </div>
                        <div class="schema-connector">
                            <div class="schema-arrow"></div>
                        </div>
                        <div class="schema-row">
                            <div class="schema-box highlight"><span class="s-icon">✓</span> IPN · Idempotent Confirm</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Project 3: DBX — Database Backup CLI -->
            <div class="case-study reveal">
                <div class="case-info">
                    <div>
                        <div class="case-tag">Open Source · DevOps · CLI</div>
                        <h3 class="case-h3" style="margin-top:12px">
                            <a href="https://github.com/zfhassaan/dbx" target="_blank" rel="noopener">
                                DBX — Database Backup CLI
                            </a>
                        </h3>
                    </div>
                    <div class="case-meta">
                        <div class="case-meta-row">
                            <div class="case-meta-label">Problem</div>
                            <div class="case-meta-value">Backing up MySQL, PostgreSQL, MongoDB and SQLite across machines
                                meant juggling separate, brittle dump/restore scripts — with no scheduling, compression,
                                or off-site copies, and no consistent logging when a job failed.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Solution</div>
                            <div class="case-meta-value">A single cross-platform Go CLI (Cobra) that backs up and
                                restores all four engines — full / incremental / differential backups, selective
                                table &amp; collection restore, gzip/zip compression, cron scheduling, cloud uploads
                                (S3 · GCS · Azure), Slack alerts, and an interactive menu.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Stack</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="tech-tag">Go 1.24</span>
                                    <span class="tech-tag">Cobra</span>
                                    <span class="tech-tag">MySQL</span>
                                    <span class="tech-tag">PostgreSQL</span>
                                    <span class="tech-tag">MongoDB</span>
                                    <span class="tech-tag">SQLite</span>
                                    <span class="tech-tag">AWS S3</span>
                                </div>
                            </div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Impact</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="impact-tag">4 engines · 1 CLI</span>
                                    <span class="impact-tag">110+ tests</span>
                                    <span class="impact-tag">S3 · GCS · Azure</span>
                                    <span class="impact-tag">Win · Linux · macOS</span>
                                </div>
                            </div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Links</div>
                            <div class="case-meta-value">
                                <div class="case-links">
                                    <a href="https://github.com/zfhassaan/dbx" target="_blank" rel="noopener"
                                        class="case-link magnetic">
                                        <svg class="case-link-icon" width="14" height="14" viewBox="0 0 24 24"
                                            fill="currentColor">
                                            <path
                                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        GitHub
                                        <span class="case-link-arrow">↗</span>
                                    </a>
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
                            <div class="t-title">dbx</div>
                        </div>
                        <div class="terminal-body">
                            <div class="t-comment"># Back up MySQL, compress &amp; ship to S3</div>
                            <div><span class="t-fn">dbx</span> <span class="t-key">backup</span> mysql <span
                                    class="t-str">--db</span> <span class="t-val">shop</span> \</div>
                            <div>&nbsp;&nbsp;<span class="t-str">--compress</span> <span class="t-str">--upload</span>
                                <span class="t-val">s3</span></div>
                            <br>
                            <div class="t-comment"># Schedule a nightly Postgres backup</div>
                            <div><span class="t-fn">dbx</span> <span class="t-key">schedule</span> add <span
                                    class="t-val">"0 2 * * *"</span> \</div>
                            <div>&nbsp;&nbsp;<span class="t-str">--type</span> <span class="t-val">postgres</span></div>
                            <br>
                            <div class="t-comment"># Restore a single table</div>
                            <div><span class="t-fn">dbx</span> <span class="t-key">restore</span> mysql <span
                                    class="t-str">--table</span> <span class="t-val">orders</span></div>
                            <br>
                            <div class="t-dim">// 110+ tests · Win · Linux · macOS ✓</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Project 4: Laravel Wallet — Ledger E-Wallet -->
            <div class="case-study reverse reveal">
                <div class="case-info">
                    <div>
                        <div class="case-tag">Open Source · FinTech · Laravel</div>
                        <h3 class="case-h3" style="margin-top:12px">
                            <a href="https://github.com/zfhassaan/laravel-wallet" target="_blank" rel="noopener">
                                Laravel Wallet — Ledger E-Wallet
                            </a>
                        </h3>
                    </div>
                    <div class="case-meta">
                        <div class="case-meta-row">
                            <div class="case-meta-label">Problem</div>
                            <div class="case-meta-value">Apps that need an in-app wallet usually store a mutable balance
                                column — inviting race conditions, silent tampering, and untraceable money movement, with
                                no audit trail or integrity checks.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Solution</div>
                            <div class="case-meta-value">A ledger-based Laravel e-wallet
                                (<span class="mono">composer require zfhassaan/laravel-wallet</span>) where balance is
                                derived from immutable transactions — atomic transfers with row-level locking,
                                balance-hash tamper detection &amp; auto-freeze, QR wallet-to-wallet payments, rate
                                limiting, password protection, and a full UUID audit trail.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Stack</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="tech-tag">Laravel 12</span>
                                    <span class="tech-tag">PHP 8.2</span>
                                    <span class="tech-tag">MySQL</span>
                                    <span class="tech-tag">Packagist</span>
                                    <span class="tech-tag">PHPUnit</span>
                                </div>
                            </div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Impact</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="impact-tag">Immutable ledger</span>
                                    <span class="impact-tag">Tamper detection + auto-freeze</span>
                                    <span class="impact-tag">Atomic · row-locked</span>
                                    <span class="impact-tag">v1.0.0 · MIT</span>
                                </div>
                            </div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Links</div>
                            <div class="case-meta-value">
                                <div class="case-links">
                                    <a href="https://zfhassaan.github.io/laravel-wallet/" target="_blank" rel="noopener"
                                        class="case-link magnetic">
                                        <span class="case-link-icon">📖</span> Documentation
                                        <span class="case-link-arrow">↗</span>
                                    </a>
                                    <a href="https://github.com/zfhassaan/laravel-wallet" target="_blank" rel="noopener"
                                        class="case-link magnetic">
                                        <svg class="case-link-icon" width="14" height="14" viewBox="0 0 24 24"
                                            fill="currentColor">
                                            <path
                                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        GitHub
                                        <span class="case-link-arrow">↗</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="case-visual">
                    <div class="schema-card">
                        <div class="schema-row">
                            <div class="schema-box highlight"><span class="s-icon">💸</span> Transfer Request</div>
                        </div>
                        <div class="schema-connector">
                            <div class="schema-arrow"></div>
                        </div>
                        <div class="schema-row">
                            <div class="schema-box"><span class="s-icon">🔒</span> Atomic Txn · Row Lock</div>
                        </div>
                        <div class="schema-connector">
                            <div class="schema-arrow"></div>
                        </div>
                        <div class="schema-row" style="gap:6px">
                            <div class="schema-box" style="font-size:10px"><span class="s-icon">➕</span> Credit</div>
                            <div class="schema-box" style="font-size:10px"><span class="s-icon">➖</span> Debit</div>
                            <div class="schema-box" style="font-size:10px"><span class="s-icon">📲</span> QR Pay</div>
                        </div>
                        <div class="schema-connector">
                            <div class="schema-arrow"></div>
                        </div>
                        <div class="schema-row">
                            <div class="schema-box highlight"><span class="s-icon">🧾</span> Ledger · Balance Hash</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Project 5: Open Source — laravel-amqp -->
            <div class="case-study reveal">
                <div class="case-info">
                    <div>
                        <div class="case-tag">Open Source · Maintainer</div>
                        <h3 class="case-h3" style="margin-top:12px">
                            <a href="https://github.com/bschmitt/laravel-amqp" target="_blank" rel="noopener">
                                Laravel AMQP — RabbitMQ Toolkit
                            </a>
                        </h3>
                    </div>
                    <div class="case-meta">
                        <div class="case-meta-row">
                            <div class="case-meta-label">Problem</div>
                            <div class="case-meta-value">A widely-used Laravel RabbitMQ client (279★) had drifted behind
                                modern Laravel/PHP releases, lacked higher-level messaging patterns (RPC, dead-letters,
                                retries, monitoring), and shipped docs that no longer matched the config.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Solution</div>
                            <div class="case-meta-value">As a project collaborator, shipped RPC request/response,
                                Management HTTP API integration, a gRPC-lite typed RPC layer, and a full messaging
                                platform — sagas, typed dispatch, dead-letter manager, <span class="mono">#[Retry]</span>,
                                monitoring dashboard &amp; MessageStore — plus a modernized CI matrix and a modular docs
                                rebuild.</div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Stack</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="tech-tag">Laravel</span>
                                    <span class="tech-tag">PHP 8</span>
                                    <span class="tech-tag">RabbitMQ</span>
                                    <span class="tech-tag">php-amqplib</span>
                                    <span class="tech-tag">GitHub Actions</span>
                                    <span class="tech-tag">PHPUnit</span>
                                </div>
                            </div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Impact</div>
                            <div class="case-meta-value">
                                <div class="tech-tags">
                                    <span class="impact-tag">6 merged PRs</span>
                                    <span class="impact-tag">440+ tests · 1000+ assertions</span>
                                    <span class="impact-tag">Laravel 8→13 · PHP 7.3→8.5</span>
                                    <span class="impact-tag">0 breaking changes</span>
                                </div>
                            </div>
                        </div>
                        <div class="case-meta-row">
                            <div class="case-meta-label">Links</div>
                            <div class="case-meta-value">
                                <div class="case-links">
                                    <a href="https://zfhassaan.github.io/laravel-amqp" target="_blank" rel="noopener"
                                        class="case-link magnetic">
                                        <span class="case-link-icon">📖</span> Documentation
                                        <span class="case-link-arrow">↗</span>
                                    </a>
                                    <a href="https://github.com/bschmitt/laravel-amqp" target="_blank" rel="noopener"
                                        class="case-link magnetic">
                                        <svg class="case-link-icon" width="14" height="14" viewBox="0 0 24 24"
                                            fill="currentColor">
                                            <path
                                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        GitHub
                                        <span class="case-link-arrow">↗</span>
                                    </a>
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
                            <div class="t-title">UserService.php</div>
                        </div>
                        <div class="terminal-body">
                            <div class="t-comment">// Typed RPC over RabbitMQ</div>
                            <br>
                            <div><span class="t-key">$user</span> = <span class="t-fn">Rpc</span>::<span
                                    class="t-fn">call</span>(</div>
                            <div>&nbsp;&nbsp;<span class="t-val">UserService</span>::<span class="t-key">class</span>,
                            </div>
                            <div>&nbsp;&nbsp;<span class="t-fn">GetUserRequest</span>::<span
                                    class="t-fn">make</span>([<span class="t-str">'id'</span> =&gt; <span
                                    class="t-val">42</span>])</div>
                            <div>);</div>
                            <br>
                            <div class="t-comment">// Dispatch a typed message</div>
                            <div><span class="t-fn">OrderPlaced</span>::<span class="t-fn">dispatch</span>([<span
                                    class="t-str">'order_id'</span> =&gt; <span class="t-val">$id</span>]);</div>
                            <br>
                            <div class="t-dim">// 444 tests · Laravel 8→13 · PHP 7.3→8.5 ✓</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>
