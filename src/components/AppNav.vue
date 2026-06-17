<template>
    <!-- NAV -->
    <nav id="nav">
        <router-link class="nav-logo" :to="{ name: 'home' }" aria-label="zfhassaan — home">
            <img class="nav-logo-img" src="/avatar.png" width="28" height="28" alt="zfhassaan avatar" />
            <span class="nav-logo-text">zfhassaan</span>
            <span class="nav-logo-dot"></span>
        </router-link>
        <div class="nav-links">
            <router-link :to="{ name: 'home', hash: '#projects' }" class="nav-link">Projects</router-link>
            <router-link :to="{ name: 'home', hash: '#opensource' }" class="nav-link">Open Source</router-link>
            <router-link :to="{ name: 'home', hash: '#playground' }" class="nav-link">Live Demo</router-link>
            <router-link :to="{ name: 'home', hash: '#expertise' }" class="nav-link">Expertise</router-link>
            <router-link :to="{ name: 'home', hash: '#timeline' }" class="nav-link">Experience</router-link>
            <router-link :to="{ name: 'blog' }" class="nav-link">Blog</router-link>
            <router-link :to="{ name: 'tools' }" class="nav-link">Tools</router-link>
            <router-link :to="{ name: 'home', hash: '#contact' }" class="nav-link magnetic">Contact</router-link>
        </div>
        <div class="nav-actions">
            <a class="nav-icon-link magnetic" href="https://github.com/zfhassaan" target="_blank" rel="noopener"
                aria-label="GitHub profile" title="GitHub" style="align-items: center; display: flex;">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            </a>
            <button class="theme-toggle magnetic" onclick="toggleTheme()" aria-label="Toggle light and dark mode"
                title="Toggle theme" style="align-items: center; display: flex;">
                <svg class="theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path
                        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
                <svg class="theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            </button>
            <router-link class="nav-cta magnetic" :to="{ name: 'home', hash: '#contact' }">Let's Talk</router-link>
            <button class="nav-toggle" id="navToggle" aria-label="Menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>
</template>
