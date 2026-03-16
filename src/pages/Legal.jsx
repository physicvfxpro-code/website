import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import i18n from '../i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Legal() {
    const { t } = useTranslation()
    const lang = i18n.language
    const pageRef = useRef(null)

    return (
        <main
            className="min-h-screen px-6 lg:px-12 py-32 max-w-3xl mx-auto"
            style={{ color: "var(--color-text-primary)" }}
        >
            {/* Header */}
            <div className="mb-16">
                <span
                    className="block text-[11px] font-mono uppercase tracking-[0.18em] mb-4"
                    style={{ color: "var(--color-accent-text)" }}
                >
                    {t("footer.legal")}
                </span>

                <h1
                    className="font-display font-black leading-[0.92] tracking-tight mb-6"
                    style={{
                        fontSize: "clamp(36px, 5vw, 64px)",
                        color: "var(--color-text-primary)"
                    }}
                >
                    {t("legal.title")}
                </h1>

                <p
                    className="text-[11px] font-mono"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    {t("legal.updated")}
                </p>
            </div>

            <div
                className="flex flex-col gap-12"
                style={{ color: "var(--color-text-muted)" }}
            >
                {/* Éditeur */}
                <section>
                    <SectionTitle>{t("legal.publisher.title")}</SectionTitle>

                    <div className="flex flex-col gap-3 mt-5 text-sm">
                        <p>{t("legal.publisher.name")}</p>
                        <p>{t("legal.publisher.status")}</p>
                        <p>{t("legal.publisher.location")}</p>
                        <p>{t("legal.publisher.email")}</p>
                    </div>
                </section>

                <Divider />

                {/* Hébergement */}
                <section>
                    <SectionTitle>{t("legal.host.title")}</SectionTitle>

                    <div className="flex flex-col gap-3 mt-5 text-sm">
                        <p>{t("legal.host.name")}</p>
                        <p>{t("legal.host.company")}</p>

                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-mono transition-opacity hover:opacity-70"
                            style={{ color: "var(--color-accent-text)" }}
                        >
                            github.com
                        </a>
                    </div>
                </section>

                <Divider />

                {/* Propriété intellectuelle */}
                <section>
                    <SectionTitle>{t("legal.ip.title")}</SectionTitle>

                    <p className="text-sm leading-relaxed mt-5">
                        {t("legal.ip.text")}
                    </p>
                </section>

                <Divider />

                {/* Responsabilité */}
                <section>
                    <SectionTitle>{t("legal.liability.title")}</SectionTitle>

                    <p className="text-sm leading-relaxed mt-5">
                        {t("legal.liability.text")}
                    </p>
                </section>

                <Divider />

                {/* Contact */}
                <section>
                    <SectionTitle>{t("legal.contact.title")}</SectionTitle>

                    <p className="text-sm leading-relaxed mt-5 mb-3">
                        {t("legal.contact.text")}
                    </p>

                    <a
                        href="mailto:khylian.griffon-nicolas@hotmail.com"
                        className="text-[11px] font-mono transition-opacity hover:opacity-70"
                        style={{ color: "var(--color-accent-text)" }}
                    >
                        khylian.griffon-nicolas@hotmail.com
                    </a>
                </section>
            </div>
        </main>
    )
}

function SectionTitle({ children }) {
    return (
        <h2
            className="text-xs font-mono uppercase tracking-[0.18em]"
            style={{ color: "var(--color-text-primary)" }}
        >
            {children}
        </h2>
    )
}

function Divider() {
    return (
        <hr
            className="border-none h-px"
            style={{ background: "var(--color-border)" }}
        />
    )
}