/* ── Wait for all deferred scripts then boot ── */
window.addEventListener('load', function () {
    if (typeof gsap === 'undefined' || typeof THREE === 'undefined') {
        setTimeout(arguments.callee.bind(this), 60); return;
    }
    initAll();
});

function initAll() {
    gsap.registerPlugin(ScrollTrigger);

    /* ════════════════════════════════════════════
       PERFORMANCE HELPERS
    ════════════════════════════════════════════ */
    const isMobile = window.innerWidth < 768;
    const prefersLow = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DPR = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2); // cap DPR

    /* ════════════════════════════════════════════
       CUSTOM CURSOR  (desktop only)
    ════════════════════════════════════════════ */
    if (!isMobile) {
        const dot = document.getElementById('cursorDot');
        const ring = document.getElementById('cursorRing');
        let mx = 0, my = 0, rx = 0, ry = 0;

        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            gsap.set(dot, { x: mx, y: my });
        }, { passive: true });

        gsap.ticker.add(() => {
            rx += (mx - rx) * 0.13;
            ry += (my - ry) * 0.13;
            gsap.set(ring, { x: rx, y: ry });
        });

        document.querySelectorAll('a, button, .magnetic, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(ring, { scale: 1.7, borderColor: '#C6FF00', duration: 0.28 });
                gsap.to(dot, { scale: 0, duration: 0.18 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(ring, { scale: 1, borderColor: 'rgba(198,255,0,.45)', duration: 0.28 });
                gsap.to(dot, { scale: 1, duration: 0.18 });
            });
        });
    }

    /* ════════════════════════════════════════════
       MOBILE MENU
    ════════════════════════════════════════════ */
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');
    let menuOpen = false;

    function openMenu() {
        menuOpen = true;
        mobileMenu.style.cssText = 'display:flex!important;opacity:0;pointer-events:auto;';
        gsap.to(mobileMenu, { opacity: 1, duration: 0.28 });
        gsap.set('.mobile-link', { y: 28, opacity: 0 });
        gsap.to('.mobile-link', { y: 0, opacity: 1, stagger: 0.06, duration: 0.38, ease: 'power2.out', delay: 0.08 });
        gsap.to([bar1, bar3], { rotation: (i) => i === 0 ? 45 : -45, y: (i) => i === 0 ? 6 : -6, duration: 0.28 });
        gsap.to(bar2, { opacity: 0, duration: 0.18 });
    }
    function closeMenu() {
        menuOpen = false;
        gsap.to(mobileMenu, {
            opacity: 0, duration: 0.28, onComplete: () => {
                mobileMenu.style.cssText = 'display:none!important;opacity:0;pointer-events:none;';
            }
        });
        gsap.to([bar1, bar3], { rotation: 0, y: 0, duration: 0.28 });
        gsap.to(bar2, { opacity: 1, duration: 0.18 });
    }
    menuBtn.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
    document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));

    /* ════════════════════════════════════════════
       HERO ENTRANCE
    ════════════════════════════════════════════ */
    if (!prefersLow) {
        const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });
        heroTL
            .from('#hero-badge', { y: 18, opacity: 0, duration: 0.55, delay: 0.2 })
            .from('.hero-line', { y: '105%', duration: 0.85, stagger: 0.11, ease: 'power4.out' }, '-=0.25')
            .from('#hero-desc', { y: 26, opacity: 0, duration: 0.65 }, '-=0.35')
            .from('#hero-cta', { y: 18, opacity: 0, duration: 0.55 }, '-=0.38')
            .from('#hero-stats', { y: 16, opacity: 0, duration: 0.55 }, '-=0.38')
            .from('#scroll-hint', { opacity: 0, duration: 0.5 }, '-=0.2');
    } else {
        gsap.set(['.hero-line', '#hero-desc', '#hero-cta', '#hero-stats'], { opacity: 1, y: 0 });
    }

    /* ════════════════════════════════════════════
       COUNTERS
    ════════════════════════════════════════════ */
    ScrollTrigger.create({
        trigger: '#hero-stats', start: 'top 92%', once: true,
        onEnter: () => {
            document.querySelectorAll('.counter').forEach(el => {
                const t = +el.dataset.target;
                gsap.to({ v: 0 }, {
                    v: t, duration: 1.6, ease: 'power2.out',
                    onUpdate: function () { el.textContent = Math.round(this.targets()[0].v) + '+'; }
                });
            });
        }
    });

    /* ════════════════════════════════════════════
       SCROLL REVEALS  (IntersectionObserver, not
       ScrollTrigger, for off-screen perf)
    ════════════════════════════════════════════ */
    if (!prefersLow) {
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    gsap.to(e.target, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
                    revealObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

        /* Skill bars */
        const barObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    gsap.to(e.target, { width: e.target.dataset.w + '%', duration: 1.3, ease: 'power3.out' });
                    barObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.skill-bar').forEach(b => barObs.observe(b));

        /* Experience stagger */
        const expObs = new IntersectionObserver((entries) => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    gsap.to(e.target, { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: i * 0.1 });
                    expObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.2 });
        document.querySelectorAll('.exp-item').forEach(el => { gsap.set(el, { x: -30, opacity: 0 }); expObs.observe(el); });

    } else {
        /* Reduced motion: just make everything visible */
        document.querySelectorAll('.reveal, .skill-bar').forEach(el => {
            el.style.opacity = '1'; el.style.transform = 'none';
        });
        document.querySelectorAll('.skill-bar').forEach(el => el.style.width = el.dataset.w + '%');
    }

    /* ════════════════════════════════════════════
       SKILL CARD TILT  (desktop only)
    ════════════════════════════════════════════ */
    if (!isMobile) {
        document.querySelectorAll('.skill-group').forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                gsap.to(card, { rotateY: ((e.clientX - r.left) / r.width - .5) * 6, rotateX: -((e.clientY - r.top) / r.height - .5) * 6, duration: 0.35, transformPerspective: 800 });
            }, { passive: true });
            card.addEventListener('mouseleave', () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.45, ease: 'power2.out' }));
        });
    }

    /* ════════════════════════════════════════════
       MAGNETIC BUTTONS  (desktop only)
    ════════════════════════════════════════════ */
    if (!isMobile) {
        document.querySelectorAll('.magnetic').forEach(el => {
            el.addEventListener('mousemove', e => {
                const r = el.getBoundingClientRect();
                gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * .22, y: (e.clientY - r.top - r.height / 2) * .22, duration: 0.38, ease: 'power2.out' });
            }, { passive: true });
            el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.48, ease: 'elastic.out(1,.4)' }));
        });
    }

    /* ════════════════════════════════════════════
       HERO PARALLAX BLOBS  (throttled with RAF)
    ════════════════════════════════════════════ */
    if (!isMobile && !prefersLow) {
        let rafPending = false;
        window.addEventListener('scroll', () => {
            if (rafPending) return;
            rafPending = true;
            requestAnimationFrame(() => {
                const s = window.scrollY;
                document.querySelectorAll('.hero-blob').forEach((b, i) =>
                    b.style.transform = `translateY(${s * (i % 2 === 0 ? .14 : -.09)}px)`
                );
                rafPending = false;
            });
        }, { passive: true });
    }

    /* ════════════════════════════════════════════
       CONTACT FORM
    ════════════════════════════════════════════ */
    document.getElementById('contactForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        gsap.to(btn, { scale: .96, duration: .1, yoyo: true, repeat: 1 });
        btn.innerHTML = '✓ Message Sent!';
        btn.style.background = '#fff';
        setTimeout(() => {
            btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline;vertical-align:-3px;margin-left:6px"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            btn.style.background = '';
        }, 3000);
        e.target.reset();
    });

    /* ════════════════════════════════════════════
       ████████████████████████████████████████
       THREE.JS — HERO BACKGROUND CANVAS
       Floating particle field + wireframe orb
       ████████████████████████████████████████
    ════════════════════════════════════════════ */
    (function initHeroThree() {
        const heroSection = document.getElementById('home');
        const canvas = document.getElementById('hero-canvas');
        if (!canvas || !THREE) return;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
        renderer.setPixelRatio(DPR);
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
        camera.position.z = 5;

        /* Resize handler */
        function resizeHero() {
            const w = heroSection.offsetWidth, h = heroSection.offsetHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        }
        resizeHero();
        const ro = new ResizeObserver(resizeHero);
        ro.observe(heroSection);

        /* ── Particle field ── */
        const COUNT = isMobile ? 600 : 1200;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(COUNT * 3);
        const pSizes = new Float32Array(COUNT);
        for (let i = 0; i < COUNT; i++) {
            pPos[i * 3] = (Math.random() - 0.5) * 20;
            pPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
            pSizes[i] = Math.random() * 2.5 + 0.5;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        pGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));

        const pMat = new THREE.PointsMaterial({
            color: 0xC6FF00, size: 0.04, transparent: true, opacity: 0.45,
            sizeAttenuation: true, depthWrite: false
        });
        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        /* ── Wireframe orb ── */
        const orbGeo = new THREE.IcosahedronGeometry(1.4, isMobile ? 1 : 2);
        const orbMat = new THREE.MeshBasicMaterial({ color: 0xC6FF00, wireframe: true, transparent: true, opacity: 0.08 });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        orb.position.set(2.5, 0.5, -1);
        scene.add(orb);

        /* ── Ring ── */
        const ringGeo = new THREE.TorusGeometry(2.2, 0.008, 6, 80);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xC6FF00, transparent: true, opacity: 0.12 });
        const ring3 = new THREE.Mesh(ringGeo, ringMat);
        ring3.rotation.x = Math.PI * 0.3;
        ring3.position.set(2.5, 0.5, -2);
        scene.add(ring3);

        /* ── Mouse parallax ── */
        let tMx = 0, tMy = 0, cMx = 0, cMy = 0;
        document.addEventListener('mousemove', e => {
            tMx = (e.clientX / window.innerWidth - 0.5) * 0.6;
            tMy = (e.clientY / window.innerHeight - 0.5) * 0.4;
        }, { passive: true });

        /* ── RAF loop — only run when hero is visible ── */
        let heroVisible = true, heroRaf = null;
        const heroIO = new IntersectionObserver(([entry]) => {
            heroVisible = entry.isIntersecting;
            if (heroVisible && !heroRaf) tick();
        }, { threshold: 0 });
        heroIO.observe(heroSection);

        let clock = { t: 0 };
        let lastTime = 0;
        function tick(now = 0) {
            if (!heroVisible) { heroRaf = null; return; }
            heroRaf = requestAnimationFrame(tick);

            /* throttle to ~60fps max */
            if (now - lastTime < 14) return;
            lastTime = now;
            clock.t += 0.008;

            /* smooth camera parallax */
            cMx += (tMx - cMx) * 0.04;
            cMy += (tMy - cMy) * 0.04;
            camera.position.x = cMx;
            camera.position.y = -cMy;

            /* rotate */
            particles.rotation.y = clock.t * 0.04;
            particles.rotation.x = clock.t * 0.02;
            orb.rotation.x = clock.t * 0.18;
            orb.rotation.y = clock.t * 0.22;
            ring3.rotation.z = clock.t * 0.12;

            renderer.render(scene, camera);
        }
        tick();

        /* dispose on page unload */
        window.addEventListener('beforeunload', () => {
            pGeo.dispose(); pMat.dispose();
            orbGeo.dispose(); orbMat.dispose();
            ringGeo.dispose(); ringMat.dispose();
            renderer.dispose();
        });
    })();

    /* ════════════════════════════════════════════
       ████████████████████████████████████████
       THREE.JS — 3D PROJECT MODAL
       ████████████████████████████████████████
    ════════════════════════════════════════════ */
    (function initModalThree() {
        const overlay = document.getElementById('modal-overlay');
        const modalClose = document.getElementById('modal-close');
        const canvasWrap = document.getElementById('modal-canvas-wrap');
        const ctrlRotate = document.getElementById('ctrl-rotate');
        const ctrlWire = document.getElementById('ctrl-wire');
        const ctrlReset = document.getElementById('ctrl-reset');

        /* Dynamic info fields */
        const mTitle = document.getElementById('modal-title');
        const mNum = document.getElementById('modal-num');
        const mDesc = document.getElementById('modal-desc');
        const mTags = document.getElementById('modal-tags');
        const mLink = document.getElementById('modal-link');

        /* THREE setup — lazy: created once on first open */
        let threeReady = false;
        let renderer2, scene2, camera2, mesh, edges, pointLight, rafId2;
        let autoRotate = true, wireMode = false;
        let isDragging = false, prevMouse = { x: 0, y: 0 };
        let targetRot = { x: 0.4, y: 0 };
        let currentRot = { x: 0.4, y: 0 };
        let zoom = 5, targetZoom = 5;

        function buildThree() {
            if (threeReady) return;
            threeReady = true;

            renderer2 = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
            renderer2.setPixelRatio(DPR);
            renderer2.setClearColor(0x0a0a0a, 1);
            renderer2.setSize(canvasWrap.clientWidth, canvasWrap.clientHeight);
            canvasWrap.appendChild(renderer2.domElement);

            scene2 = new THREE.Scene();
            scene2.fog = new THREE.FogExp2(0x0a0a0a, 0.12);

            camera2 = new THREE.PerspectiveCamera(45, canvasWrap.clientWidth / canvasWrap.clientHeight, 0.1, 100);
            camera2.position.z = zoom;

            /* Lighting */
            const ambient = new THREE.AmbientLight(0xffffff, 0.15);
            scene2.add(ambient);
            pointLight = new THREE.PointLight(0xC6FF00, 2.5, 12);
            pointLight.position.set(3, 3, 4);
            scene2.add(pointLight);
            const rimLight = new THREE.PointLight(0x0055ff, 1.2, 10);
            rimLight.position.set(-3, -2, -3);
            scene2.add(rimLight);

            /* Subtle grid plane */
            const gridHelper = new THREE.GridHelper(14, 18, 0x1a1a1a, 0x141414);
            gridHelper.position.y = -2.5;
            scene2.add(gridHelper);

            /* Floating ambient particles in modal */
            const mpGeo = new THREE.BufferGeometry();
            const mpPos = new Float32Array(200 * 3);
            for (let i = 0; i < 200; i++) {
                mpPos[i * 3] = (Math.random() - .5) * 12;
                mpPos[i * 3 + 1] = (Math.random() - .5) * 8;
                mpPos[i * 3 + 2] = (Math.random() - .5) * 8 - 2;
            }
            mpGeo.setAttribute('position', new THREE.BufferAttribute(mpPos, 3));
            const mpMat = new THREE.PointsMaterial({ color: 0xC6FF00, size: .04, transparent: true, opacity: .3, depthWrite: false });
            scene2.add(new THREE.Points(mpGeo, mpMat));

            /* Resize */
            const ro2 = new ResizeObserver(() => {
                const w = canvasWrap.clientWidth, h = canvasWrap.clientHeight;
                renderer2.setSize(w, h, false);
                camera2.aspect = w / h; camera2.updateProjectionMatrix();
            });
            ro2.observe(canvasWrap);

            /* Drag / orbit controls (manual) */
            canvasWrap.addEventListener('mousedown', e => { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; autoRotate = false; }, { passive: true });
            window.addEventListener('mouseup', () => { isDragging = false; });
            window.addEventListener('mousemove', e => {
                if (!isDragging) return;
                targetRot.y += (e.clientX - prevMouse.x) * 0.008;
                targetRot.x += (e.clientY - prevMouse.y) * 0.008;
                targetRot.x = Math.max(-1.2, Math.min(1.2, targetRot.x));
                prevMouse = { x: e.clientX, y: e.clientY };
            }, { passive: true });

            /* Touch orbit */
            let lastTouch = null;
            canvasWrap.addEventListener('touchstart', e => { lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY }; autoRotate = false; }, { passive: true });
            canvasWrap.addEventListener('touchmove', e => {
                if (!lastTouch) return;
                targetRot.y += (e.touches[0].clientX - lastTouch.x) * 0.008;
                targetRot.x += (e.touches[0].clientY - lastTouch.y) * 0.008;
                lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }, { passive: true });
            canvasWrap.addEventListener('touchend', () => lastTouch = null, { passive: true });

            /* Scroll zoom */
            canvasWrap.addEventListener('wheel', e => {
                targetZoom = Math.max(2.5, Math.min(9, targetZoom + e.deltaY * 0.004));
            }, { passive: true });
        }

        /* Build geometry for each project shape */
        function buildMesh(shape, color) {
            /* Remove old */
            if (mesh) { scene2.remove(mesh); mesh.geometry.dispose(); mesh.material.dispose(); }
            if (edges) { scene2.remove(edges); edges.geometry.dispose(); edges.material.dispose(); }

            let geo;
            switch (shape) {
                case 'torus': geo = new THREE.TorusGeometry(1.1, 0.42, isMobile ? 16 : 32, isMobile ? 40 : 80); break;
                case 'octahedron': geo = new THREE.OctahedronGeometry(1.4, isMobile ? 0 : 1); break;
                case 'cone': geo = new THREE.ConeGeometry(1.1, 2.2, isMobile ? 24 : 48, 1); break;
                case 'dodecahedron': geo = new THREE.DodecahedronGeometry(1.4, 0); break;
                case 'icosahedron': geo = new THREE.IcosahedronGeometry(1.4, isMobile ? 1 : 2); break;
                default: geo = new THREE.TorusKnotGeometry(0.9, 0.32, isMobile ? 60 : 120, isMobile ? 8 : 16);
            }

            const mat = new THREE.MeshStandardMaterial({
                color: parseInt(color),
                metalness: 0.55,
                roughness: 0.28,
                emissive: parseInt(color),
                emissiveIntensity: 0.12,
                transparent: true, opacity: 0.92,
            });
            mesh = new THREE.Mesh(geo, mat);
            scene2.add(mesh);

            /* Wireframe edges overlay */
            const edgesGeo = new THREE.EdgesGeometry(geo, 15);
            const edgesMat = new THREE.LineBasicMaterial({ color: parseInt(color), transparent: true, opacity: 0.18 });
            edges = new THREE.LineSegments(edgesGeo, edgesMat);
            scene2.add(edges);

            /* Reset view */
            targetRot = { x: 0.4, y: 0 };
            currentRot = { x: 0.4, y: 0 };
            targetZoom = 5; zoom = 5;
            if (mesh) { mesh.rotation.x = 0.4; mesh.rotation.y = 0; }
            if (edges) { edges.rotation.x = 0.4; edges.rotation.y = 0; }
            wireMode = false;
            autoRotate = true;
        }

        /* RAF loop for modal */
        function modalTick() {
            if (!threeReady || !mesh) { rafId2 = requestAnimationFrame(modalTick); return; }
            rafId2 = requestAnimationFrame(modalTick);

            if (autoRotate) targetRot.y += 0.006;

            /* Smooth interpolation */
            currentRot.x += (targetRot.x - currentRot.x) * 0.08;
            currentRot.y += (targetRot.y - currentRot.y) * 0.08;
            zoom += (targetZoom - zoom) * 0.08;

            mesh.rotation.x = currentRot.x;
            mesh.rotation.y = currentRot.y;
            edges.rotation.x = currentRot.x;
            edges.rotation.y = currentRot.y;
            camera2.position.z = zoom;

            /* Pulsing light */
            pointLight.intensity = 2.5 + Math.sin(Date.now() * 0.002) * 0.6;

            renderer2.render(scene2, camera2);
        }

        /* ── Open / Close ── */
        let rafRunning = false;
        function openModal(data) {
            buildThree();                   /* lazy init */
            buildMesh(data.shape, data.color);

            /* Fill content */
            mNum.textContent = data.num;
            mTitle.textContent = data.title;
            mDesc.textContent = data.desc;
            mLink.href = data.link || '#';
            mTags.innerHTML = '';
            (data.tags || '').split(',').forEach(tag => {
                const s = document.createElement('span');
                s.className = 'px-3 py-1 text-xs font-mono rounded-sm';
                s.style.cssText = 'background:rgba(198,255,0,0.08);color:rgba(198,255,0,0.8);border:1px solid rgba(198,255,0,0.2)';
                s.textContent = tag.trim();
                mTags.appendChild(s);
            });

            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';

            if (!rafRunning) { rafRunning = true; modalTick(); }
        }

        function closeModal() {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
            rafRunning = false;
            cancelAnimationFrame(rafId2);
        }

        /* ── Project card click ── */
        document.querySelectorAll('.project-card[data-project]').forEach(card => {
            card.addEventListener('click', () => openModal({
                title: card.dataset.title,
                num: card.dataset.num,
                desc: card.dataset.desc,
                tags: card.dataset.tags,
                shape: card.dataset.shape,
                color: card.dataset.color,
                link: card.dataset.link,
            }));
        });

        modalClose.addEventListener('click', closeModal);
        overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

        /* ── Control buttons ── */
        ctrlRotate.addEventListener('click', () => {
            autoRotate = !autoRotate;
            ctrlRotate.style.color = autoRotate ? '#C6FF00' : 'rgba(198,255,0,.4)';
        });
        ctrlWire.addEventListener('click', () => {
            wireMode = !wireMode;
            if (mesh && edges) {
                mesh.material.opacity = wireMode ? 0 : 0.92;
                edges.material.opacity = wireMode ? 0.7 : 0.18;
            }
            ctrlWire.style.color = wireMode ? '#C6FF00' : 'rgba(198,255,0,.4)';
        });
        ctrlReset.addEventListener('click', () => {
            targetRot = { x: 0.4, y: 0 };
            targetZoom = 5; autoRotate = true;
            ctrlRotate.style.color = 'rgba(198,255,0,.7)';
        });
    })();

    /* Refresh ScrollTrigger */
    ScrollTrigger.refresh();
}