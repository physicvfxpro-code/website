import { useApp } from '../context/AppContext.jsx'
import { UI } from '../data/content.js'

const LEGAL = {
  fr: {
    title: 'Mentions légales',
    sections: [
      {
        heading: '1. Éditeur du site',
        text: `Le site physic-vfx.com est édité par Khylian, auto-entrepreneur.\n\nActivité : Production de contenu vidéo automobile\nEmail : contact@physic-vfx.com\nPays : France`,
      },
      {
        heading: '2. Hébergement',
        text: 'Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.',
      },
      {
        heading: '3. Propriété intellectuelle',
        text: "L'ensemble du contenu de ce site (textes, images, vidéos, logos, éléments graphiques) est la propriété exclusive de Physic.VFX / Khylian, sauf mention contraire. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie du contenu du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de Physic.VFX.",
      },
      {
        heading: '4. Limitation de responsabilité',
        text: "Physic.VFX s'efforce de fournir des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes ou des carences dans la mise à jour. L'utilisateur est seul responsable de l'utilisation des informations mises à sa disposition sur ce site.",
      },
      {
        heading: '5. Liens hypertextes',
        text: "Le site peut contenir des liens vers d'autres sites web. Physic.VFX n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.",
      },
      {
        heading: '6. Droit applicable',
        text: "Tout litige en relation avec l'utilisation du site physic-vfx.com est soumis au droit français.",
      },
    ],
  },
  en: {
    title: 'Legal Notice',
    sections: [
      {
        heading: '1. Site publisher',
        text: `The website physic-vfx.com is published by Khylian, self-employed.\n\nActivity: Automotive video content production\nEmail: contact@physic-vfx.com\nCountry: France`,
      },
      {
        heading: '2. Hosting',
        text: 'The site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, United States.',
      },
      {
        heading: '3. Intellectual property',
        text: 'All content on this website (texts, images, videos, logos, graphic elements) is the exclusive property of Physic.VFX / Khylian, unless otherwise stated. Any reproduction, representation, modification, publication or adaptation of all or part of the site content, by any means or process, is prohibited without prior written authorization from Physic.VFX.',
      },
      {
        heading: '4. Limitation of liability',
        text: 'Physic.VFX strives to provide information as accurate as possible. However, it cannot be held responsible for omissions, inaccuracies or deficiencies in updates. The user is solely responsible for the use of information made available on this site.',
      },
      {
        heading: '5. Hyperlinks',
        text: 'The site may contain links to other websites. Physic.VFX has no control over these sites and disclaims any responsibility for their content.',
      },
      {
        heading: '6. Applicable law',
        text: 'Any dispute relating to the use of the physic-vfx.com website is subject to French law.',
      },
    ],
  },
}

export default function Legal() {
  const { lang } = useApp()
  const data = LEGAL[lang]

  return (
    <div className="page-enter" style={{ paddingTop: 110 }}>
      <div style={{ padding: '48px 5vw 40px', borderBottom: '1px solid var(--border)' }}>
        <p className="label" style={{ marginBottom: 14 }}>{lang === 'fr' ? 'Informations légales' : 'Legal information'}</p>
        <h1 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text)', lineHeight: 0.95 }}>
          {data.title}
        </h1>
      </div>
      <div style={{ padding: '60px 5vw', maxWidth: 800, margin: '0 auto' }}>
        {data.sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 48 }}>
            <h2 className="display" style={{ fontSize: 20, color: 'var(--text)', marginBottom: 16, letterSpacing: 0 }}>{s.heading}</h2>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
