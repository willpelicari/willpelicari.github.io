import { useContext, useMemo, useState } from 'react'
import { Entry, Job } from '../@types/CustomTypes'
import { PortfolioContext } from '../contexts/PortfolioContext'

type Row = { entry: Entry; job: Job; tags: string[] }

export default function Experiences() {
  const content = useContext(PortfolioContext)
  const [selected, setSelected] = useState<string[]>([])

  const rows: Row[] = useMemo(() => {
    if (!content.experiences) {
      return []
    }
    return content.experiences.entries.flatMap((entry) => {
      const jobs = entry.jobs || (entry.job ? [entry.job] : [])
      return jobs.map((job) => ({
        entry,
        job,
        tags: job.techStack.flatMap((ts) => ts.stack)
      }))
    })
  }, [content.experiences])

  const allTags = useMemo(() => {
    const counts: { [tag: string]: number } = {}
    rows.forEach((row) => {
      Array.from(new Set(row.tags)).forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    return Object.keys(counts).sort(
      (a, b) => counts[b] - counts[a] || a.localeCompare(b)
    )
  }, [rows])

  if (!content.experiencesPage) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-700 dark:border-slate-300" />
      </div>
    )
  }

  const { experiencesPage } = content
  const none = selected.length === 0
  const visibleRows = rows.filter(
    (row) => none || row.tags.some((tag) => selected.includes(tag))
  )

  function toggle(tag: string) {
    setSelected((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag]
    )
  }

  const countLabel = none
    ? `${rows.length} ${experiencesPage.rolesLabel} ${experiencesPage.countAllSuffix}`
    : `${visibleRows.length} ${experiencesPage.ofLabel} ${rows.length} ${experiencesPage.rolesLabel} ${experiencesPage.useLabel} ${selected.join(', ')}`

  return (
    <div className="flex-1">
      <div className="px-5 sm:px-8 md:px-14 pt-16 md:pt-[84px] pb-12 flex flex-wrap justify-between items-end gap-x-10 gap-y-7 border-b-2 border-slate-700">
        <div className="flex flex-col gap-5">
          <span className="text-[13px] tracking-[0.08em] uppercase text-slate-600 dark:text-slate-400">
            {experiencesPage.kicker}
          </span>
          <h1 className="font-extrabold text-[clamp(48px,6vw,72px)] leading-none tracking-[-0.02em] text-slate-800 dark:text-slate-100">
            {experiencesPage.title}
          </h1>
          <p className="text-[17px] leading-7 max-w-[50ch] text-gray-500 dark:text-gray-400">
            {experiencesPage.description}
          </p>
        </div>
        <a
          href={content.header.buttonCv.link}
          className="px-[18px] py-3 bg-slate-800 text-white font-semibold text-[15px] hover:bg-slate-700"
        >
          {experiencesPage.downloadResume}
        </a>
      </div>

      <div className="px-5 sm:px-8 md:px-14 py-7 border-b-2 border-slate-300 dark:border-slate-700 flex flex-col gap-3.5">
        <div className="flex justify-between items-baseline gap-4 flex-wrap">
          <span className="text-[13px] tracking-[0.08em] uppercase text-slate-600 dark:text-slate-400">
            {experiencesPage.toolboxLabel}
          </span>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {countLabel}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={none}
            onClick={() => setSelected([])}
            className={`text-sm px-3 py-[7px] border ${
              none
                ? 'bg-slate-800 border-slate-800 text-white'
                : 'border-slate-400 text-gray-700 dark:text-gray-300'
            }`}
          >
            {none
              ? experiencesPage.allLabel
              : `${experiencesPage.clearLabel} (${selected.length})`}
          </button>
          {allTags.map((tag) => {
            const active = selected.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={active}
                onClick={() => toggle(tag)}
                className={`text-sm px-3 py-[7px] border ${
                  active
                    ? 'bg-slate-800 border-slate-800 text-white'
                    : 'border-slate-400 text-gray-700 dark:text-gray-300'
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>

      <div className="px-5 sm:px-8 md:px-14 pb-16 md:pb-[84px]">
        {visibleRows.map((row, key) => (
          <div
            key={key}
            className="grid gap-x-10 gap-y-5 py-9 border-b-2 border-slate-300 dark:border-slate-700 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]"
          >
            <div className="flex flex-col gap-3">
              <div className="h-10 flex items-center">
                <img
                  src={row.entry.company.logo}
                  alt={row.entry.company.name}
                  className={`max-h-10 max-w-[160px] block ${
                    row.entry.company.invertInDarkMode
                      ? 'dark:invert dark:brightness-0 dark:contrast-200'
                      : ''
                  }`}
                />
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-100 text-[15px]">
                {row.entry.company.name}
              </span>
              {row.entry.thirdParty && (
                <span className="self-start px-2 py-[3px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                  {row.entry.thirdParty.name}
                </span>
              )}
            </div>
            <div className="sm:col-span-2 flex flex-col gap-3 min-w-0">
              <div className="flex justify-between items-baseline gap-2 flex-wrap">
                <h2 className="font-extrabold text-2xl tracking-[-0.01em] text-slate-800 dark:text-slate-100">
                  {row.job.title}
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {row.job.duration}
                </span>
              </div>
              <p className="text-[15.5px] leading-[26px] max-w-[68ch] text-gray-600 dark:text-gray-400">
                {row.job.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {row.tags.map((tag, tagKey) => {
                  const active = selected.includes(tag)
                  return (
                    <span
                      key={tagKey}
                      className={`text-[12.5px] px-2 py-[3px] ${
                        active
                          ? 'bg-slate-800 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {tag}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
