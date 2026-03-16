import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import i18n from '../i18n'

function validate(form, t) {
  const errs = {}
  if (!form.name.trim()) errs.name = t('contact.required')
  if (!form.email.trim()) errs.email = t('contact.required')
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t('contact.invalid_email')
  if (!form.message.trim()) errs.message = t('contact.required')
  return errs
}

export default function Contact() {
  const { t } = useTranslation()
  const lang = i18n.language
  const pageRef = useRef(null)
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [attachment, setAttachment] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.from('.contact-tag', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' })
        .from('.contact-title', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .from('.contact-sub', { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .from('.contact-info > *', { opacity: 0, x: -30, stagger: 0.12, duration: 0.6, ease: 'power3.out' }, '-=0.2')
        .from('.contact-form > *', { opacity: 0, y: 20, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, '-=0.5')
    }, pageRef)
    return () => ctx.revert()
  }, [])

  const handle = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleFile = e => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      alert(lang === 'fr' ? 'Fichier trop lourd (max 10MB)' : 'File too large (max 10MB)')
      return
    }
    setAttachment(file)
  }

  const submit = async e => {
    e.preventDefault()
    const errs = validate(form, t)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1500))
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
    setAttachment(null)
  }

  const inputClass = (hasError) => `
    w-full px-4 py-3 text-sm font-body transition-all duration-250 outline-none
    bg-transparent border
    ${hasError ? 'border-red-400' : ''}
    focus:outline-none
  `

  return (
    <main ref={pageRef} style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <Helmet>
        <title>Contact — Physic</title>
        <meta name="description" content={lang === 'fr'
          ? 'Contactez-moi pour discuter de votre projet créatif. Réponse sous 24h.'
          : 'Contact me to discuss your creative project. Reply within 24h.'} />
      </Helmet>

      {/* ── HEADER ── */}
      <section className="pt-36 pb-20" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="contact-tag text-[11px] font-mono uppercase tracking-[0.18em] mb-4 block"
            style={{ color: 'var(--color-accent-text)' }}>
            Contact
          </span>
          <h1 className="contact-title font-display font-black text-5xl md:text-7xl tracking-tight leading-[0.92] mb-4"
            style={{ color: 'var(--color-text-primary)' }}>
            {t('contact.title')}
          </h1>
          <p className="contact-sub text-lg max-w-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}>
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

            {/* ── LEFT: Info ── */}
            <div className="contact-info lg:col-span-2 flex flex-col gap-10">
              {/* Email */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] mb-2 block"
                  style={{ color: 'var(--color-accent-text)' }}>
                  Email
                </span>
                <a href="mailto:khylian.griffon-nicolas@hotmail.com
"
                  className="text-xl font-body font-semibold transition-colors duration-300 hover:underline"
                  style={{ color: 'var(--color-text-primary)' }}>
                  khylian.griffon-nicolas@hotmail.com

                </a>
              </div>

              {/* Location */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] mb-2 block"
                  style={{ color: 'var(--color-accent-text)' }}>
                  {t('contact.address_title')}
                </span>
                <p className="font-body" style={{ color: 'var(--color-text-muted)' }}>
                  Normandie, France
                </p>
              </div>

              {/* Socials */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] mb-3 block"
                  style={{ color: 'var(--color-accent-text)' }}>
                  {t('contact.social_title')}
                </span>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Instagram', href: 'https://instagram.com' },
                    { label: 'YouTube', href: 'https://youtube.com' },
                    { label: 'LinkedIn', href: 'https://linkedin.com' },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm font-body transition-colors duration-250 group"
                      style={{ color: 'var(--color-text-muted)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent-text)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                      <span className="w-5 h-px transition-all duration-300 group-hover:w-9"
                        style={{ backgroundColor: 'currentColor' }} />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability badge */}
              <div className="p-5 border"
                style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-card)' }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-green-400">
                    {lang === 'fr' ? 'Disponible' : 'Available'}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {lang === 'fr'
                    ? 'Actuellement disponible pour de nouvelles collaborations.'
                    : 'Currently available for new collaborations.'}
                </p>
              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="lg:col-span-3">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 flex items-center justify-center mb-6 border"
                    style={{ borderColor: '#4ade80' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-3"
                    style={{ color: 'var(--color-text-primary)' }}>
                    {t('contact.success')}
                  </h3>
                  <button onClick={() => setStatus(null)}
                    className="mt-5 text-[11px] font-mono uppercase tracking-widest"
                    style={{ color: 'var(--color-accent-text)' }}>
                    ← {lang === 'fr' ? 'Nouveau message' : 'New message'}
                  </button>
                </div>
              ) : (
                <form action="https://api.web3forms.com/submit" method="POST" className="contact-form flex flex-col gap-5" encType="multipart/form-data">
                  <input type="hidden" name="access_key" value="6ddece2c-a487-4697-be16-8327c0554829" />
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest mb-2"
                        style={{ color: 'var(--color-text-muted)' }}>
                        {t('contact.name')} <span style={{ color: 'var(--color-accent)' }}>*</span>
                      </label>
                      <input type="text" name="name" required
                        placeholder={lang === 'fr' ? 'Jean Dupont' : 'John Doe'}
                        className={inputClass(false)}
                        style={{
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                          backgroundColor: 'var(--color-bg-card)',
                        }}
                        onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest mb-2"
                        style={{ color: 'var(--color-text-muted)' }}>
                        {t('contact.email')} <span style={{ color: 'var(--color-accent)' }}>*</span>
                      </label>
                      <input type="email" name="email" required
                        placeholder="hello@example.com"
                        className={inputClass(false)}
                        style={{
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                          backgroundColor: 'var(--color-bg-card)',
                        }}
                        onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                      />
                    </div>
                  </div>
                  {/* Subject */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest mb-2"
                      style={{ color: 'var(--color-text-muted)' }}>
                      {t('contact.subject')}
                    </label>
                    <input type="text" name="subject"
                      placeholder={lang === 'fr' ? 'Projet photo — Avril 2025' : 'Photo project — April 2025'}
                      className={inputClass(false)}
                      style={{
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-primary)',
                        backgroundColor: 'var(--color-bg-card)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                    />
                  </div>
                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest mb-2"
                      style={{ color: 'var(--color-text-muted)' }}>
                      {t('contact.message')} <span style={{ color: 'var(--color-accent)' }}>*</span>
                    </label>
                    <textarea name="message" required rows={6}
                      placeholder={lang === 'fr' ? 'Décrivez votre projet...' : 'Describe your project...'}
                      className={inputClass(false) + ' resize-none'}
                      style={{
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-primary)',
                        backgroundColor: 'var(--color-bg-card)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                    />
                  </div>
                  {/* Attachment supprimé */}
                  {/* Submit */}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 text-white transition-all duration-400 hover:bg-white hover:text-gray-900 border-2 border-accent shadow-md"
                    style={{
                      background: 'rgba(20,20,30,0.85)',
                      fontSize: '13px',
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.13em',
                      borderRadius: '9999px',
                      boxShadow: '0 2px 16px 0 rgba(76,84,234,0.18)',
                      opacity: 1,
                      zIndex: 20,
                    }}
                  >

                    {t('contact.send')}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
