<template>
    <!-- ══ CONTACT & PROJECT ENQUIRY ══ -->
    <section id="contact" class="section">
        <div class="container">
            <div class="contact-inner reveal">
                <div class="section-label">Start a Conversation</div>
                <h2 class="contact-h2">Have a Technical Challenge?<br>Let's Discuss Your Project.</h2>
                <p class="contact-sub">
                    Whether you are building a new platform, integrating mission-critical payment gateways, or scaling an existing backend system — I'm available for direct client engagements, contracts, and technical consulting.
                </p>

                <!-- Project Enquiry Builder -->
                <div class="enquiry-card">
                    <div class="enquiry-header">
                        <div class="enquiry-title">
                            <Zap :size="16" class="text-accent" />
                            <span>Quick Project Brief Builder</span>
                        </div>
                        <div class="enquiry-note">Select your project type to generate a pre-structured email template:</div>
                    </div>

                    <div class="project-types" role="radiogroup" aria-label="Project Type">
                        <button
                            v-for="type in projectTypes"
                            :key="type.id"
                            type="button"
                            class="project-type-btn"
                            :class="{ active: selectedType === type.id }"
                            @click="selectedType = type.id"
                        >
                            <component :is="type.icon" :size="15" class="type-icon" />
                            <span class="type-label">{{ type.label }}</span>
                        </button>
                    </div>

                    <div class="enquiry-action-row">
                        <a
                            :href="mailToLink"
                            class="btn-primary magnetic enquiry-send-btn"
                        >
                            <span>Open in Mail App</span>
                            <ArrowRight :size="14" />
                        </a>
                        <a
                            :href="gmailLink"
                            target="_blank"
                            rel="noopener"
                            class="btn-secondary magnetic webmail-btn"
                            title="Compose directly in Gmail Web"
                        >
                            <ExternalLink :size="14" />
                            <span>Open in Gmail</span>
                        </a>
                        <button
                            type="button"
                            class="btn-secondary magnetic copy-btn"
                            @click="copyEmail"
                        >
                            <Check v-if="copied" :size="14" />
                            <Copy v-else :size="14" />
                            <span>{{ copied ? 'Copied' : 'Copy Email' }}</span>
                        </button>
                    </div>

                    <!-- What happens next -->
                    <div class="enquiry-steps">
                        <div class="enquiry-step">
                            <span class="enquiry-step-num">1</span>
                            <span>Share your brief, timeline &amp; tech stack</span>
                        </div>
                        <div class="enquiry-step">
                            <span class="enquiry-step-num">2</span>
                            <span>Get initial technical feedback within 24h</span>
                        </div>
                        <div class="enquiry-step">
                            <span class="enquiry-step-num">3</span>
                            <span>Intro call to align on milestones &amp; scope</span>
                        </div>
                    </div>
                </div>

                <!-- Direct channels & recruiter route -->
                <div class="contact-links">
                    <a href="mailto:zfhassaan@gmail.com" class="contact-link magnetic">
                        <Mail :size="16" class="contact-link-icon" />
                        <span class="contact-link-text">zfhassaan@gmail.com</span>
                    </a>
                    <a href="https://linkedin.com/in/zfhassaan" target="_blank" rel="noopener"
                        class="contact-link magnetic">
                        <Linkedin :size="16" class="contact-link-icon" />
                        <span class="contact-link-text">LinkedIn</span>
                    </a>
                    <a href="https://github.com/zfhassaan" target="_blank" rel="noopener"
                        class="contact-link magnetic">
                        <Github :size="16" class="contact-link-icon" />
                        <span class="contact-link-text">GitHub</span>
                    </a>
                    <a href="https://www.upwork.com/freelancers/zfhassaan" target="_blank" rel="noopener"
                        class="contact-link upwork-link magnetic" title="Hire with Upwork Escrow Protection">
                        <Briefcase :size="16" class="contact-link-icon" />
                        <span class="contact-link-text">Upwork </span>
                    </a>
                    <a href="https://www.fiverr.com/sellers/alphapk/" target="_blank" rel="noopener"
                        class="contact-link fiverr-link magnetic" title="Hire on Fiverr with 5-Star Reviews">
                        <Star :size="16" class="contact-link-icon" />
                        <span class="contact-link-text">Fiverr </span>
                    </a>
                    <a href="https://github.com/zfhassaan/zfhassaan.github.io/raw/master/public/resume.pdf" download="Hassaan_Ali_Senior_Software_Engineer_Resume.pdf" class="contact-link recruiter-link magnetic" title="Download technical résumé for recruiters and engineering managers">
                        <FileText :size="16" class="contact-link-icon" />
                        <span class="contact-link-text">Résumé for Recruiters</span>
                    </a>
                </div>

                <div class="contact-availability">
                    <div class="avail-dot"></div>
                    Available for direct client engagements &amp; remote contracts · Response within 24 hours
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
    Zap,
    CreditCard,
    Monitor,
    Search,
    Handshake,
    ArrowRight,
    Copy,
    Check,
    Mail,
    Linkedin,
    Github,
    FileText,
    Briefcase,
    Star,
    ExternalLink
} from 'lucide-vue-next'

