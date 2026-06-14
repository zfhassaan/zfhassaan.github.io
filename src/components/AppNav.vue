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
        <button class="nav-cta magnetic"
            onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">Let's Talk</button>
        <button class="nav-toggle" id="navToggle" aria-label="Menu">
            <span></span><span></span><span></span>
        </button>
    </nav>
</template>
