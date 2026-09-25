import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { Themes } from '../@types/CustomTypes'
import { PortfolioContext } from '../contexts/PortfolioContext'
import { ThemeContext } from '../contexts/ThemeContext'

const LANGUAGES: { code: string; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'pt', label: 'PT' }
]

export default function Header() {
  const i18n = useTranslation()[1]
  const { theme, setTheme } = useContext(ThemeContext)
  const content = useContext(PortfolioContext)

  function setNewTheme() {
    setTheme(theme === Themes.dark ? Themes.light : Themes.dark)
  }

  if (!content.header) {
    return null
  }

  const [firstLogoPart, ...restLogoParts] = content.header.logo.split(' ')

  return (
    <nav className="bg-slate-950 text-white flex items-center flex-wrap gap-x-7 gap-y-3 px-5 py-4 sm:px-8 md:px-14">
      <NavLink
        to="/"
        className="text-xl tracking-[-0.01em] mr-auto text-white"
      >
        <b>{firstLogoPart}</b> {restLogoParts.join(' ')}
      </NavLink>
      {content.header.nav?.map((item, key) => (
        <NavLink
          key={key}
          to={item.path}
          className={({ isActive }) =>
            `text-base pb-1 ${
              isActive
                ? 'text-white border-b-2 border-blue-200'
                : 'text-blue-200 hover:text-white border-b-2 border-transparent'
            }`
          }
        >
          {item.text}
        </NavLink>
      ))}
      <div className="flex gap-1 text-sm">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`px-2 py-1 ${
              i18n.language === lang.code
                ? 'bg-slate-700 text-white'
                : 'text-blue-200 hover:text-white'
            }`}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </button>
        ))}
      </div>
      <button
        className="p-1.5 text-blue-200 hover:text-white"
        onClick={setNewTheme}
        aria-label={
          theme === Themes.light ? 'Switch to dark mode' : 'Switch to light mode'
        }
      >
        {theme === Themes.light ? (
          <BsMoonStarsFill size={16} />
        ) : (
          <BsFillSunFill size={16} />
        )}
      </button>
      {content.header.buttonCv && (
        <a
          className="px-4 py-2.5 border border-white text-white font-semibold text-sm hover:bg-white hover:text-gray-900"
          href={content.header.buttonCv.link}
        >
          {content.header.buttonCv.text}
        </a>
      )}
    </nav>
  )
}
