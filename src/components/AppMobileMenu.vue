<template>
<!-- MOBILE MENU -->
    <div id="mobile-menu">
        <nav class="mobile-menu-links" aria-label="Mobile navigation">
            <router-link :to="{ name: 'about' }" @click="closeMenu">About</router-link>
            <router-link :to="{ name: 'case-studies' }" @click="closeMenu">Case Studies</router-link>
            <router-link :to="{ name: 'home', hash: '#services' }" @click="closeMenu">Services</router-link>
            <router-link :to="{ name: 'home', hash: '#opensource' }" @click="closeMenu">Contributions</router-link>
            <router-link :to="{ name: 'home', hash: '#process' }" @click="closeMenu">Process</router-link>
            <router-link :to="{ name: 'blog' }" @click="closeMenu">Blog</router-link>
            <router-link :to="{ name: 'tools' }" @click="closeMenu">Tools</router-link>
            <router-link :to="{ name: 'home', hash: '#contact' }" @click="closeMenu">Contact</router-link>
        </nav>
        <div class="mobile-menu-footer">
            <a href="https://github.com/zfhassaan" target="_blank" rel="noopener" class="mobile-menu-icon"
                aria-label="GitHub profile">
                <Github :size="20" />
            </a>
            <router-link class="mobile-menu-cta" :to="{ name: 'home', hash: '#contact' }" @click="closeMenu">
                Discuss Project
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { Github } from 'lucide-vue-next'

function closeMenu() {
    document.getElementById('mobile-menu')?.classList.remove('open')
}
</script>
