import { useContext, useState } from 'react'
import { FilterContext } from '../contexts/FilterContext'
import { PortfolioContext } from '../contexts/PortfolioContext'
import { Career } from './Career'
import Greeting from './Greeting'
import { Toolbox } from './Toolbox'
import Values from './Values'

export default function Home() {
  const content = useContext(PortfolioContext)
  const [filteredTags, setTags] = useState<string[]>([])

  // Check if content is loaded
  if (!content || !content.header) {
    return (
      <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-700 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Loading portfolio...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-900">
      {content.greeting && (
        <Greeting
          mainPhotoPath={content.greeting.picture}
          greetingMessage={content.greeting.message}
        />
      )}
      {content.values && <Values content={content.values} />}
      <FilterContext.Provider value={{ filteredTags, setTags }}>
        {content.toolbox && (
          <Toolbox
            title={content.toolbox.title}
            description={content.toolbox.description}
            experiences={content.experiences}
          />
        )}
        {content.experiences && <Career experiences={content.experiences} />}
      </FilterContext.Provider>
    </div>
  )
}
