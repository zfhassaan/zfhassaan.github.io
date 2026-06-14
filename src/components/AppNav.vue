<template>
<!-- NAV -->
    <nav id="nav">
        <div class="nav-logo">
            <div class="nav-logo-dot"></div>
            &lt;engineer /&gt;
        </div>
        <div class="nav-links">
            <a href="#projects" class="nav-link">Projects</a>
            <a href="#opensource" class="nav-link">Open Source</a>
            <a href="#playground" class="nav-link">Live Demo</a>
            <a href="#expertise" class="nav-link">Expertise</a>
            <a href="#timeline" class="nav-link">Experience</a>
            <a href="#contact" class="nav-link magnetic">Contact</a>
        </div>
        <div class="nav-actions">
            <button class="theme-toggle magnetic" onclick="toggleTheme()" aria-label="Toggle light and dark mode"
                title="Toggle theme">
                <svg class="theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
                <svg class="theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            </button>
            <button class="nav-cta magnetic"
                onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">Let's Talk</button>
            <button class="nav-toggle" id="navToggle" aria-label="Menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>
</template>
