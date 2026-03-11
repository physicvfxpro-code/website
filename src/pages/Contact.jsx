import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { useFadeIn } from '../hooks/useFadeIn.js'
import { CONTACT_INFO, BUDGETS, PRESTATIONS, UI } from '../data/content.js'

export default function Contact({ selectedService }) {
  const { lang } = useApp()
  const ui = UI[lang]
  const { ref, vis } = useFadeIn()
  const contactInfo = CONTACT_INFO[lang]
  const budgets = BUDGETS[lang]
  const prestations = PRESTATIONS[lang]

  const [form, setForm] = useState({ prenom: '', nom: '', email: '', tel: '', type: '', date: '', budget: '', msg: '' })
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  // Pre-select service when navigating from Services page
  useEffect(() => {
    if (selectedService) {
      setForm((f) => ({ ...f, type: selectedService }))
    }
  }, [selectedService])

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const err = {}
    if (!form.prenom.trim()) err.prenom = true
    if (!form.email.trim() || !form.email.includes('@')) err.email = true
    if (!form.msg.trim()) err.msg = true
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = () => {
    if (validate()) setSent(true)
  }

  return (
    <div className="page-enter" style={{ paddingTop: 110 }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: '44vh', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=80"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.18) saturate(0.4)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.75) 40%, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 5vw 56px' }}>
          <p className="label" style={{ marginBottom: 14, color: 'rgba(255,255,255,0.4)' }}>{ui.contactHeroLabel}</p>
          <h1 className="display" style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: '#f0ece6', lineHeight: 0.92 }}>
            {ui.contactHeroTitle1}<br /><em className="display-italic">{ui.contactHeroTitle2}</em>
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: '80px 5vw', maxWidth: 1200, margin: '0 auto' }}>
        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: '80px' }}>

          {/* Info column */}
          <div ref={ref('ci')} data-k="ci" className={`fade-in ${vis['ci'] ? 'visible' : ''}`}>
            <p className="label" style={{ marginBottom: 28 }}>{ui.contactInfoLabel}</p>

            {contactInfo.map((c, i) => (
              <div key={i} style={{ marginBottom: 28 }}>
                <p className="label" style={{ fontSize: 8, marginBottom: 6, color: 'var(--text-faint)' }}>{c.label}</p>
                <p className="display-italic" style={{ fontSize: 17, color: 'var(--text-muted)' }}>{c.value}</p>
              </div>
            ))}

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28, marginTop: 8 }}>
              <p className="label" style={{ fontSize: 9, marginBottom: 14 }}>{ui.contactAvailLabel}</p>
              <p style={{ fontSize: 13, lineHeight: 1.9, color: 'var(--text-faint)' }}>
                {ui.contactAvailText}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28, marginTop: 28 }}>
              <p className="label" style={{ fontSize: 9, marginBottom: 14 }}>{ui.contactSocialLabel}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Instagram', 'TikTok', 'YouTube'].map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: "'MuseoSans', sans-serif", fontWeight: 300,
                      fontSize: 9, letterSpacing: '2.5px', textTransform: 'uppercase',
                      padding: '8px 14px',
                      border: '1px solid var(--border)',
                      color: 'var(--text-faint)',
                      cursor: 'pointer', transition: 'all .3s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-faint)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form column */}
          <div ref={ref('cf')} data-k="cf" className={`fade-in ${vis['cf'] ? 'visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
            {sent ? (
              <div style={{ textAlign: 'center', paddingTop: 80, animation: 'fadeUp 0.5s ease' }}>
                <p style={{ fontSize: 52, color: 'var(--text-faint)', marginBottom: 22 }}>✓</p>
                <h3 className="display" style={{ fontSize: 36, color: 'var(--text)', marginBottom: 14 }}>{ui.contactSentTitle}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.9 }}>
                  {lang === 'fr' ? `Merci ${form.prenom} !` : `Thanks ${form.prenom}!`}<br />
                  {ui.contactSentText}
                </p>
              </div>
            ) : (
              <>
                <p className="label" style={{ marginBottom: 36 }}>{ui.contactFormLabel}</p>

                <div className="grid-2col-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px 24px' }}>

                  <div>
                    <p className="label" style={{ fontSize: 8, marginBottom: 10, color: errors.prenom ? '#e06060' : 'var(--text-faint)' }}>{ui.contactFirstname} *</p>
                    <input className="field" type="text" placeholder={ui.contactFirstname} value={form.prenom} onChange={update('prenom')}
                      style={{ borderBottomColor: errors.prenom ? 'rgba(220,80,80,0.5)' : undefined }}
                    />
                  </div>

                  <div>
                    <p className="label" style={{ fontSize: 8, marginBottom: 10, color: 'var(--text-faint)' }}>{ui.contactLastname}</p>
                    <input className="field" type="text" placeholder={ui.contactLastname} value={form.nom} onChange={update('nom')} />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <p className="label" style={{ fontSize: 8, marginBottom: 10, color: errors.email ? '#e06060' : 'var(--text-faint)' }}>{ui.contactEmail} *</p>
                    <input className="field" type="email" placeholder="votre@email.com" value={form.email} onChange={update('email')}
                      style={{ borderBottomColor: errors.email ? 'rgba(220,80,80,0.5)' : undefined }}
                    />
                  </div>

                  <div>
                    <p className="label" style={{ fontSize: 8, marginBottom: 10, color: 'var(--text-faint)' }}>{ui.contactPhone}</p>
                    <input className="field" type="tel" placeholder="+33 6 00 00 00 00" value={form.tel} onChange={update('tel')} />
                  </div>

                  <div>
                    <p className="label" style={{ fontSize: 8, marginBottom: 10, color: 'var(--text-faint)' }}>{ui.contactDate}</p>
                    <input className="field" type="date" value={form.date} onChange={update('date')} style={{ colorScheme: 'dark' }} />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <p className="label" style={{ fontSize: 8, marginBottom: 10, color: 'var(--text-faint)' }}>{ui.contactService}</p>
                    <select className="field" value={form.type} onChange={update('type')} style={{ appearance: 'none', cursor: 'pointer' }}>
                      <option value="">{ui.contactChoose}</option>
                      {prestations.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <p className="label" style={{ fontSize: 8, marginBottom: 10, color: 'var(--text-faint)' }}>{ui.contactBudget}</p>
                    <select className="field" value={form.budget} onChange={update('budget')} style={{ appearance: 'none', cursor: 'pointer' }}>
                      <option value="">{ui.contactChoose}</option>
                      {budgets.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <p className="label" style={{ fontSize: 8, marginBottom: 10, color: errors.msg ? '#e06060' : 'var(--text-faint)' }}>{ui.contactMessage} *</p>
                    <textarea
                      className="field" rows={6}
                      placeholder={ui.contactPlaceholderMsg}
                      value={form.msg} onChange={update('msg')}
                      style={{ resize: 'none', borderBottomColor: errors.msg ? 'rgba(220,80,80,0.5)' : undefined }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: 38, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                  <p style={{ fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{ui.contactRequired}</p>
                  <button className="btn btn-solid" onClick={handleSubmit}>{ui.contactSubmit}</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Location band */}
      <div style={{ padding: '0 5vw 80px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          height: 200, background: 'var(--bg-alt)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.025,
            backgroundImage: 'radial-gradient(circle, var(--text) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <p className="display-italic" style={{ fontSize: 12, color: 'var(--text-faint)', marginBottom: 8 }}>{ui.contactLocationLabel}</p>
            <p className="display" style={{ fontSize: 'clamp(22px, 3vw, 34px)', color: 'var(--text-muted)', marginBottom: 8 }}>{ui.contactLocation}</p>
            <p className="label" style={{ fontSize: 9 }}>{ui.contactLocationSub}</p>
          </div>
        </div>
      </div>

    </div>
  )
}
