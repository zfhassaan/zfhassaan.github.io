/* ═══════════════════════════════════════════
           PORTFOLIO ANIMATION ENGINE — FIXED & CLEAN
        ═══════════════════════════════════════════ */

        /* ── Global flags ── */
        const REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
        const IS_MOBILE = window.innerWidth < 768;

        /* ── Pause animations on hidden tab ── */
        let _paused = false;
        document.addEventListener('visibilitychange', () => {
            _paused = document.hidden;
            if (_paused) gsap.globalTimeline.pause();
            else gsap.globalTimeline.resume();
        });

        /* ════════════════════════════════════════════
           BOOT — waits for DOM + GSAP
        ════════════════════════════════════════════ */
        export function initPortfolioEngine() {
            if (typeof gsap === 'undefined') { console.error('[Portfolio] GSAP not loaded'); return; }
            /* Guard against double initialization (e.g. HMR re-mounts or the
               function being called twice). Running the packet/timeline setup
               more than once would stack overlapping animations on the same
               nodes and spawn phantom "extra" dots. */
            if (window.__portfolioEngineStarted) return;
            window.__portfolioEngineStarted = true;
            gsap.registerPlugin(ScrollTrigger);

            /* Set initial hidden states BEFORE first paint */
            setInitialStates();

            /* Run everything */
            heroEntrance();
            if (!IS_MOBILE) initCursor();
            initMobileMenu();
            initNavScroll();
            initScrollReveals();
            initCounters();
            if (!IS_MOBILE && !REDUCED) initMagnetic();
            initArchDiagram();
            initRmqFlow();
            buildContribGrid();
            initTimeline();
            initCaseStudies();
            initExpertiseCards();
            initPlayground();

            requestAnimationFrame(() => ScrollTrigger.refresh());
        }

        /* ════════════════════════════════════════════
           SET INITIAL STATES
           Called synchronously before DOMContentLoaded
           fires paint — prevents flash of visible then
           hidden elements.
        ════════════════════════════════════════════ */
        function setInitialStates() {
            if (REDUCED) return;

            /* Hero elements start hidden with initial positions */
            gsap.set('#hero-badge', { opacity: 0, y: 20 });
            gsap.set('#hero-h1', { opacity: 0, y: 48 });
            gsap.set('#hero-sub', { opacity: 0, y: 28 });
            gsap.set('#hero-actions', { opacity: 0, y: 20 });
            gsap.set('#hero-stats', { opacity: 0, y: 16 });
            gsap.set('.hero-right', { opacity: 0, x: 48 });
        }

        /* ════════════════════════════════════════════
           HERO ENTRANCE
           Professional staggered reveal:
           badge → headline words → sub → CTAs → stats
           → arch diagram slides in from right
        ════════════════════════════════════════════ */
        function heroEntrance() {
            if (REDUCED) {
                gsap.set(['#hero-badge', '#hero-h1', '#hero-sub', '#hero-actions', '#hero-stats', '.hero-right'],
                    { opacity: 1, y: 0, x: 0 });
                initArchPackets();
                return;
            }

            /* Split h1 lines into individual spans for word-by-word reveal */
            const h1 = document.getElementById('hero-h1');
            const lines = h1 ? h1.querySelectorAll('span, br') : [];

            /* Wrap each text node line in a span for per-line animation */
            const h1Lines = h1 ? Array.from(h1.childNodes).filter(n =>
                n.nodeType === Node.TEXT_NODE ? n.textContent.trim() : n.tagName !== 'BR'
            ) : [];

            const masterTL = gsap.timeline({
                delay: 0.1,
                defaults: { ease: 'power4.out' },
                onComplete: () => initArchPackets()
            });

            /* 1. Badge pill slides up + fades in */
            masterTL.to('#hero-badge', {
                opacity: 1, y: 0,
                duration: 0.55,
                ease: 'power3.out'
            });

            /* 2. Headline: clip-path reveal + translate up — premium feel */
            masterTL.fromTo('#hero-h1',
                { opacity: 0, y: 48, clipPath: 'inset(100% 0% 0% 0%)' },
                { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power4.out' },
                '-=0.25'
            );

            /* 3. Accent words pulse in with slight scale */
            masterTL.fromTo('.hero-h1 .accent-word',
                { color: 'rgba(45,212,191,0)', textShadow: '0 0 0px rgba(45,212,191,0)' },
                { color: 'var(--accent)', textShadow: '0 0 40px rgba(45,212,191,0.25)', duration: 0.6, stagger: 0.12 },
                '-=0.4'
            );

            /* 4. Sub text */
            masterTL.to('#hero-sub', {
                opacity: 1, y: 0,
                duration: 0.6, ease: 'power3.out'
            }, '-=0.3');

            /* 5. CTA buttons stagger in */
            /* Reveal the wrapper first — its children's opacity is relative to it,
               so leaving the container at opacity:0 would keep the buttons hidden. */
            masterTL.to('#hero-actions', {
                opacity: 1, y: 0,
                duration: 0.4, ease: 'power3.out'
            }, '-=0.3');
            masterTL.fromTo('#hero-actions .btn-primary, #hero-actions .btn-secondary',
                { opacity: 0, y: 16, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.1, ease: 'back.out(1.4)' },
                '-=0.3'
            );

            /* 6. Stats row */
            masterTL.to('#hero-stats', {
                opacity: 1, y: 0,
                duration: 0.45, ease: 'power3.out'
            }, '-=0.2');

            /* 7. Right panel slides in from right with slight bounce */
            masterTL.to('.hero-right', {
                opacity: 1, x: 0,
                duration: 0.85, ease: 'power3.out'
            }, '-=0.65');

            /* 8. Arch connector lines draw in */
            masterTL.add(initArchDiagram, '-=0.2');
        }

        /* ════════════════════════════════════════════
           CURSOR
           quickSetter: zero allocations per frame
        ════════════════════════════════════════════ */
        function initCursor() {
            const dot = document.getElementById('cursor-dot');
            const ring = document.getElementById('cursor-ring');
            if (!dot || !ring) return;

            const setDotX = gsap.quickSetter(dot, 'x', 'px');
            const setDotY = gsap.quickSetter(dot, 'y', 'px');
            const setRingX = gsap.quickSetter(ring, 'x', 'px');
            const setRingY = gsap.quickSetter(ring, 'y', 'px');

            let mx = 0, my = 0, rx = 0, ry = 0;

            document.addEventListener('mousemove', e => {
                mx = e.clientX; my = e.clientY;
                setDotX(mx); setDotY(my);
            }, { passive: true });

            gsap.ticker.add(() => {
                if (_paused) return;
                rx += (mx - rx) * 0.12;
                ry += (my - ry) * 0.12;
                setRingX(rx); setRingY(ry);
            });

            const ringScaleTo = gsap.quickTo(ring, 'scale', { duration: 0.2, ease: 'power2.out' });
            const dotScaleTo = gsap.quickTo(dot, 'scale', { duration: 0.15 });

            document.querySelectorAll('a, button, .magnetic').forEach(el => {
                el.addEventListener('mouseenter', () => { ringScaleTo(1.6); dotScaleTo(0); }, { passive: true });
                el.addEventListener('mouseleave', () => { ringScaleTo(1); dotScaleTo(1); }, { passive: true });
            });
        }

        /* ════════════════════════════════════════════
           MOBILE MENU
        ════════════════════════════════════════════ */
        function initMobileMenu() {
            const menuEl = document.getElementById('mobile-menu');
            const toggleEl = document.getElementById('navToggle');
            if (!menuEl || !toggleEl) return;

            const spans = toggleEl.querySelectorAll('span');
            let open = false;

            toggleEl.addEventListener('click', () => {
                open = !open;
                menuEl.classList.toggle('open', open);

                if (open) {
                    gsap.to(spans[0], { rotation: 45, y: 6.5, duration: 0.25, ease: 'power2.out' });
                    gsap.to(spans[1], { opacity: 0, duration: 0.15 });
                    gsap.to(spans[2], { rotation: -45, y: -6.5, duration: 0.25, ease: 'power2.out' });
                    gsap.fromTo('#mobile-menu a',
                        { y: 24, opacity: 0 },
                        { y: 0, opacity: 1, stagger: 0.07, duration: 0.35, ease: 'power3.out', delay: 0.08 }
                    );
                } else {
                    gsap.to(spans, { rotation: 0, y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' });
                }
            });

            menuEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
                open = false;
                menuEl.classList.remove('open');
                gsap.to(spans, { rotation: 0, y: 0, opacity: 1, duration: 0.22 });
            }));
        }

        /* ════════════════════════════════════════════
           NAV SCROLL — throttled via rAF flag
        ════════════════════════════════════════════ */
        function initNavScroll() {
            const nav = document.getElementById('nav');
            if (!nav) return;
            let pending = false;
            /* Toggle a class instead of inline-styling a hardcoded color so the
               background stays theme-aware (CSS owns the light/dark values). */
            window.addEventListener('scroll', () => {
                if (pending) return;
                pending = true;
                requestAnimationFrame(() => {
                    nav.classList.toggle('scrolled', window.scrollY > 60);
                    pending = false;
                });
            }, { passive: true });
        }

        /* ════════════════════════════════════════════
           SCROLL REVEALS
           Single IntersectionObserver, one handler.
           Correctly reads initial CSS state and
           animates TO the settled position.
        ════════════════════════════════════════════ */
        function initScrollReveals() {
            if (REDUCED) {
                document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
                    .forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
                return;
            }

            /* Set initial states on all reveal elements */
            document.querySelectorAll('.reveal').forEach(el =>
                gsap.set(el, { opacity: 0, y: 32 })
            );
            document.querySelectorAll('.reveal-left').forEach(el =>
                gsap.set(el, { opacity: 0, x: -32 })
            );
            document.querySelectorAll('.reveal-right').forEach(el =>
                gsap.set(el, { opacity: 0, x: 32 })
            );
            document.querySelectorAll('.reveal-scale').forEach(el =>
                gsap.set(el, { opacity: 0, scale: 0.92 })
            );

            const obs = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (!e.isIntersecting) return;
                    obs.unobserve(e.target);
                    gsap.to(e.target, {
                        opacity: 1, y: 0, x: 0, scale: 1,
                        duration: 0.75,
                        ease: 'power3.out',
                        onComplete() { this.targets()[0].classList.add('animated'); }
                    });
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

            document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
                .forEach(el => obs.observe(el));
        }

        /* ════════════════════════════════════════════
           COUNTERS
        ════════════════════════════════════════════ */
        function initCounters() {
            const obs = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (!e.isIntersecting) return;
                    obs.unobserve(e.target);
                    const el = e.target;
                    const display = el.dataset.display;
                    const target = parseFloat(display || el.dataset.target);
                    const suffix = el.dataset.suffix || '';
                    const obj = { v: 0 };

                    gsap.to(obj, {
                        v: target,
                        duration: 2.0,
                        ease: 'power2.out',
                        onUpdate() {
                            el.innerHTML = (display ? obj.v.toFixed(1) : Math.round(obj.v))
                                + '<span class="accent-char">' + suffix + '</span>';
                        }
                    });
                });
            }, { threshold: 0.5 });

            document.querySelectorAll('.counter').forEach(el => obs.observe(el));
        }

        /* ════════════════════════════════════════════
           MAGNETIC BUTTONS — quickTo (zero GC)
        ════════════════════════════════════════════ */
        function initMagnetic() {
            document.querySelectorAll('.magnetic').forEach(el => {
                const xTo = gsap.quickTo(el, 'x', { duration: 0.38, ease: 'power2.out' });
                const yTo = gsap.quickTo(el, 'y', { duration: 0.38, ease: 'power2.out' });
                const xBack = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'elastic.out(1, 0.4)' });
                const yBack = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'elastic.out(1, 0.4)' });

                el.addEventListener('mousemove', e => {
                    const r = el.getBoundingClientRect();
                    xTo((e.clientX - r.left - r.width / 2) * 0.22);
                    yTo((e.clientY - r.top - r.height / 2) * 0.22);
                }, { passive: true });

                el.addEventListener('mouseleave', () => { xBack(0); yBack(0); }, { passive: true });
            });
        }

        /* ════════════════════════════════════════════
           ARCH DIAGRAM — SVG line draw + packets
        ════════════════════════════════════════════ */
        function initArchDiagram() {
            if (REDUCED) return;

            /* Animate SVG connectors with stroke-dashoffset draw */
            const connectors = Array.from(document.querySelectorAll('.arch-connector'));
            if (!connectors.length) return;

            connectors.forEach(line => {
                /* Get actual path length for accurate dash */
                const len = line.getTotalLength ? line.getTotalLength() : 120;
                gsap.set(line, {
                    strokeDasharray: len,
                    strokeDashoffset: len,
                    /* start fully transparent so the arrowhead marker fades in
                       with the line instead of popping in at full opacity */
                    opacity: 0,
                    stroke: 'rgba(255,255,255,0.12)'
                });
            });

            gsap.to(connectors, {
                strokeDashoffset: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power2.inOut'
            });
        }

        function initArchPackets() {
            if (REDUCED) return;

            const pkt1 = document.getElementById('pkt1');
            const pkt2 = document.getElementById('pkt2');
            if (!pkt1 || !pkt2) return;

            const byId = id => document.getElementById(id);

            /* Two symmetric routes: both travel the spine (users → api → queue),
               diverge to their own worker, then reconverge on the database.
               Waypoints are the node centres in the SVG's 440×480 viewBox and
               the connectors are lit segment-by-segment as the packet moves. */
            const leftPath = {
                wp: [
                    { x: 210, y: 44 },
                    { x: 210, y: 150 },
                    { x: 210, y: 260 },
                    { x: 108, y: 365 },
                    { x: 210, y: 448 },
                ],
                nodes: ['node-users', 'node-api', 'node-queue', 'node-worker-a', 'node-db'].map(byId),
                conns: ['conn-1', 'conn-2', 'conn-3a', 'conn-4a'].map(byId),
            };
            const rightPath = {
                wp: [
                    { x: 210, y: 44 },
                    { x: 210, y: 150 },
                    { x: 210, y: 260 },
                    { x: 312, y: 365 },
                    { x: 210, y: 448 },
                ],
                nodes: ['node-users', 'node-api', 'node-queue', 'node-worker-b', 'node-db'].map(byId),
                conns: ['conn-1', 'conn-2', 'conn-3b', 'conn-4b'].map(byId),
            };

            function makePacketTimeline(pkt, path, delayOffset) {
                const { wp, nodes, conns } = path;
                const tl = gsap.timeline({ repeat: -1, delay: delayOffset, paused: true });

                tl.set(pkt, { attr: { cx: wp[0].x, cy: wp[0].y }, opacity: 0 });
                tl.to(pkt, { opacity: 1, duration: 0.15 });

                wp.forEach((point, i) => {
                    if (i === 0) return;
                    const node = nodes[i];
                    const conn = conns[i - 1];

                    tl.to(pkt, {
                        attr: { cx: point.x, cy: point.y },
                        duration: 0.5,
                        ease: 'power2.inOut',
                        onStart() {
                            if (node) node.classList.add('active');
                            if (conn) gsap.set(conn, { stroke: 'rgba(45,212,191,0.75)', opacity: 1 });
                        },
                        onComplete() {
                            if (node) gsap.delayedCall(0.4, () => node.classList.remove('active'));
                            if (conn) gsap.to(conn, { stroke: 'rgba(255,255,255,0.12)', opacity: 1, duration: 0.35, delay: 0.25 });
                        }
                    });
                    tl.to({}, { duration: 0.14 }); /* dwell at node */
                });

                tl.to(pkt, { opacity: 0, duration: 0.15 });
                tl.to({}, { duration: 1.4 }); /* pause between loops */
                return tl;
            }

            const tl1 = makePacketTimeline(pkt1, leftPath, 0);
            const tl2 = makePacketTimeline(pkt2, rightPath, 1.1);

            /* Only run while hero section is visible */
            const heroEl = document.getElementById('hero');
            if (!heroEl) { tl1.play(); tl2.play(); return; }

            const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting) { tl1.play(); tl2.play(); }
                else { tl1.pause(); tl2.pause(); }
            }, { threshold: 0 });
            obs.observe(heroEl);
        }

        /* ════════════════════════════════════════════
           RABBITMQ FLOW — starts/stops with visibility
        ════════════════════════════════════════════ */
        function initRmqFlow() {
            const nodeIds = ['rmq-producer', 'rmq-exchange', 'rmq-queue', 'rmq-consumer'];
            const nodes = nodeIds.map(id => document.getElementById(id)).filter(Boolean);
            if (!nodes.length) return;

            let current = -1;
            let intervalId = null;

            function step() {
                if (current >= 0 && nodes[current]) nodes[current].classList.remove('lit');
                current = (current + 1) % nodes.length;
                if (nodes[current]) nodes[current].classList.add('lit');
            }

            const el = document.getElementById('rmq-flow');
            if (!el) return;

            const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting && !intervalId) {
                    intervalId = setInterval(step, 620);
                } else if (!e.isIntersecting && intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                    nodes.forEach(n => n.classList.remove('lit'));
                    current = -1;
                }
            }, { threshold: 0.3 });

            obs.observe(el);
        }

        /* ════════════════════════════════════════════
           CONTRIBUTION HEATMAP
           Build lazily when near the viewport; animate the
           grid container once — not 364 individual GSAP tweens.
        ════════════════════════════════════════════ */
        function buildContribGrid() {
            const grid = document.getElementById('contrib-grid');
            if (!grid) return;

            const COLS = 52;
            const ROWS = 7;
            const TOTAL = COLS * ROWS;
            let built = false;

            const obs = new IntersectionObserver(([e]) => {
                if (!e.isIntersecting) return;
                obs.disconnect();

                if (!built) {
                    built = true;
                    const frag = document.createDocumentFragment();
                    for (let i = 0; i < TOTAL; i++) {
                        const cell = document.createElement('div');
                        cell.className = 'contrib-cell';
                        const r = Math.random();
                        if (r > 0.72) {
                            cell.dataset.level = String(Math.min(4, Math.ceil((r - 0.72) / 0.28 * 4)));
                        }
                        /* Column-based delay → a quick left-to-right sweep.
                           Set once as a CSS var; the animation itself runs on
                           the compositor (no JS tween per cell). */
                        if (!REDUCED) {
                            const col = i % COLS;
                            cell.style.setProperty('--d', (col * 11) + 'ms');
                        }
                        frag.appendChild(cell);
                    }
                    grid.appendChild(frag);
                }

                /* One class flip kicks off the CSS-driven reveal for all tiles. */
                requestAnimationFrame(() => grid.classList.add('contrib-ready'));
            }, { threshold: 0.08, rootMargin: '80px' });

            obs.observe(grid);
        }

        /* ════════════════════════════════════════════
           TIMELINE DOTS — CSS class toggle only
        ════════════════════════════════════════════ */
        function initTimeline() {
            const obs = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (!e.isIntersecting) return;
                    obs.unobserve(e.target);
                    const dot = e.target.querySelector('.timeline-dot');
                    if (dot) {
                        dot.style.borderColor = 'var(--accent)';
                        dot.style.background = 'rgba(45,212,191,0.25)';
                        dot.style.boxShadow = '0 0 10px rgba(45,212,191,0.45)';
                    }
                });
            }, { threshold: 0.35 });

            document.querySelectorAll('.timeline-item').forEach(el => obs.observe(el));
        }

        /* ════════════════════════════════════════════
           CASE STUDIES — directional stagger reveal
        ════════════════════════════════════════════ */
        function initCaseStudies() {
            if (REDUCED) return;

            document.querySelectorAll('.case-study').forEach(study => {
                const info = study.querySelector('.case-info');
                const visual = study.querySelector('.case-visual');
                const isRev = study.classList.contains('reverse');

                if (!info || !visual) return;

                gsap.set(info, { opacity: 0, x: isRev ? 28 : -28 });
                gsap.set(visual, { opacity: 0, x: isRev ? -28 : 28 });

                const obs = new IntersectionObserver(([e]) => {
                    if (!e.isIntersecting) return;
                    obs.disconnect();
                    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
                    tl.to(info, { opacity: 1, x: 0, duration: 0.7 })
                        .to(visual, { opacity: 1, x: 0, duration: 0.7 }, '-=0.45')
                        .add(() => { [info, visual].forEach(el => el.classList.add('animated')); });
                }, { threshold: 0.1 });

                obs.observe(study);
            });
        }

        /* ════════════════════════════════════════════
           EXPERTISE CARDS — stagger on grid entry
        ════════════════════════════════════════════ */
        function initExpertiseCards() {
            if (REDUCED) return;

            const grid = document.querySelector('.expertise-grid');
            if (!grid) return;

            const cards = grid.querySelectorAll('.expertise-card');
            gsap.set(cards, { opacity: 0, y: 28 });

            const obs = new IntersectionObserver(([e]) => {
                if (!e.isIntersecting) return;
                obs.disconnect();
                gsap.to(cards, {
                    opacity: 1, y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    stagger: { each: 0.09, from: 'start' },
                    onComplete() { cards.forEach(c => c.classList.add('animated')); }
                });
            }, { threshold: 0.08 });

            obs.observe(grid);
        }

        /* ════════════════════════════════════════════
           PLAYGROUND
           All DOM refs cached once. GSAP timeline
           replaces all setTimeout chains.
        ════════════════════════════════════════════ */
        function initPlayground() {
            const STAGE_IDS = ['stage-client', 'stage-gateway', 'stage-queue', 'stage-worker', 'stage-db'];
            const LINE_IDS = ['line-0', 'line-1', 'line-2', 'line-3'];

            const STAGES = STAGE_IDS.map(id => document.getElementById(id));
            const LINES = LINE_IDS.map(id => document.getElementById(id));

            const ELS = {
                logBody: document.getElementById('pg-log-body'),
                rps: document.getElementById('pg-rps'),
                gwLatency: document.getElementById('pg-latency-gw'),
                queueDepth: document.getElementById('pg-queue-depth'),
                procTime: document.getElementById('pg-proc-time'),
                totalTime: document.getElementById('pg-total-time'),
                sendBtn: document.getElementById('pg-send-btn'),
            };

            window.pgState = { running: false, rps: 0 };

            /* ── Log helper ── */
            function addLog(html) {
                if (!ELS.logBody) return;
                const now = new Date();
                const ts = [now.getHours(), now.getMinutes(), now.getSeconds()]
                    .map(n => String(n).padStart(2, '0')).join(':');
                const div = document.createElement('div');
                div.className = 'log-line';
                div.innerHTML = html.replace('{ts}', `<span class="log-time">${ts}</span>`);
                gsap.set(div, { opacity: 0, x: -6 });
                ELS.logBody.appendChild(div);
                gsap.to(div, { opacity: 1, x: 0, duration: 0.22, ease: 'power2.out' });
                ELS.logBody.scrollTop = ELS.logBody.scrollHeight;
                while (ELS.logBody.children.length > 80) ELS.logBody.removeChild(ELS.logBody.firstChild);
            }

            /* ── Stage activator ── */
            function setStage(idx) {
                STAGES.forEach((s, i) => {
                    if (!s) return;
                    s.classList.toggle('active', i === idx);
                });
                LINES.forEach((l, i) => {
                    if (!l) return;
                    l.classList.toggle('active', i < idx);
                });
            }

            function clearStages() {
                STAGES.forEach(s => s?.classList.remove('active'));
                LINES.forEach(l => l?.classList.remove('active'));
            }

            /* ── Public API ── */
            window.triggerRequest = function () {
                if (window.pgState.running) return;
                window.pgState.running = true;

                const gwMs = Math.floor(Math.random() * 6) + 2;
                const procMs = Math.floor(Math.random() * 60) + 50;
                const totalMs = gwMs + procMs + Math.floor(Math.random() * 10) + 5;
                const qDepth = Math.floor(Math.random() * 8) + 1;
                const reqId = 'req_' + Math.random().toString(36).slice(2, 10);

                if (ELS.sendBtn) { ELS.sendBtn.textContent = '⏳ Processing…'; ELS.sendBtn.style.opacity = '0.65'; }

                const tl = gsap.timeline({
                    onComplete() {
                        clearStages();
                        window.pgState.running = false;
                        if (ELS.sendBtn) { ELS.sendBtn.textContent = '▶ Send Request'; ELS.sendBtn.style.opacity = '1'; }
                    }
                });

                tl
                    .add(() => {
                        setStage(0);
                        addLog(`{ts} <span class="log-label">[CLIENT]</span> POST /api/orders · ${reqId} · Bearer: valid`);
                    })
                    .to({}, { duration: 0.3 })
                    .add(() => {
                        setStage(1);
                        if (ELS.gwLatency) ELS.gwLatency.textContent = `~${gwMs}ms`;
                        addLog(`{ts} <span class="log-label">[GATEWAY]</span> Auth ✓ · rate:142/1000 · routed → order-service · <span class="log-ok">${gwMs}ms</span>`);
                    })
                    .to({}, { duration: 0.38 })
                    .add(() => {
                        setStage(2);
                        if (ELS.queueDepth) ELS.queueDepth.textContent = `depth: ${qDepth}`;
                        addLog(`{ts} <span class="log-label">[QUEUE]</span> Serialized → <span class="log-data">orders.critical</span> · depth:${qDepth} · ack sent`);
                    })
                    .to({}, { duration: 0.44 })
                    .add(() => {
                        setStage(3);
                        if (ELS.procTime) ELS.procTime.textContent = `~${procMs}ms`;
                        addLog(`{ts} <span class="log-label">[WORKER]</span> Worker#3 · inventory ✓ · pricing calc · <span class="log-warn">${procMs}ms</span>`);
                    })
                    .to({}, { duration: 0.52 })
                    .add(() => {
                        setStage(4);
                        if (ELS.totalTime) ELS.totalTime.textContent = `total: ${totalMs}ms`;
                        if (ELS.rps) ELS.rps.textContent = ++window.pgState.rps;
                        addLog(`{ts} <span class="log-label">[DB]</span> TX committed · cache cleared · webhook fired · <span class="log-ok">✓ ${totalMs}ms</span>`);
                    })
                    .to({}, { duration: 0.65 });
            };

            window.clearLog = function () {
                if (!ELS.logBody) return;
                ELS.logBody.innerHTML =
                    '<div class="log-line"><span class="log-time">--:--:--</span> <span class="log-label">[SYSTEM]</span> Log cleared. Ready.</div>';
            };

            window.triggerBurst = function () {
                const batchTL = gsap.timeline();
                for (let i = 0; i < 10; i++) {
                    const idx = i;
                    batchTL
                        .add(() => {
                            if (ELS.rps) ELS.rps.textContent = ++window.pgState.rps;
                            addLog(`{ts} <span class="log-label">[BURST]</span> Batch <span class="log-data">#${idx + 1}/10</span> → queue · <span class="log-ok">queued</span>`);
                        })
                        .to({}, { duration: 0.18 });
                }
                batchTL.add(() => {
                    addLog(`{ts} <span class="log-label">[BURST]</span> <span class="log-ok">✓ 10 jobs queued · avg ~${Math.floor(Math.random() * 20) + 72}ms</span>`);
                });
            };
        }

        /* ── Debounced resize ── */
(function () {
    let rafId = null;
    window.addEventListener('resize', () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
            rafId = null;
        });
    }, { passive: true });
})();
