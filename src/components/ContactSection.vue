<template>
    <!-- ══ CONTACT ══ -->
    <section id="contact" class="section">
        <div class="container">
            <div class="contact-inner reveal">
                <div class="section-label">{{ t('contact.label') }}</div>
                <h2 class="contact-h2">{{ t('contact.title') }}</h2>
                <p class="contact-sub">{{ t('contact.sub') }}</p>

                <!-- Direct Email Card -->
                <div class="email-direct-card">
                    <div class="email-card-header">
                        <div class="email-icon-badge">
                            <Mail :size="24" class="text-accent" />
                        </div>
                        <div class="email-info">
                            <span class="email-label mono">{{ t('contact.inquiries') }}</span>
                            <a :href="mailToLink" class="email-address mono">zfhassaan@gmail.com</a>
                        </div>
                    </div>

                    <div class="email-actions">
                        <a :href="mailToLink" class="btn-primary magnetic email-act-btn">
                            <Send :size="16" />
                            <span>{{ t('contact.send') }}</span>
                        </a>
                        <a
                            :href="gmailLink"
                            target="_blank"
                            rel="noopener"
                            class="btn-secondary magnetic email-act-btn"
                            :title="t('contact.gmailTitle')"
                        >
                            <ExternalLink :size="16" />
                            <span>{{ t('contact.gmail') }}</span>
                        </a>
                        <button
                            type="button"
                            class="btn-secondary magnetic email-act-btn copy-btn"
                            @click="copyEmail"
                        >
                            <Check v-if="copied" :size="16" class="text-accent" />
                            <Copy v-else :size="16" />
                            <span>{{ copied ? t('contact.copied') : t('contact.copy') }}</span>
                        </button>
                    </div>

                    <div class="email-guarantee">
                        <div class="avail-dot"></div>
                        <span>{{ t('contact.guarantee') }}</span>
                    </div>
                </div>

                <!-- Direct profiles (No Upwork, No Fiverr) -->
                <div class="contact-links">
                    <a
                        href="https://linkedin.com/in/zfhassaan"
                        target="_blank"
                        rel="noopener"
                        class="contact-link magnetic"
                        title="Connect on LinkedIn"
                    >
                        <Linkedin :size="16" class="contact-link-icon" />
                        <span class="contact-link-text">{{ t('contact.linkedin') }}</span>
                        <ArrowUpRight :size="14" class="contact-link-arrow" />
                    </a>
                    <a
                        href="https://github.com/zfhassaan"
                        target="_blank"
                        rel="noopener"
                        class="contact-link magnetic"
                        title="View GitHub Repositories"
                    >
                        <Github :size="16" class="contact-link-icon" />
                        <span class="contact-link-text">{{ t('contact.github') }}</span>
                        <ArrowUpRight :size="14" class="contact-link-arrow" />
                    </a>
                    <a
                        href="https://github.com/zfhassaan/zfhassaan.github.io/raw/master/public/resume.pdf"
                        download="Hassaan_Ali_Senior_Software_Engineer_Resume.pdf"
                        class="contact-link recruiter-link magnetic"
                        :title="t('contact.resumeTitle')"
                    >
                        <FileText :size="16" class="contact-link-icon" />
                        <span class="contact-link-text">{{ t('contact.resume') }}</span>
                        <ArrowUpRight :size="14" class="contact-link-arrow" />
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import {
    Mail,
    Send,
    ExternalLink,
    Copy,
    Check,
    Linkedin,
    Github,
    FileText,
    ArrowUpRight
} from 'lucide-vue-next'

const copied = ref(false)

const emailSubject = 'Project Discussion: Technical Consultation & Engineering Inquiry'
const emailBody = `Hi Hassaan,

I came across your portfolio and would like to discuss an engineering project with you.

1. Project Overview & Goals:
[Briefly describe what you are looking to build, audit, or scale]

2. Target Timeline:
[e.g., Immediate / Within 1 month / Flexible]

3. Tech Stack / Existing Codebase:
[e.g., Laravel / Node.js / Vue / PostgreSQL / AWS / New project]

Best regards,
[Your Name]
[Company / Organization]`

const mailToLink = computed(() => {
    return `mailto:zfhassaan@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
})

const gmailLink = computed(() => {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=zfhassaan@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
})

function copyEmail() {
    navigator.clipboard?.writeText('zfhassaan@gmail.com')
    copied.value = true
    setTimeout(() => {
        copied.value = false
    }, 2500)
}
</script>

<style scoped>
.email-direct-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 36px;
    margin: 36px 0 32px 0;
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

@media (max-width: 640px) {
    .email-direct-card {
        padding: 24px 20px;
    }
}

.email-card-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 28px;
}

.email-icon-badge {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.email-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.email-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    letter-spacing: 0.08em;
}

.email-address {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.2s ease;
}

.email-address:hover {
    color: var(--accent);
}

@media (max-width: 640px) {
    .email-address {
        font-size: 1.1rem;
        word-break: break-all;
    }
}

.email-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 24px;
}

.email-act-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 6px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-primary {
    background: var(--accent);
    color: var(--on-accent);
    border: 1px solid var(--accent);
}

.btn-primary:hover {
    background: var(--accent-hover, #34d399);
}

.btn-secondary {
    background: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border);
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--accent);
}

.email-guarantee {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.8125rem;
    color: var(--text-secondary);
    padding-top: 18px;
    border-top: 1px solid var(--border);
}

.avail-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 10px #10b981;
    flex-shrink: 0;
}

.contact-links {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    justify-content: center;
    margin-top: 28px;
}

.contact-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.875rem;
    transition: all 0.2s ease;
}

.contact-link:hover {
    color: var(--text-primary);
    border-color: var(--accent);
    background: rgba(255, 255, 255, 0.03);
}

.contact-link-arrow {
    opacity: 0.5;
    transition: transform 0.2s ease, opacity 0.2s ease;
}

.contact-link:hover .contact-link-arrow {
    opacity: 1;
    transform: translate(2px, -2px);
}
</style>
