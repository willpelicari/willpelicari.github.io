import { useContext } from 'react'
import { PortfolioContext } from '../contexts/PortfolioContext'

export default function Footer() {
  const content = useContext(PortfolioContext)

  if (!content.footer) {
    return null
  }

  return (
    <footer className="mt-auto bg-slate-950 text-slate-400 text-[13px] flex flex-wrap justify-between gap-x-6 gap-y-3 px-5 py-6 sm:px-8 md:px-14">
      <span>{content.footer.copyright}</span>
      <span className="flex gap-6">
        <a href={content.footer.github} className="text-blue-200">
          GitHub
        </a>
        <a href={content.footer.linkedin} className="text-blue-200">
          LinkedIn
        </a>
      </span>
    </footer>
  )
}
