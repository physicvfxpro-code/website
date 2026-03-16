import { useTranslation } from 'react-i18next'

export default function Privacy() {
    const { t } = useTranslation()

    return (
        <main className="min-h-screen px-6 lg:px-12 py-32 max-w-3xl mx-auto"
            style={{ color: 'var(--color-text-primary)' }}>

            {/* Header */}
            <div className="mb-16">
                <span className="block text-[11px] font-mono uppercase tracking-[0.18em] mb-4"
                    style={{ color: 'var(--color-accent-text)' }}>
                    {t('footer.privacy')}
                </span>
                <h1 className="font-display font-black leading-[0.92] tracking-tight mb-6"
                    style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--color-text-primary)' }}>
                    {t('privacy.title')}
                </h1>
                <p className="text-[11px] font-mono" style={{ color: 'var(--color-text-muted)' }}>
                    {t('privacy.updated')}
                </p>
            </div>

            <div className="flex flex-col gap-12" style={{ color: 'var(--color-text-muted)' }}>

                {/* Intro */}
                <section className="flex flex-col gap-4">
                    <p className="text-sm leading-relaxed">{t('privacy.intro.p1')}</p>
                    <p className="text-sm leading-relaxed">{t('privacy.intro.p2')}</p>
                </section>

                <Divider />

                {/* Données collectées */}
                <section>
                    <SectionTitle>{t('privacy.dataCollection.title')}</SectionTitle>
                    <div className="flex flex-col gap-8 mt-5">

                        <div>
                            <SubTitle>{t('privacy.dataCollection.personalDataTitle')}</SubTitle>
                            <p className="text-sm leading-relaxed mb-3">
                                {t('privacy.dataCollection.personalDataDesc')}
                            </p>
                            <ul className="flex flex-col gap-1.5 pl-4">
                                {['email', 'name'].map(key => (
                                    <li key={key} className="flex items-center gap-2 text-sm">
                                        <span className="w-1 h-1 rounded-full shrink-0"
                                            style={{ backgroundColor: 'var(--color-accent)' }} />
                                        {t(`privacy.dataCollection.${key}`)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <SubTitle>{t('privacy.dataCollection.usageDataTitle')}</SubTitle>
                            <p className="text-sm leading-relaxed">
                                {t('privacy.dataCollection.usageDataDesc')}
                            </p>
                        </div>

                    </div>
                </section>

                <Divider />

                {/* Sécurité */}
                <section>
                    <SectionTitle>{t('privacy.security.title')}</SectionTitle>
                    <p className="text-sm leading-relaxed mt-5">{t('privacy.security.text')}</p>
                </section>

                <Divider />

                {/* Enfants */}
                <section>
                    <SectionTitle>{t('privacy.children.title')}</SectionTitle>
                    <p className="text-sm leading-relaxed mt-5">{t('privacy.children.text')}</p>
                </section>

                <Divider />

                <section>
                    <SectionTitle>{t('privacy.contact.title')}</SectionTitle>

                    <p className="text-sm leading-relaxed mt-5 mb-3">
                        {t('privacy.contact.text')}
                    </p>

                    <a
                        href="https://physicvfxpro-code.github.io/website/policy"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono transition-opacity hover:opacity-70"
                        style={{ color: 'var(--color-accent-text)' }}
                    >
                        https://physicvfxpro-code.github.io/website/policy
                    </a>
                </section>
            </div>
        </main >
    )
}

function SectionTitle({ children }) {
    return (
        <h2 className="font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', color: 'var(--color-text-primary)' }}>
            {children}
        </h2>
    )
}

function SubTitle({ children }) {
    return (
        <h3 className="text-[11px] font-mono uppercase tracking-[0.16em] mb-2"
            style={{ color: 'var(--color-accent-text)' }}>
            {children}
        </h3>
    )
}

function Divider() {
    return <div className="w-full h-px" style={{ backgroundColor: 'var(--color-border)' }} />
}