import { useContext, useMemo, useState } from 'react'
import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi'
import { NetworkEntry } from '../@types/CustomTypes'
import { PortfolioContext } from '../contexts/PortfolioContext'
import { statusTagClasses } from '../utils/network'

type FilterKey = 'all' | 'apps' | 'websites' | 'inProgress'

function matches(entry: NetworkEntry, filter: FilterKey): boolean {
  switch (filter) {
    case 'apps':
      return entry.kind === 'app'
    case 'websites':
      return entry.kind === 'website'
    case 'inProgress':
      return entry.status === 'in-development'
    default:
      return true
  }
}

export default function Apps() {
  const content = useContext(PortfolioContext)
  const [filter, setFilter] = useState<FilterKey>('all')

  const network = useMemo(() => content.network || [], [content.network])

  const counts = useMemo(
    () => ({
      all: network.length,
      apps: network.filter((e) => matches(e, 'apps')).length,
      websites: network.filter((e) => matches(e, 'websites')).length,
      inProgress: network.filter((e) => matches(e, 'inProgress')).length
    }),
    [network]
  )

  if (!content.apps) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-700 dark:border-slate-300" />
      </div>
    )
  }

  const filtered = network.filter((e) => matches(e, filter))
  const featured = filtered.find((e) => e.featured)
  const tiles = filtered.filter((e) => !e.featured)

  const filterOptions: { key: FilterKey; label: string; count: number }[] = [
    { key: 'all', label: content.apps.filters.all, count: counts.all },
    { key: 'apps', label: content.apps.filters.apps, count: counts.apps },
    {
      key: 'websites',
      label: content.apps.filters.websites,
      count: counts.websites
    },
    {
      key: 'inProgress',
      label: content.apps.filters.inProgress,
      count: counts.inProgress
    }
  ]

  return (
    <div className="flex-1">
      <div className="px-5 sm:px-8 md:px-14 pt-16 md:pt-[84px] pb-12 flex flex-wrap justify-between items-end gap-x-10 gap-y-7">
        <div className="flex flex-col gap-5">
          <span className="text-[13px] tracking-[0.08em] uppercase text-slate-600 dark:text-slate-400">
            {content.apps.kicker}
          </span>
          <h1 className="font-extrabold text-[clamp(48px,6vw,72px)] leading-none tracking-[-0.02em] text-slate-800 dark:text-slate-100">
            {content.apps.title}
          </h1>
          <p className="text-[17px] leading-7 max-w-[46ch] text-gray-500 dark:text-gray-400">
            {content.apps.description}
          </p>
        </div>
        <div
          role="radiogroup"
          aria-label="Filter by status"
          className="flex flex-wrap border border-slate-400 text-sm"
        >
          {filterOptions.map((opt, key) => (
            <button
              key={opt.key}
              role="radio"
              aria-checked={filter === opt.key}
              onClick={() => setFilter(opt.key)}
              className={`px-3.5 py-2.5 ${key > 0 ? 'border-l border-slate-400' : ''} ${
                filter === opt.key
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              {opt.label} · {opt.count}
            </button>
          ))}
        </div>
      </div>

      {featured && (
        <a
          href={featured.link}
          className="grid border-b-2 border-slate-700 text-gray-700 dark:text-gray-300 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]"
        >
          <div className="p-10 sm:px-8 md:px-14 flex flex-col gap-5 border-r-2 border-slate-300 dark:border-slate-700">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[15px] text-slate-800 dark:text-slate-100">
                {featured.number}
              </span>
              <span className={statusTagClasses(featured.status)}>
                {featured.statusLabel}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <img
                src={featured.icon}
                alt={`${featured.name} icon`}
                className="w-16 h-16 sm:w-[72px] sm:h-[72px] block"
              />
              <div className="flex flex-col gap-1.5">
                <span className="font-extrabold text-[clamp(32px,4vw,44px)] leading-none tracking-[-0.02em] text-slate-800 dark:text-slate-100">
                  {featured.name}
                </span>
                <span className="text-base text-gray-500 dark:text-gray-400">
                  {content.apps.featuredTagline}
                </span>
              </div>
            </div>
            <p className="text-[15.5px] leading-[26px]">
              {content.apps.featuredDescription}
            </p>
            <div className="flex gap-2.5">
              <span className="px-4 py-2.5 bg-slate-800 text-white font-semibold text-sm">
                {content.home.featured.learnMore}
              </span>
              <span className="px-4 py-2.5 border border-slate-400 text-gray-700 dark:text-gray-300 font-semibold text-sm">
                {content.home.featured.support}
              </span>
            </div>
          </div>
          <div className="p-8 flex flex-col border-r-2 border-slate-300 dark:border-slate-700 text-[15px]">
            <span className="text-[13px] tracking-[0.08em] uppercase text-slate-600 dark:text-slate-400 pb-3.5">
              {content.apps.detailsLabel}
            </span>
            {content.apps.details.map((detail, key) => (
              <span
                key={key}
                className={`flex justify-between py-3 border-t border-slate-300 dark:border-slate-700 ${
                  key === content.apps.details.length - 1
                    ? 'border-b'
                    : ''
                }`}
              >
                <span className="text-gray-500 dark:text-gray-400">
                  {detail.label}
                </span>
                <span>{detail.value}</span>
              </span>
            ))}
          </div>
          <div className="bg-slate-200 dark:bg-slate-800 px-8 pt-8 flex justify-center items-start overflow-hidden h-[420px] box-border">
            <img
              src={content.apps.screenshot}
              alt={content.apps.screenshotAlt}
              className="w-[220px] block border-[6px] border-b-0 border-slate-950 rounded-t-[28px]"
            />
          </div>
        </a>
      )}

      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
        {tiles.map((app, key) => (
          <AppTile key={key} app={app} />
        ))}
        <div className="p-8 border-b-2 border-slate-300 dark:border-slate-700 flex flex-col justify-between gap-4">
          <span className="text-[13px] tracking-[0.08em] uppercase text-slate-600 dark:text-slate-400">
            {content.apps.getNotifiedLabel}
          </span>
          <span className="text-[15px] leading-[1.55]">
            {content.apps.getNotifiedText}
          </span>
          <a
            href={content.apps.getNotifiedLink}
            className="self-start px-4 py-2.5 border border-slate-400 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-slate-700 hover:text-white hover:border-slate-700"
          >
            {content.apps.getNotifiedLinkText}
          </a>
        </div>
      </div>
    </div>
  )
}

function AppTile({ app }: { app: NetworkEntry }) {
  const Icon = app.external ? FiExternalLink : FiArrowUpRight

  return (
    <a
      href={app.link}
      className="p-8 border-r-2 border-b-2 border-slate-300 dark:border-slate-700 min-h-[240px] flex flex-col justify-between gap-5 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-800"
    >
      <div className="flex justify-between">
        <span className="font-bold text-[15px] text-slate-800 dark:text-slate-100">
          {app.number}
        </span>
        <span className={statusTagClasses(app.status)}>{app.statusLabel}</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {app.icon ? (
          <img src={app.icon} alt="" className="w-12 h-12 block" />
        ) : (
          <span
            className="w-12 h-12 flex items-center justify-center font-bold text-[15px] box-border"
            style={{
              background: app.initialsBg,
              color: app.initialsFg,
              border: app.initialsBordered ? '1px solid #94a3b8' : undefined
            }}
          >
            {app.initials}
          </span>
        )}
        <span className="font-extrabold text-2xl leading-[1.1] text-slate-800 dark:text-slate-100">
          {app.name}
        </span>
        <span className="text-[14.5px] leading-[1.5] text-gray-500 dark:text-gray-400">
          {app.tileDescription || app.descriptor}
        </span>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
          {app.pathText} <Icon size={14} />
        </span>
      </div>
    </a>
  )
}

