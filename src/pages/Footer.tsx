import { useContext, useState } from 'react'
import { PortfolioContext } from '../contexts/PortfolioContext'

export default function Footer() {
  const content = useContext(PortfolioContext)
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

  return (
    <footer className="bottom-0 left-0 z-20 w-full p-4 bg-white dark:bg-black text-black dark:text-white border-t border-gray-100 dark:border-gray-900 shadow">
      <div className="flex justify-between items-center">
        <div>
          <span className="align-bottom">{content.footer.message}</span>
        </div>
        <div className="flex items-center">
          {content.footer.socialMedia.map((social, key) => (
            <a
              key={key}
              target="_blank"
              rel="noreferrer"
              href={social.link}
              className="p-0.5"
            >
              {!imageErrors[key] ? (
                <img
                  src={social.icon}
                  alt="social icon"
                  className={`w-10 h-10 ${
                    social.invertInDarkMode
                      ? 'dark:invert dark:brightness-0 dark:contrast-200'
                      : ''
                  }`}
                  onError={() =>
                    setImageErrors((prev) => ({ ...prev, [key]: true }))
                  }
                />
              ) : (
                <div className="w-10 h-10 bg-slate-400 dark:bg-slate-600 rounded flex items-center justify-center">
                  <span className="text-slate-600 dark:text-slate-400 text-xs">
                    Icon
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
