import { useApp } from '../context/AppContext.jsx'

const PRIVACY = {
  fr: {
    title: 'Politique de confidentialité',
    lastUpdate: 'Dernière mise à jour : janvier 2025',
    sections: [
      {
        heading: '1. Collecte des données',
        text: "Physic.VFX collecte uniquement les données personnelles que vous fournissez volontairement via le formulaire de contact (prénom, nom, email, téléphone, message) et lors de la passation d'une commande sur la boutique (informations de facturation). Aucune donnée n'est collectée à votre insu.",
      },
      {
        heading: '2. Utilisation des données',
        text: "Les données collectées sont utilisées exclusivement pour :\n• Répondre à vos demandes de contact\n• Traiter vos commandes\n• Vous envoyer les produits numériques achetés\n• Améliorer nos services\n\nVos données ne sont jamais vendues, louées ou partagées avec des tiers à des fins commerciales.",
      },
      {
        heading: '3. Cookies',
        text: "Le site utilise le stockage local (localStorage) pour mémoriser vos préférences de langue et de thème. Aucun cookie de tracking ou publicitaire n'est utilisé.",
      },
      {
        heading: '4. Paiement',
        text: "Les paiements sont traités de manière sécurisée via des prestataires tiers (Stripe pour les paiements par carte bancaire, PayPal pour les paiements PayPal). Physic.VFX ne stocke jamais vos informations bancaires. Toutes les transactions sont chiffrées via SSL/TLS.",
      },
      {
        heading: '5. Conservation des données',
        text: "Vos données personnelles sont conservées pendant la durée nécessaire au traitement de votre demande et conformément aux obligations légales en vigueur. Vous pouvez demander la suppression de vos données à tout moment.",
      },
      {
        heading: '6. Vos droits',
        text: "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :\n• Droit d'accès à vos données\n• Droit de rectification\n• Droit à l'effacement\n• Droit à la portabilité\n• Droit d'opposition\n\nPour exercer ces droits, contactez-nous à : contact@physic-vfx.com",
      },
      {
        heading: '7. Sécurité',
        text: "Physic.VFX met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.",
      },
      {
        heading: '8. Contact',
        text: "Pour toute question relative à cette politique de confidentialité, vous pouvez nous contacter à :\nEmail : contact@physic-vfx.com",
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    lastUpdate: 'Last updated: January 2025',
    sections: [
      {
        heading: '1. Data collection',
        text: 'Physic.VFX only collects personal data that you voluntarily provide through the contact form (first name, last name, email, phone, message) and when placing an order in the shop (billing information). No data is collected without your knowledge.',
      },
      {
        heading: '2. Use of data',
        text: "The collected data is used exclusively to:\n• Respond to your contact requests\n• Process your orders\n• Send you purchased digital products\n• Improve our services\n\nYour data is never sold, rented or shared with third parties for commercial purposes.",
      },
      {
        heading: '3. Cookies',
        text: 'The site uses local storage (localStorage) to remember your language and theme preferences. No tracking or advertising cookies are used.',
      },
      {
        heading: '4. Payment',
        text: 'Payments are processed securely through third-party providers (Stripe for credit card payments, PayPal for PayPal payments). Physic.VFX never stores your banking information. All transactions are encrypted via SSL/TLS.',
      },
      {
        heading: '5. Data retention',
        text: 'Your personal data is retained for the duration necessary to process your request and in accordance with applicable legal obligations. You can request the deletion of your data at any time.',
      },
      {
        heading: '6. Your rights',
        text: "Under the General Data Protection Regulation (GDPR), you have the following rights:\n• Right of access to your data\n• Right to rectification\n• Right to erasure\n• Right to data portability\n• Right to object\n\nTo exercise these rights, contact us at: contact@physic-vfx.com",
      },
      {
        heading: '7. Security',
        text: 'Physic.VFX implements appropriate technical and organizational measures to protect your personal data against unauthorized access, modification, disclosure or destruction.',
      },
      {
        heading: '8. Contact',
        text: 'For any questions regarding this privacy policy, you can contact us at:\nEmail: contact@physic-vfx.com',
      },
    ],
  },
}

export default function Privacy() {
  const { lang } = useApp()
  const data = PRIVACY[lang]

  return (
    <div className="page-enter" style={{ paddingTop: 110 }}>
      <div style={{ padding: '48px 5vw 40px', borderBottom: '1px solid var(--border)' }}>
        <p className="label" style={{ marginBottom: 14 }}>{data.lastUpdate}</p>
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
