import i18n from '../i18n'

export default function PortfolioCard({ project, onClick }) {
  const lang = i18n.language
  const title = lang === 'fr' ? project.titleFr : project.title

  return (
    <article
      onClick={() => onClick(project)}
      className="group relative overflow-hidden cursor-pointer"
      style={{
        aspectRatio: '4/3',
        backgroundColor: 'var(--color-bg-card)',
      }}
    >
      {/* Image */}
      <img
        src={project.image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        onError={e => {
          e.target.src = `https://placehold.co/800x600/0d0d18/4c54ea?text=${encodeURIComponent(title)}`
        }}
      />
      {/* Permanent gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"/>
      {/* Hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: 'rgba(76,84,234,0.5)' }}/>

      {/* Category pill */}
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-block bg-black/50 backdrop-blur-md text-white/80 text-[10px] font-mono uppercase tracking-[0.14em] px-2.5 py-1">
          {project.category}
        </span>
      </div>

      {/* Year */}
      <span className="absolute top-3 right-3 z-10 text-white/40 text-[10px] font-mono">
        {project.year}
      </span>

      {/* Bottom info */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-10">
        <h3 className="font-display font-bold text-white text-lg leading-tight mb-0.5 transition-transform duration-400 group-hover:-translate-y-1">
          {title}
        </h3>
        <p className="text-white/45 text-xs font-body truncate">{project.client}</p>
      </div>

      {/* Zoom icon on hover */}
      <div className="absolute inset-0 flex items-center justify-center z-10
        opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="w-12 h-12 bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/25
          scale-90 group-hover:scale-100 transition-transform duration-300">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </div>
      </div>
    </article>
  )
}
