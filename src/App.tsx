import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HashRouter, Route, Routes } from 'react-router-dom'
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

function App() {
  const [content, setContent] = useState<Portfolio>(DefaultPortfolio)
  const i18n = useTranslation()[1]

  useEffect(() => {
    fetch('./data/portfolio-' + i18n.language + '.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((result) => {
        setContent(result)
      })
      .catch((error) => {
        console.error('Error loading portfolio data:', error)
        // Fallback to English if the requested language fails
        if (i18n.language !== 'en') {
          fetch('./data/portfolio-en.json')
            .then((res) => res.json())
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
