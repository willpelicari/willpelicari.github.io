import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import './@types/CustomTypes'
import { DefaultPortfolio, Portfolio } from './@types/CustomTypes'
import './App.css'
import { PortfolioContext } from './contexts/PortfolioContext'
import { ThemeProvider } from './contexts/ThemeContext'
import './i18n/config'
import About from './pages/About'
import Apps from './pages/Apps'
import Experiences from './pages/Experiences'
import Footer from './pages/Footer'
import Header from './pages/Header'
import Home from './pages/Home'

const CONTENT_VERSION = '2026-10-22-public-beta'

function fetchPortfolio(language: string): Promise<Portfolio> {
  const url = `./data/portfolio-${language}.json?v=${CONTENT_VERSION}`

  return fetch(url, { cache: 'no-store' }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  })
}

const PAGE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/apps': 'Apps',
  '/about': 'About',
  '/experiences': 'Experiences',
}

function PageViewTracker() {
  const location = useLocation()
  const i18n = useTranslation()[1]

  useEffect(() => {
    const title = PAGE_TITLES[location.pathname] ?? location.pathname
    window.trackPageView?.(location.pathname, `${title} | Wilton Pelicari`)
  }, [location.pathname])

  useEffect(() => {
    window.gtag?.('set', 'user_properties', { site_language: i18n.language })
  }, [i18n.language])

  return null
}

function App() {
  const [content, setContent] = useState<Portfolio>(DefaultPortfolio)
  const i18n = useTranslation()[1]

  useEffect(() => {
    fetchPortfolio(i18n.language)
      .then((result) => {
        setContent(result)
      })
      .catch((error) => {
        console.error('Error loading portfolio data:', error)
        // Fallback to English if the requested language fails
        if (i18n.language !== 'en') {
          fetchPortfolio('en')
            .then((result) => {
              setContent(result)
            })
            .catch((fallbackError) => {
              console.error('Error loading fallback data:', fallbackError)
            })
        }
      })
  }, [i18n.language])

  return (
    <ThemeProvider>
      <PortfolioContext.Provider value={content}>
        <HashRouter>
          <PageViewTracker />
          <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-900">
            <Header />
            <main className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/apps" element={<Apps />} />
                <Route path="/about" element={<About />} />
                <Route path="/experiences" element={<Experiences />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </PortfolioContext.Provider>
    </ThemeProvider>
  )
}

export default App
