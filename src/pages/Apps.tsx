import { useState } from 'react'
import { AppEntry } from '../@types/CustomTypes'
import Section from '../components/Section'

interface AppsProps {
  content: {
    title: string
    description: string
    entries: AppEntry[]
  }
}

function AppCard({ app }: { app: AppEntry }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="bg-slate-200 dark:bg-slate-800 px-8 py-10 rounded-md flex flex-col">
      <div className="flex items-center mb-4">
        {!imageError ? (
          <img
            src={app.icon}
            style={{ height: 60, width: 60 }}
            alt={`${app.name} icon`}
            onError={() => setImageError(true)}
            className="rounded-xl mr-4"
          />
        ) : (
          <div
            className="bg-slate-400 dark:bg-slate-600 rounded-xl mr-4 flex items-center justify-center"
            style={{ height: 60, width: 60 }}
          >
            <span className="text-slate-600 dark:text-slate-400 text-xs">
              {app.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300 text-lg">
            {app.name}
          </h4>
          <p className="text-gray-500 text-md">{app.tagline}</p>
        </div>
      </div>
      <p className="font-normal text-gray-500 text-md grow">
        {app.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {app.links?.map((link, key) => (
          <a
            key={key}
            href={link.link}
            className="px-4 py-2 leading-none border rounded text-center font-semibold text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-600 hover:bg-slate-700 hover:text-white hover:border-transparent"
          >
            {link.text}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function Apps({ content }: AppsProps) {
  return (
    <Section id="apps" title={content.title} description={content.description}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.entries?.map((app, key) => (
          <AppCard key={key} app={app} />
        ))}
      </div>
    </Section>
  )
}
