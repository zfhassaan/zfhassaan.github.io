<template>
    <!-- ══ HERO ══ -->
    <section id="hero" class="container mx-auto">
        <div class="hero-left">
            <div class="hero-eyebrow" id="hero-badge">
                <div class="hero-eyebrow-dot"></div>
                {{ t('hero.eyebrow') }}
            </div>
            <h1 class="hero-h1" id="hero-h1">
                <span class="hero-title-row">{{ t('hero.line1') }}</span>
                <span class="hero-title-row"><span class="accent-word">{{ t('hero.accent') }}</span> {{ t('hero.line2') }}</span>
            </h1>
            <p class="hero-sub" id="hero-sub">
                {{ t('hero.sub') }}
            </p>
            <div class="hero-actions" id="hero-actions">
                <router-link :to="{ name: 'home', hash: '#contact' }" class="btn-primary magnetic">
                    {{ t('hero.cta') }}
                    <ArrowRight :size="14" />
                </router-link>
                <router-link :to="{ name: 'home', hash: '#projects' }" class="btn-secondary magnetic">
                    {{ t('hero.work') }}
                </router-link>
            </div>
            <div class="hero-stats" id="hero-stats">
                <div class="hero-stat-pill">
                    <Check :size="14" class="pill-check" /> {{ t('hero.pill1') }}
                </div>
                <div class="hero-stat-pill">
                    <Check :size="14" class="pill-check" /> {{ t('hero.pill2') }}
                </div>
                <div class="hero-stat-pill">
                    <Check :size="14" class="pill-check" /> {{ t('hero.pill3') }}
                </div>
                <div class="hero-stat-pill">
                    <Check :size="14" class="pill-check" /> {{ t('hero.pill4') }}
                </div>
            </div>
        </div>

        <div class="hero-right">
            <!-- GSAP-animated SVG system architecture.
                 Coordinate grid: spine centered at x=210, symmetric workers at
                 x=108 / x=312, annotation column right-aligned at x=374. -->
            <svg id="arch-svg" class="arch-diagram" viewBox="0 0 440 480" xmlns="http://www.w3.org/2000/svg" role="img"
                :aria-label="t('hero.diagram')">
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
                    <User class="arch-icon" x="18" y="16" :size="20" />
                    <text class="arch-label" x="84" y="22">{{ t('hero.users') }}</text>
                    <text class="arch-meta" x="84" y="37">{{ t('hero.requests') }}</text>
                </g>

                <!-- API GATEWAY -->
                <g class="arch-node" id="node-api" transform="translate(102,120)">
                    <rect x="0" y="0" width="216" height="60" rx="10" />
                    <Zap class="arch-icon" x="22" y="20" :size="20" />
                    <text class="arch-label" x="120" y="25">{{ t('hero.gateway') }}</text>
                    <text class="arch-meta" x="120" y="41">{{ t('hero.gatewayMeta') }}</text>
                </g>

                <!-- QUEUE -->
                <g class="arch-node" id="node-queue" transform="translate(118,230)">
                    <rect x="0" y="0" width="184" height="60" rx="10" />
                    <Layers class="arch-icon" x="20" y="20" :size="20" />
                    <text class="arch-label" x="102" y="25">{{ t('hero.queue') }}</text>
                    <text class="arch-meta" x="102" y="41">RabbitMQ · Redis</text>
                </g>

                <!-- WORKER A (left) -->
                <g class="arch-node" id="node-worker-a" transform="translate(56,340)">
                    <rect x="0" y="0" width="104" height="50" rx="10" />
                    <Cpu class="arch-icon" x="14" y="16" :size="18" />
                    <text class="arch-label arch-label-sm" x="64" y="21">{{ t('hero.worker') }}</text>
                    <text class="arch-meta" x="64" y="34">Go</text>
                </g>

                <!-- WORKER B (right) -->
                <g class="arch-node" id="node-worker-b" transform="translate(260,340)">
                    <rect x="0" y="0" width="104" height="50" rx="10" />
                    <Cpu class="arch-icon" x="14" y="16" :size="18" />
                    <text class="arch-label arch-label-sm" x="64" y="21">{{ t('hero.worker') }}</text>
                    <text class="arch-meta" x="64" y="34">Laravel</text>
                </g>

                <!-- DATABASE -->
                <g class="arch-node" id="node-db" transform="translate(110,418)">
                    <rect x="0" y="0" width="200" height="60" rx="10" />
                    <Database class="arch-icon" x="20" y="20" :size="20" />
                    <text class="arch-label" x="110" y="25">{{ t('hero.database') }}</text>
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

<script setup>
import { useI18n } from 'vue-i18n'
import { ArrowRight, Check, User, Zap, Layers, Cpu, Database } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<style scoped>
.hero-actions .magnetic {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    width: auto;
}

.container {
    padding-bottom: 30px;
}

.container .hero-right {
    padding-top: 30px;
    padding-bottom: 20px;
}

.hero-stats {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.hero-stat-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    font-size: 0.8rem;
    font-family: var(--font-body);
    color: var(--text-secondary);
}

.pill-check {
    color: var(--accent);
    font-weight: 700;
}
</style>