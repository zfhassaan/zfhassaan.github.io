<template>
    <!-- ══ HERO ══ -->
    <section id="hero" class="container mx-auto">
        <div class="hero-left">
            <div class="hero-eyebrow" id="hero-badge">
                <div class="hero-eyebrow-dot"></div>
                Senior Full Stack Engineer
            </div>
            <h1 class="hero-h1" id="hero-h1">
                Building Scalable<br>
                <span class="accent-word">SaaS Platforms,</span><br>
                ERP Systems &amp;<br>
                <span class="dim-word">AI Solutions</span>
            </h1>
            <p class="hero-sub" id="hero-sub">
                Senior Full Stack Engineer specializing in Laravel, Node.js, React, Vue.js, API integrations, AI
                automation, payment gateways, ERP systems, and enterprise-scale applications that process millions of
                requests.
            </p>
            <div class="hero-actions" id="hero-actions">
                <a href="#projects" class="btn-primary magnetic">
                    View Projects
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>
                <a href="#contact" class="btn-secondary magnetic">
                    Let's Talk
                </a>
            </div>
        </div>

        <div class="hero-right">
            <!-- GSAP-animated SVG system architecture.
                 Coordinate grid: spine centered at x=210, symmetric workers at
                 x=108 / x=312, annotation column right-aligned at x=374. -->
            <svg id="arch-svg" class="arch-diagram" viewBox="0 0 440 480" xmlns="http://www.w3.org/2000/svg" role="img"
                aria-label="Distributed system architecture: users flow through the API gateway into a queue, fan out to two workers, and persist to the database.">
                <defs>
                    <marker id="arrowhead" markerWidth="9" markerHeight="9" refX="5.2" refY="3" orient="auto"
                        markerUnits="userSpaceOnUse">
                        <path d="M0,0 L6,3 L0,6 Z" fill="rgba(148,163,184,0.6)" />
                    </marker>
                    <filter id="glow-filter" x="-60%" y="-60%" width="220%" height="220%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <!-- ── Connectors (rendered behind nodes) ── -->
                <g class="arch-connectors">
                    <!-- spine -->
                    <line class="arch-connector" id="conn-1" x1="210" y1="70" x2="210" y2="116"
                        marker-end="url(#arrowhead)" />
                    <line class="arch-connector" id="conn-2" x1="210" y1="180" x2="210" y2="226"
                        marker-end="url(#arrowhead)" />
                    <!-- queue fans out to the two workers -->
                    <line class="arch-connector" id="conn-3a" x1="186" y1="291" x2="118" y2="335"
                        marker-end="url(#arrowhead)" />
                    <line class="arch-connector" id="conn-3b" x1="234" y1="291" x2="302" y2="335"
                        marker-end="url(#arrowhead)" />
                    <!-- workers converge on the database -->
                    <line class="arch-connector" id="conn-4a" x1="118" y1="391" x2="186" y2="413"
                        marker-end="url(#arrowhead)" />
                    <line class="arch-connector" id="conn-4b" x1="302" y1="391" x2="234" y2="413"
                        marker-end="url(#arrowhead)" />
                </g>

                <!-- USERS -->
                <g class="arch-node" id="node-users" transform="translate(140,18)">
                    <rect x="0" y="0" width="140" height="52" rx="10" />
                    <text class="arch-icon" x="28" y="27">👤</text>
                    <text class="arch-label" x="84" y="22">USERS</text>
                    <text class="arch-meta" x="84" y="37">Client requests</text>
                </g>

                <!-- API GATEWAY -->
                <g class="arch-node" id="node-api" transform="translate(102,120)">
                    <rect x="0" y="0" width="216" height="60" rx="10" />
                    <text class="arch-icon" x="32" y="31">⚡</text>
                    <text class="arch-label" x="120" y="25">API GATEWAY</text>
                    <text class="arch-meta" x="120" y="41">Auth · Rate limit · Route</text>
                </g>

                <!-- QUEUE -->
                <g class="arch-node" id="node-queue" transform="translate(118,230)">
                    <rect x="0" y="0" width="184" height="60" rx="10" />
                    <text class="arch-icon" x="30" y="31">⬡</text>
                    <text class="arch-label" x="102" y="25">QUEUE</text>
                    <text class="arch-meta" x="102" y="41">RabbitMQ · Redis</text>
                </g>

                <!-- WORKER A (left) -->
                <g class="arch-node" id="node-worker-a" transform="translate(56,340)">
                    <rect x="0" y="0" width="104" height="50" rx="10" />
                    <text class="arch-icon" x="24" y="26">⚙</text>
                    <text class="arch-label arch-label-sm" x="64" y="21">WORKER</text>
                    <text class="arch-meta" x="64" y="34">Go</text>
                </g>

                <!-- WORKER B (right) -->
                <g class="arch-node" id="node-worker-b" transform="translate(260,340)">
                    <rect x="0" y="0" width="104" height="50" rx="10" />
                    <text class="arch-icon" x="24" y="26">⚙</text>
                    <text class="arch-label arch-label-sm" x="64" y="21">WORKER</text>
                    <text class="arch-meta" x="64" y="34">Laravel</text>
                </g>

                <!-- DATABASE -->
                <g class="arch-node" id="node-db" transform="translate(110,418)">
                    <rect x="0" y="0" width="200" height="60" rx="10" />
                    <text class="arch-icon" x="30" y="31">🗄</text>
                    <text class="arch-label" x="110" y="25">DATABASE</text>
                    <text class="arch-meta" x="110" y="41">MySQL · PostgreSQL · Redis</text>
                </g>

                <!-- Animated packet dots (moved by GSAP along the spine) -->
                <circle id="pkt1" class="arch-packet" cx="210" cy="44" r="4.5" opacity="0" filter="url(#glow-filter)" />
                <circle id="pkt2" class="arch-packet arch-packet-alt" cx="210" cy="44" r="4.5" opacity="0"
                    filter="url(#glow-filter)" />

                <!-- Right annotation column — each badge aligns to its node's vertical center -->
                <g class="arch-badge-group">
                    <g transform="translate(374,140)">
                        <rect class="arch-badge" x="0" y="0" width="56" height="20" rx="5" />
                        <text class="arch-badge-text" x="28" y="11">REST·GQL</text>
                    </g>
                    <g transform="translate(374,250)">
                        <rect class="arch-badge" x="0" y="0" width="56" height="20" rx="5" />
                        <text class="arch-badge-text" x="28" y="11">20k+/day</text>
                    </g>
                    <g transform="translate(374,355)">
                        <rect class="arch-badge" x="0" y="0" width="56" height="20" rx="5" />
                        <text class="arch-badge-text" x="28" y="11">Horizontal</text>
                    </g>
                </g>
            </svg>
        </div>
    </section>
</template>
<style scoped>
.hero-actions .magnetic {
    display: flex;
}

.container {
    padding-bottom: 30px;
}

.container .hero-right {
    padding-top: 30px;
    padding-bottom: 20px;
}
</style>