const projectTypes = [
    { id: 'backend', label: 'Backend & APIs', icon: Zap },
    { id: 'payments', label: 'Payment Gateway', icon: CreditCard },
    { id: 'fullstack', label: 'Full-Stack / SaaS', icon: Monitor },
    { id: 'audit', label: 'System Audit & Scaling', icon: Search },
    { id: 'other', label: 'General Project', icon: Handshake },
]

const selectedType = ref('backend')
const copied = ref(false)

const emailTemplate = computed(() => {
    const selected = projectTypes.find(t => t.id === selectedType.value)
    const typeLabel = selected ? selected.label : 'Engineering Project'
    const subject = `Project Discussion: ${typeLabel} — Direct Inquiry`
    const body = `Hi Hassaan,

I came across your portfolio and would like to discuss a project with you.

1. Project Overview & Goals:
[Briefly describe what you are looking to build or solve]

2. Target Timeline:
[e.g., Immediate / Within 1 month / Flexible]

3. Current Tech Stack or Existing Codebase:
[e.g., Laravel / Node.js / Vue / React / Postgres / New greenfield]

4. Best way to follow up:
[Email / WhatsApp / Slack / Video Call]

Looking forward to your thoughts.

Best regards,
[Your Name]
[Company / Organization]`

    return { subject, body }
})

const mailToLink = computed(() => {
    const { subject, body } = emailTemplate.value
    return `mailto:zfhassaan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})

const gmailLink = computed(() => {
    const { subject, body } = emailTemplate.value
    return `https://mail.google.com/mail/?view=cm&fs=1&to=zfhassaan@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
.enquiry-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 28px;
    margin: 32px 0 36px 0;
    width: 100%;
    box-sizing: border-box;
    text-align: left;
}

@media (max-width: 640px) {
    .enquiry-card {
        padding: 20px 16px;
    }
}

.enquiry-header {
    margin-bottom: 18px;
}

.enquiry-title {
    font-family: var(--font-head);
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.enquiry-note {
    font-size: 0.8125rem;
    color: var(--text-secondary);
}

.project-types {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
}

.project-type-btn {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
    width: auto;
    gap: 6px;
    padding: 8px 13px;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.02);
    color: var(--text-secondary);
    font-size: 0.8125rem;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all 0.2s ease;
}

.project-type-btn:hover {
    border-color: rgba(45, 212, 191, 0.4);
    color: var(--text-primary);
}

.project-type-btn.active {
    background: rgba(45, 212, 191, 0.12);
    border-color: var(--accent);
    color: var(--text-primary);
    font-weight: 500;
}

.type-icon {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
}

.enquiry-action-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    margin-bottom: 24px;
}

.enquiry-send-btn {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    width: auto;
    gap: 8px;
    text-decoration: none;
}

.copy-btn,
.webmail-btn {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    width: auto;
    gap: 6px;
    cursor: pointer;
    text-decoration: none;
}

.enquiry-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding-top: 18px;
    border-top: 1px solid var(--border);
}

@media (max-width: 600px) {
    .enquiry-steps {
        grid-template-columns: 1fr;
    }
}

.enquiry-step {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 0.775rem;
    color: var(--text-muted);
    line-height: 1.4;
}

.enquiry-step-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(45, 212, 191, 0.15);
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
}

.recruiter-link {
    border-color: rgba(96, 165, 250, 0.3) !important;
    color: var(--text-secondary);
}

.recruiter-link:hover {
    border-color: var(--accent3) !important;
    color: var(--text-primary);
}

.upwork-link {
    border-color: rgba(20, 168, 0, 0.35) !important;
}

.upwork-link:hover {
    border-color: #14a800 !important;
    background: rgba(20, 168, 0, 0.08) !important;
    color: var(--text-primary) !important;
}

.fiverr-link {
    border-color: rgba(29, 191, 115, 0.35) !important;
}

.fiverr-link:hover {
    border-color: #1dbf73 !important;
    background: rgba(29, 191, 115, 0.08) !important;
    color: var(--text-primary) !important;
}

.contact-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 32px;
}

.contact-link {
    display: inline-flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    white-space: nowrap !important;
    width: auto !important;
    gap: 8px !important;
    padding: 10px 20px !important;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--text-secondary);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--card);
    text-decoration: none;
    transition: all 0.2s ease;
}

.contact-link-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0 !important;
}

.contact-link-text {
    white-space: nowrap !important;
}
</style>
