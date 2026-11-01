<template>
    <!-- NAV -->
    <nav id="nav">
        <router-link class="nav-logo" :to="{ name: 'home' }" :aria-label="t('nav.homeAria')">
            <img class="nav-logo-img" src="/avatar.png" width="28" height="28" alt="zfhassaan avatar" />
            <span class="nav-logo-text">zfhassaan</span>
            <span class="nav-logo-dot"></span>
        </router-link>
        <div class="nav-links">
            <router-link :to="{ name: 'about' }" class="nav-link">{{ t('nav.about') }}</router-link>
            <router-link :to="{ name: 'case-studies' }" class="nav-link">{{ t('nav.caseStudies') }}</router-link>
            <router-link :to="{ name: 'home', hash: '#services' }" class="nav-link">{{ t('nav.services') }}</router-link>
            <router-link :to="{ name: 'home', hash: '#opensource' }" class="nav-link">{{ t('nav.contributions') }}</router-link>
            <router-link :to="{ name: 'blog' }" class="nav-link">{{ t('nav.blog') }}</router-link>
            <router-link :to="{ name: 'tools' }" class="nav-link">{{ t('nav.tools') }}</router-link>
            <router-link :to="{ name: 'home', hash: '#contact' }" class="nav-link magnetic">{{ t('nav.contact') }}</router-link>
        </div>
        <div class="nav-actions">
            <LanguageSwitcher />
            <a class="nav-icon-link magnetic" href="https://github.com/zfhassaan" target="_blank" rel="noopener"
                :aria-label="t('nav.githubAria')" title="GitHub" style="align-items: center; display: flex;">
                <Github :size="18" />
            </a>
            <button class="theme-toggle magnetic" onclick="toggleTheme()" :aria-label="t('nav.themeAria')"
                :title="t('nav.themeAria')" style="align-items: center; display: flex;">
                <Sun class="theme-icon-sun" :size="18" />
                <Moon class="theme-icon-moon" :size="18" />
            </button>
            <router-link class="nav-cta magnetic" :to="{ name: 'home', hash: '#contact' }">{{ t('nav.discuss') }}</router-link>
            <button class="nav-toggle" id="navToggle" type="button" aria-expanded="false" :aria-label="t('nav.menuAria')">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Github, Sun, Moon } from 'lucide-vue-next'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { t } = useI18n()
</script>
