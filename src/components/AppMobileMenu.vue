<template>
<!-- MOBILE MENU -->
    <div id="mobile-menu">
        <nav class="mobile-menu-links" aria-label="Mobile navigation">
            <router-link :to="{ name: 'about' }" @click="closeMenu">{{ t('nav.about') }}</router-link>
            <router-link :to="{ name: 'case-studies' }" @click="closeMenu">{{ t('nav.caseStudies') }}</router-link>
            <router-link :to="{ name: 'home', hash: '#services' }" @click="closeMenu">{{ t('nav.services') }}</router-link>
            <router-link :to="{ name: 'home', hash: '#opensource' }" @click="closeMenu">{{ t('nav.contributions') }}</router-link>
            <router-link :to="{ name: 'home', hash: '#process' }" @click="closeMenu">{{ t('nav.process') }}</router-link>
            <router-link :to="{ name: 'blog' }" @click="closeMenu">{{ t('nav.blog') }}</router-link>
            <router-link :to="{ name: 'tools' }" @click="closeMenu">{{ t('nav.tools') }}</router-link>
            <router-link :to="{ name: 'home', hash: '#contact' }" @click="closeMenu">{{ t('nav.contact') }}</router-link>
        </nav>
        <div class="mobile-menu-footer">
            <LanguageSwitcher />
            <a href="https://github.com/zfhassaan" target="_blank" rel="noopener" class="mobile-menu-icon"
                :aria-label="t('nav.githubAria')">
                <Github :size="20" />
            </a>
            <button class="theme-toggle mobile-menu-icon" onclick="toggleTheme()" :aria-label="t('nav.themeAria')"
                :title="t('nav.themeAria')">
                <Sun class="theme-icon-sun" :size="18" />
                <Moon class="theme-icon-moon" :size="18" />
            </button>
            <router-link class="mobile-menu-cta" :to="{ name: 'home', hash: '#contact' }" @click="closeMenu">
                {{ t('nav.discuss') }}
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Github, Sun, Moon } from 'lucide-vue-next'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { t } = useI18n()

function closeMenu() {
    document.getElementById('mobile-menu')?.classList.remove('open')
}
</script>
