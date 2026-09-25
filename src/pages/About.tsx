import { useContext } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { PortfolioContext } from '../contexts/PortfolioContext'

export default function About() {
  const content = useContext(PortfolioContext)

  if (!content.about) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-700 dark:border-slate-300" />
      </div>
    )
  }

  const { about, values } = content

  return (
    <div className="flex-1">
      <div className="px-5 sm:px-8 md:px-14 pt-20 md:pt-24 pb-16 md:pb-[84px] grid gap-14 items-end border-b-2 border-slate-700 [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
        <div className="flex flex-col gap-7">
          <span className="text-[13px] tracking-[0.08em] uppercase text-slate-600 dark:text-slate-400">
            {about.kicker}
          </span>
          <h1
            className="font-extrabold text-[clamp(44px,6vw,76px)] leading-[0.98] tracking-[-0.02em] text-slate-800 dark:text-slate-100"
            style={{ textWrap: 'balance' as any }}
          >
            {about.title}
          </h1>
          <p className="text-[17px] leading-7 max-w-[52ch] text-gray-600 dark:text-gray-400">
            {about.bio}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={content.header.buttonCv.link}
              className="px-[18px] py-3 bg-slate-800 text-white font-semibold text-[15px] hover:bg-slate-700"
            >
              {about.downloadResume}
            </a>
            <Link
              to="/experiences"
              className="px-[18px] py-3 border border-slate-400 text-gray-700 dark:text-gray-300 font-semibold text-[15px] hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              {about.seeExperience}
            </Link>
          </div>
        </div>
        <img
          src="/main-photo.jpg"
          alt={content.home.byline.name}
          className="w-full max-w-[473px] aspect-square object-cover justify-self-end"
        />
      </div>

      <div className="grid border-b-2 border-slate-700 [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
        {about.facts.map((fact, key) => (
          <div
            key={key}
            className={`px-5 sm:px-8 md:px-14 py-8 flex flex-col gap-2 ${
              key < about.facts.length - 1
                ? 'border-r-2 border-slate-300 dark:border-slate-700'
                : ''
            }`}
          >
            <span className="font-extrabold text-[44px] leading-none text-slate-800 dark:text-slate-100">
              {fact.value}
            </span>
            <span className="text-[13px] tracking-[0.08em] uppercase text-slate-600 dark:text-slate-400">
              {fact.label}
            </span>
          </div>
        ))}
      </div>

      <div className="px-5 sm:px-8 md:px-14 py-16 md:py-[84px]">
        <h2 className="font-extrabold text-[32px] tracking-[-0.015em] mb-7 text-slate-800 dark:text-slate-100">
          {about.valuesTitle}
        </h2>
        <div className="grid border-t-2 border-slate-700 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
          {values.cards.map((card, key) => (
            <div
              key={key}
              className={`py-8 flex flex-col gap-4 ${
                key < values.cards.length - 1
                  ? 'pr-8 border-r-2 border-slate-300 dark:border-slate-700'
                  : ''
              } ${key > 0 ? 'pl-8' : 'pr-8'}`}
            >
              <img
                src={card.icon}
                alt=""
                className="w-12 h-12 block dark:invert dark:brightness-0 dark:contrast-200"
              />
              <h3 className="font-bold text-[22px] text-slate-800 dark:text-slate-100">
                {card.title}
              </h3>
              <p className="text-[15.5px] leading-[26px] text-gray-600 dark:text-gray-400">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 text-white px-5 sm:px-8 md:px-14 py-14 flex flex-wrap justify-between items-center gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[13px] tracking-[0.08em] uppercase text-blue-200">
            {about.hobbyKicker}
          </span>
          <span className="font-bold text-[28px]">{about.hobbyTitle}</span>
        </div>
        <a
          href={about.hobbyLink}
          className="flex items-center gap-2 px-[18px] py-3 border border-slate-500 text-white font-semibold text-[15px] hover:bg-slate-700"
        >
          {about.hobbyLinkText} <FiArrowUpRight />
        </a>
      </div>
    </div>
  )
}
