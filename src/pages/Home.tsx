import { useContext } from 'react'
import { FiArrowRight, FiArrowUpRight, FiExternalLink } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { NetworkEntry } from '../@types/CustomTypes'
import { PortfolioContext } from '../contexts/PortfolioContext'
import { statusTagClasses } from '../utils/network'

export default function Home() {
  const content = useContext(PortfolioContext)

  if (!content.home) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-700 dark:border-slate-300" />
      </div>
    )
  }

  const { home, network } = content

  return (
    <div className="flex-1">
      {/* Hero */}
      <div
        className="pt-16 pb-16 sm:pt-24 md:pt-[104px] md:pb-[84px] px-5 sm:px-8 md:px-14 flex flex-wrap gap-x-14 gap-y-10 items-end"
        style={{ minHeight: 'calc(100svh - var(--nav-h, 96px))' }}
      >
        <h1
          className="flex-1 basis-[560px] font-extrabold text-[clamp(44px,6.5vw,80px)] leading-[0.98] tracking-[-0.02em] text-slate-800 dark:text-slate-100"
          style={{ textWrap: 'balance' as any }}
        >
          {home.heroTitle}
        </h1>
        <div className="flex-none basis-[300px] grid grid-cols-[96px_minmax(0,1fr)] gap-5 items-end">
          <img
            src="/main-photo.jpg"
            alt={home.byline.name}
            className="w-24 h-24 object-cover block"
          />
          <div className="flex flex-col gap-1.5 text-sm leading-snug">
            <span className="font-bold text-slate-800 dark:text-slate-100">
              {home.byline.name}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {home.byline.role}
              <br />
              {home.byline.location}
            </span>
            <span className="flex gap-3.5 mt-1">
              <a
                href={home.byline.githubLink}
                className="text-slate-700 dark:text-slate-300 underline underline-offset-[3px]"
              >
                {home.byline.github}
              </a>
              <a
                href={home.byline.linkedinLink}
                className="text-slate-700 dark:text-slate-300 underline underline-offset-[3px]"
              >
                {home.byline.linkedin}
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Featured app */}
      <div className="bg-slate-900 text-white px-5 sm:px-8 md:px-14 py-16 grid gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <img
              src={home.featured.icon}
              alt=""
              className="w-14 h-14 block"
            />
            <span className="text-sm tracking-[0.08em] uppercase text-blue-200">
              {home.featured.kicker}
            </span>
          </div>
          <h2 className="font-extrabold text-[clamp(72px,11vw,128px)] leading-[0.9] tracking-[-0.04em]">
            {home.featured.name}
          </h2>
          <span className="font-bold text-4xl leading-tight text-slate-200">
            {home.featured.tagline}
          </span>
          <div className="flex flex-wrap gap-3">
            <a
              href={home.featured.learnMoreLink}
              className="flex items-center gap-2 px-[18px] py-3 bg-white text-slate-900 font-semibold text-[15px] hover:bg-blue-200"
            >
              {home.featured.learnMore} <FiArrowUpRight />
            </a>
            <a
              href={home.featured.supportLink}
              className="px-[18px] py-3 border border-slate-500 text-white font-semibold text-[15px] hover:bg-slate-700 hover:border-slate-700"
            >
              {home.featured.support}
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-end border-l-2 border-slate-700 pl-8 font-bold text-[28px] leading-[1.25]">
          {home.featured.breadcrumb.map((step, key) => {
            const isLast = key === home.featured.breadcrumb.length - 1
            const colors = [
              'text-slate-400',
              'text-slate-300',
              'text-slate-200',
              'text-blue-200'
            ]
            return (
              <span
                key={key}
                className={`py-3.5 ${
                  isLast ? '' : 'border-b-2 border-slate-700'
                } ${colors[Math.min(key, colors.length - 1)]}`}
                style={{ paddingLeft: key === 0 ? 0 : `${Math.min(key, 3) * 28}px` }}
              >
                {key > 0 && '→ '}
                {step}
              </span>
            )
          })}
        </div>
      </div>

      {/* Fact strip */}
      <div className="bg-slate-200 dark:bg-slate-800 px-5 sm:px-8 md:px-14 py-7 grid gap-x-8 gap-y-3 text-[15px] leading-[1.55] text-gray-700 dark:text-gray-300 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
        {home.facts.map((fact, key) => (
          <span key={key}>{fact}</span>
        ))}
      </div>

      {/* Network list */}
      <div className="px-5 sm:px-8 md:px-14 py-16 md:py-[84px]">
        <div className="flex justify-between items-baseline mb-7">
          <h2 className="font-extrabold text-[32px] tracking-[-0.015em] text-slate-800 dark:text-slate-100">
            {home.networkTitle}
          </h2>
          <Link
            to="/apps"
            className="flex items-center gap-1.5 text-[15px] font-bold text-slate-700 dark:text-slate-300"
          >
            {home.allApps} <FiArrowRight />
          </Link>
        </div>
        {network?.map((app, key) => (
          <NetworkRow key={key} app={app} isLast={key === network.length - 1} />
        ))}
      </div>
    </div>
  )
}

function NetworkRow({ app, isLast }: { app: NetworkEntry; isLast: boolean }) {
  const Icon = app.external ? FiExternalLink : FiArrowUpRight

  return (
    <a
      href={app.link}
      className={`flex flex-col gap-3 md:grid md:gap-6 md:items-center py-7 border-t-2 border-slate-700 ${
        isLast ? 'border-b-2' : ''
      } text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 md:[grid-template-columns:56px_minmax(0,1fr)_minmax(0,210px)_150px]`}
    >
      <span className="font-bold text-[15px] flex items-center gap-3">
        <span className="w-2.5 h-2.5 bg-slate-800 dark:bg-slate-100" />
        {app.number}
      </span>
      <span className="flex items-center flex-wrap gap-x-5 gap-y-1.5 min-w-0">
        {app.icon ? (
          <img src={app.icon} alt="" className="w-10 h-10 flex-shrink-0 block" />
        ) : (
          <span
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center font-bold text-[13px] box-border"
            style={{
              background: app.initialsBg,
              color: app.initialsFg,
              border: app.initialsBordered ? '1px solid #94a3b8' : undefined
            }}
          >
            {app.initials}
          </span>
        )}
        <span className="font-extrabold text-[clamp(24px,3vw,36px)] leading-[1.1] tracking-[-0.02em]">
          {app.name}
        </span>
        <span className="text-[15px] text-gray-500 dark:text-gray-400">
          {app.year ? `${app.year} · ${app.descriptor}` : app.descriptor}
        </span>
      </span>
      <span className="text-[15px] text-gray-700 dark:text-gray-300 break-words">
        {app.pathText}
      </span>
      <span className="flex justify-between items-center">
        <span className={statusTagClasses(app.status)}>{app.statusLabel}</span>
        <Icon size={20} />
      </span>
    </a>
  )
}
