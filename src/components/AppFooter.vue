<template>
    <!-- FOOTER -->
    <footer>
        <div class="footer-copy">{{ t('footer.line') }}</div>
        <div class="footer-links">
            <a href="https://github.com/zfhassaan" class="footer-link">GitHub</a>
            <a href="https://linkedin.com/in/zfhassaan" class="footer-link">LinkedIn</a>
            <a href="mailto:zfhassaan@gmail.com" class="footer-link">{{ t('footer.email') }}</a>
        </div>
    </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
