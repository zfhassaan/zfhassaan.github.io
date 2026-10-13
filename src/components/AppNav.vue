<template>
    <!-- NAV -->
    <nav id="nav">
        <router-link class="nav-logo" :to="{ name: 'home' }" aria-label="zfhassaan — home">
            <img class="nav-logo-img" src="/avatar.png" width="28" height="28" alt="zfhassaan avatar" />
            <span class="nav-logo-text">zfhassaan</span>
            <span class="nav-logo-dot"></span>
        </router-link>
        <div class="nav-links">
            <router-link :to="{ name: 'home', hash: '#clients' }" class="nav-link">Clients</router-link>
            <router-link :to="{ name: 'home', hash: '#services' }" class="nav-link">Services</router-link>
            <router-link :to="{ name: 'home', hash: '#projects' }" class="nav-link">Case Studies</router-link>
            <router-link :to="{ name: 'home', hash: '#process' }" class="nav-link">Process</router-link>
            <router-link :to="{ name: 'home', hash: '#opensource' }" class="nav-link">Open Source</router-link>
            <router-link :to="{ name: 'home', hash: '#timeline' }" class="nav-link">Experience</router-link>
            <router-link :to="{ name: 'blog' }" class="nav-link">Blog</router-link>
            <router-link :to="{ name: 'tools' }" class="nav-link">Tools</router-link>
            <router-link :to="{ name: 'home', hash: '#contact' }" class="nav-link magnetic">Contact</router-link>
        </div>
        <div class="nav-actions">
            <a class="nav-icon-link magnetic" href="https://github.com/zfhassaan" target="_blank" rel="noopener"
                aria-label="GitHub profile" title="GitHub" style="align-items: center; display: flex;">
                <Github :size="18" />
            </a>
            <button class="theme-toggle magnetic" onclick="toggleTheme()" aria-label="Toggle light and dark mode"
                title="Toggle theme" style="align-items: center; display: flex;">
                <Sun class="theme-icon-sun" :size="18" />
                <Moon class="theme-icon-moon" :size="18" />
            </button>
            <router-link class="nav-cta magnetic" :to="{ name: 'home', hash: '#contact' }">Discuss Project</router-link>
            <button class="nav-toggle" id="navToggle" aria-label="Menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>
</template>

<script setup>
import { Github, Sun, Moon } from 'lucide-vue-next'
</script>
