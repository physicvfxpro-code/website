import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { PRODUCTS, SHOP_FILTERS, UI, t } from '../data/content.js'

/* ─── Payment icon (inline SVG) ─── */
const PaypalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.65h6.606c2.187 0 3.708.562 4.525 1.672.383.52.627 1.107.727 1.746.104.665.063 1.462-.127 2.37l-.012.052v.461l.36.204c.304.164.547.354.734.571.312.363.514.81.6 1.33.09.533.06 1.168-.085 1.886-.168.83-.44 1.553-.808 2.142a4.38 4.38 0 0 1-1.246 1.339 4.844 4.844 0 0 1-1.657.754c-.617.162-1.318.245-2.084.245h-.495a1.508 1.508 0 0 0-1.49 1.27l-.036.194-.607 3.845-.03.14a.16.16 0 0 1-.153.13H7.076z"/>
  </svg>
)

export default function Shop({ navigate }) {
  const { lang } = useApp()
  const ui = UI[lang]

  // ── State ──
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [filter, setFilter] = useState(SHOP_FILTERS[lang][0])
  const [detail, setDetail] = useState(null)        // product id or null
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderDone, setOrderDone] = useState(false)
  const [downloadLinks, setDownloadLinks] = useState([]) // files to download after payment

  const filters = SHOP_FILTERS[lang]

  const shown = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (filter === filters[0]) return true
      const pf = t(p.filter, lang)
      return pf === filter
    })
  }, [filter, lang, filters])

  const detailProduct = detail ? PRODUCTS.find((p) => p.id === detail) : null
  const similarProducts = useMemo(() => {
    if (!detailProduct) return []
    return PRODUCTS.filter(
      (p) => p.id !== detailProduct.id && t(p.filter, lang) === t(detailProduct.filter, lang)
    ).slice(0, 3)
  }, [detailProduct, lang])
  // If no same-filter products, show random others
  const displaySimilar = useMemo(() => {
    if (similarProducts.length > 0) return similarProducts
    if (!detailProduct) return []
    return PRODUCTS.filter((p) => p.id !== detailProduct.id).slice(0, 3)
  }, [similarProducts, detailProduct])

  // ── Cart helpers ──
  const addToCart = (item) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === item.id)
      return ex ? c.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) : [...c, { ...item, qty: 1 }]
    })
    setToast(t(item.title, lang))
    setTimeout(() => setToast(null), 2500)
  }
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id))
  const updateQty = (id, delta) => {
    setCart((c) => c.map((i) => {
      if (i.id !== id) return i
      const nq = i.qty + delta
      return nq < 1 ? i : { ...i, qty: nq }
    }))
  }
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const totalQty = cart.reduce((s, i) => s + i.qty, 0)

  // ── Download helper ──
  const triggerDownloads = (items) => {
    const links = items
      .filter((item) => item.file)
      .map((item) => ({ name: t(item.title, lang), url: item.file }))
    setDownloadLinks(links)
    // Auto-trigger first download
    links.forEach((link, i) => {
      setTimeout(() => {
        const a = document.createElement('a')
        a.href = link.url
        a.download = ''
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }, i * 600)
    })
  }

  // ── UI strings ──
  const uiShop = {
    viewDetail: lang === 'fr' ? 'Voir le détail' : 'View details',
    similar: lang === 'fr' ? 'Produits similaires' : 'Similar products',
    backToShop: lang === 'fr' ? '← Retour à la boutique' : '← Back to shop',
    included: lang === 'fr' ? 'Inclus dans ce pack' : "What's included",
    buyNow: lang === 'fr' ? 'Acheter' : 'Buy now',
    checkout: lang === 'fr' ? 'Passer commande' : 'Checkout',
    orderSuccess: lang === 'fr' ? 'Paiement réussi !' : 'Payment successful!',
    orderSuccessMsg: lang === 'fr' ? 'Vos fichiers sont prêts à télécharger.' : 'Your files are ready to download.',
    downloadBtn: lang === 'fr' ? 'Télécharger' : 'Download',
    securePayment: lang === 'fr' ? 'Paiement sécurisé via PayPal' : 'Secure payment via PayPal',
    qty: lang === 'fr' ? 'Qté' : 'Qty',
  }

  // ──────────────────────────────────────
  // PRODUCT DETAIL VIEW
  // ──────────────────────────────────────
  if (detailProduct) {
    return (
      <div className="page-enter" style={{ paddingTop: 110 }}>
        {toast && <div className="toast">{ui.addedToast} {toast}</div>}

        {/* Back + Cart */}
        <div style={{ padding: '24px 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
          <button className="btn btn-sm" onClick={() => setDetail(null)}>{uiShop.backToShop}</button>
          <button className="btn btn-sm" onClick={() => setCartOpen(true)} style={{ position: 'relative' }}>
            {ui.cartTitle}
            {totalQty > 0 && <span className="badge">{totalQty}</span>}
          </button>
        </div>

        {/* Detail grid */}
        <div style={{ padding: '60px 5vw' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, maxWidth: 1100, margin: '0 auto' }} className="grid-2col">
            {/* Image */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img src={detailProduct.img} alt={t(detailProduct.title, lang)} style={{ width: '100%', height: 420, objectFit: 'cover', filter: 'saturate(0.6) brightness(0.8)' }} />
              {detailProduct.badge && (
                <div style={{ position: 'absolute', top: 18, left: 18, fontFamily: "'MuseoSans', sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', padding: '5px 14px', background: 'var(--accent)', color: 'var(--accent-inv)' }}>
                  {t(detailProduct.badge, lang)}
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p className="label" style={{ fontSize: 9, marginBottom: 12 }}>{t(detailProduct.sub, lang)}</p>
              <h1 className="display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: 'var(--text)', lineHeight: 1, marginBottom: 20 }}>
                {t(detailProduct.title, lang)}
              </h1>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: 28 }}>
                {t(detailProduct.desc, lang)}
              </p>

              {/* Included features */}
              {detailProduct.features && (
                <div style={{ marginBottom: 32 }}>
                  <p className="label" style={{ fontSize: 9, marginBottom: 14 }}>{uiShop.included}</p>
                  {t(detailProduct.features, lang).map((f, i) => (
                    <p key={i} style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, paddingLeft: 16, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--text-faint)' }}>—</span>
                      {f}
                    </p>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 10 }}>
                <span className="display" style={{ fontSize: 36, color: 'var(--text)' }}>{detailProduct.price} €</span>
                <button className="btn btn-solid" onClick={() => addToCart(detailProduct)}>{ui.addToCart}</button>
                <button className="btn btn-sm" onClick={() => { addToCart(detailProduct); setCheckoutOpen(true) }}>{uiShop.buyNow}</button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar products */}
        {displaySimilar.length > 0 && (
          <div className="section-dark" style={{ padding: '72px 5vw' }}>
            <p className="label" style={{ marginBottom: 14, textAlign: 'center' }}>{uiShop.similar}</p>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${displaySimilar.length}, 1fr)`, gap: 2, maxWidth: 1000, margin: '24px auto 0' }} className="grid-3col">
              {displaySimilar.map((p) => (
                <div key={p.id} className="product-card" style={{ cursor: 'pointer' }} onClick={() => { setDetail(p.id); window.scrollTo({ top: 0, behavior: 'instant' }) }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                    <img src={p.img} alt={t(p.title, lang)} className="product-img" />
                  </div>
                  <div style={{ padding: '20px 20px 24px' }}>
                    <p className="label" style={{ fontSize: 9, marginBottom: 6 }}>{t(p.sub, lang)}</p>
                    <h3 className="display" style={{ fontSize: 18, color: 'var(--text)', marginBottom: 8, letterSpacing: 0 }}>{t(p.title, lang)}</h3>
                    <span className="display" style={{ fontSize: 22, color: 'var(--text)' }}>{p.price} €</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cart sidebar + Checkout */}
        {renderCart()}
        {renderCheckout()}
      </div>
    )
  }

  // ──────────────────────────────────────
  // CHECKOUT OVERLAY
  // ──────────────────────────────────────
  function renderCheckout() {
    if (!checkoutOpen) return null
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', cursor: 'pointer' }} onClick={() => { if (orderDone) { setCheckoutOpen(false); setOrderDone(false); setDownloadLinks([]) } else { setCheckoutOpen(false) } }} />
        <div className="checkout-modal" style={{ position: 'relative', zIndex: 2, background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '44px 40px', width: '90vw', maxWidth: 480, maxHeight: '90vh', overflowY: 'auto', animation: 'fadeUp 0.35s ease' }}>
          {orderDone ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ fontSize: 42, marginBottom: 18 }}>✓</p>
              <h3 className="display" style={{ fontSize: 26, color: 'var(--text)', marginBottom: 12 }}>{uiShop.orderSuccess}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 28 }}>{uiShop.orderSuccessMsg}</p>
              {downloadLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  download
                  className="btn btn-solid"
                  style={{ display: 'block', width: '100%', marginBottom: 8, textDecoration: 'none', textAlign: 'center' }}
                >
                  ⇩ {uiShop.downloadBtn} — {link.name}
                </a>
              ))}
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <h3 className="display" style={{ fontSize: 24, color: 'var(--text)' }}>{uiShop.checkout}</h3>
                <button onClick={() => setCheckoutOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 26, cursor: 'pointer' }}>×</button>
              </div>

              {/* Order summary */}
              <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                    <span>{t(item.title, lang)} × {item.qty}</span>
                    <span>{item.price * item.qty} €</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                  <span className="label" style={{ fontSize: 9 }}>{ui.cartTotal}</span>
                  <span className="display" style={{ fontSize: 24, color: 'var(--text)' }}>{total} €</span>
                </div>
              </div>

              {/* PayPal Buttons */}
              <div style={{ marginBottom: 18 }}>
                <PayPalButtons
                  style={{ layout: 'vertical', color: 'black', shape: 'rect', label: 'pay', height: 45 }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          currency_code: 'EUR',
                          value: total.toFixed(2),
                          breakdown: {
                            item_total: { currency_code: 'EUR', value: total.toFixed(2) },
                          },
                        },
                        items: cart.map((item) => ({
                          name: t(item.title, lang),
                          unit_amount: { currency_code: 'EUR', value: item.price.toFixed(2) },
                          quantity: String(item.qty),
                        })),
                      }],
                    })
                  }}
                  onApprove={async (data, actions) => {
                    const order = await actions.order.capture()
                    console.log('Payment captured:', order)
                    triggerDownloads(cart)
                    setOrderDone(true)
                    setCart([])
                  }}
                  onError={(err) => {
                    console.error('PayPal error:', err)
                    alert(lang === 'fr' ? 'Erreur de paiement. Réessayez.' : 'Payment error. Please try again.')
                  }}
                />
              </div>

              <p style={{ fontSize: 10, textAlign: 'center', color: 'var(--text-faint)', letterSpacing: '1.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <span style={{ fontSize: 14 }}>🔒</span> {uiShop.securePayment}
              </p>
            </>
          )}
        </div>
      </div>
    )
  }

  // ──────────────────────────────────────
  // CART SIDEBAR (shared)
  // ──────────────────────────────────────
  function renderCart() {
    if (!cartOpen) return null
    return (
      <div className="cart-sidebar">
        <div className="cart-backdrop" onClick={() => setCartOpen(false)} />
        <div className="cart-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <h3 className="display" style={{ fontSize: 26, color: 'var(--text)' }}>{ui.cartTitle}</h3>
            <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 26, cursor: 'pointer', lineHeight: 1 }}>×</button>
          </div>
          {cart.length === 0 ? (
            <p style={{ fontSize: 11, letterSpacing: '2px', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{ui.cartEmpty}</p>
          ) : (
            <>
              <div style={{ flex: 1, overflowY: 'auto', marginBottom: 24 }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: 14, alignItems: 'center', paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid var(--border)' }}>
                    <img src={item.img} alt="" style={{ width: 56, height: 56, objectFit: 'cover', filter: 'saturate(0.4) brightness(0.7)', flexShrink: 0, cursor: 'pointer' }} onClick={() => { setDetail(item.id); setCartOpen(false) }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, color: 'var(--text)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }} onClick={() => { setDetail(item.id); setCartOpen(false) }}>{t(item.title, lang)}</p>
                      <p className="label" style={{ fontSize: 9 }}>{item.price} €</p>
                      {/* Qty controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          style={{ width: 24, height: 24, background: 'transparent', border: '1px solid var(--border-mid)', color: 'var(--text-muted)', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .3s' }}
                        >−</button>
                        <span style={{ fontSize: 12, color: 'var(--text)', minWidth: 18, textAlign: 'center' }}>{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          style={{ width: 24, height: 24, background: 'transparent', border: '1px solid var(--border-mid)', color: 'var(--text-muted)', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .3s' }}
                        >+</button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: 'var(--text-faint)', fontSize: 20, cursor: 'pointer', transition: 'color .3s', flexShrink: 0 }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-faint)'}
                    >×</button>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
                  <span className="label" style={{ fontSize: 9 }}>{ui.cartTotal}</span>
                  <span className="display" style={{ fontSize: 28, color: 'var(--text)' }}>{total} €</span>
                </div>
                <button
                  className="btn btn-solid"
                  style={{ width: '100%' }}
                  onClick={() => { setCartOpen(false); setCheckoutOpen(true) }}
                >
                  {uiShop.checkout}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  // ──────────────────────────────────────
  // MAIN SHOP LIST
  // ──────────────────────────────────────
  return (
    <div className="page-enter" style={{ paddingTop: 110 }}>
      {toast && <div className="toast">{ui.addedToast} {toast}</div>}

      {/* Cart sidebar + Checkout */}
      {renderCart()}
      {renderCheckout()}

      {/* Header */}
      <div style={{ padding: '48px 5vw 40px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <p className="label" style={{ marginBottom: 14 }}>{ui.shopLabel}</p>
          <h1 className="display" style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--text)', lineHeight: 0.92 }}>
            {ui.shopTitle1} <em className="display-italic">{ui.shopTitle2}</em>
          </h1>
        </div>
        <button className="btn" onClick={() => setCartOpen(true)} style={{ position: 'relative', padding: '13px 30px', fontSize: 10 }}>
          {ui.cartTitle}
          {totalQty > 0 && <span className="badge">{totalQty}</span>}
        </button>
      </div>

      {/* Filters */}
      <div style={{ padding: '22px 5vw', borderBottom: '1px solid var(--border)', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              fontFamily: "'MuseoSans', sans-serif", fontWeight: 300, fontSize: 10,
              letterSpacing: '3px', textTransform: 'uppercase',
              padding: '8px 18px', background: 'transparent', cursor: 'pointer',
              border: `1px solid ${f === filter ? 'var(--border-strong)' : 'var(--border-mid)'}`,
              color: f === filter ? 'var(--text)' : 'var(--text-muted)',
              transition: 'all .3s',
            }}
          >{f}</button>
        ))}
      </div>

      {/* Products grid */}
      <div style={{ padding: '60px 5vw' }}>
        <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, maxWidth: 1200, margin: '0 auto' }}>
          {shown.map((p, i) => (
            <div
              key={p.id}
              className="product-card"
              style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', height: 240, cursor: 'pointer' }} onClick={() => { setDetail(p.id); window.scrollTo({ top: 0, behavior: 'instant' }) }}>
                <img src={p.img} alt={t(p.title, lang)} className="product-img" />
                {p.badge && (
                  <div style={{ position: 'absolute', top: 14, left: 14, fontFamily: "'MuseoSans', sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', padding: '5px 12px', background: 'var(--accent)', color: 'var(--accent-inv)' }}>
                    {t(p.badge, lang)}
                  </div>
                )}
                {/* Hover overlay */}
                <div className="product-overlay">
                  <span style={{ fontFamily: "'MuseoSans', sans-serif", fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: '#fff' }}>{uiShop.viewDetail}</span>
                </div>
              </div>
              <div style={{ padding: '24px 24px 28px' }}>
                <p className="label" style={{ fontSize: 9, marginBottom: 8 }}>{t(p.sub, lang)}</p>
                <h3 className="display" style={{ fontSize: 20, color: 'var(--text)', marginBottom: 10, letterSpacing: 0 }}>{t(p.title, lang)}</h3>
                <p style={{ fontSize: 12, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 22 }}>{t(p.desc, lang)}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <span className="display" style={{ fontSize: 24, color: 'var(--text)' }}>{p.price} €</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-sm" onClick={() => addToCart(p)}>{ui.addToCart}</button>
                    <button className="btn btn-sm" style={{ background: 'var(--accent)', color: 'var(--accent-inv)', borderColor: 'var(--accent)' }} onClick={() => { addToCart(p); setCheckoutOpen(true) }}>{uiShop.buyNow}</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guarantees */}
      <div className="section-dark" style={{ padding: '72px 5vw' }}>
        <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          {ui.guarantees.map((g, i) => (
            <div key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
              <p style={{ fontSize: 28, color: 'var(--text-faint)', marginBottom: 14 }}>{g.icon}</p>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '.5px' }}>{g.title}</p>
              <p style={{ fontSize: 12, color: 'var(--text-faint)', lineHeight: 1.65 }}>{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
