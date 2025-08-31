import { useState } from 'react'

interface CardProps {
  title: string
  description: string
  icon: string
}

export default function Card({ title, description, icon }: CardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="bg-slate-200 dark:bg-slate-800 px-8 py-10 rounded-md">
      {!imageError ? (
        <img
          src={icon}
          style={{ maxHeight: 60, maxWidth: 60, marginBottom: 10 }}
          alt={`${title} icon`}
          onError={() => setImageError(true)}
          className="dark:invert dark:brightness-0 dark:contrast-200"
        />
      ) : (
        <div
          className="w-15 h-15 bg-slate-400 dark:bg-slate-600 rounded flex items-center justify-center mb-2.5"
          style={{ maxHeight: 60, maxWidth: 60 }}
        >
          <span className="text-slate-600 dark:text-slate-400 text-xs">
            Icon
          </span>
        </div>
      )}
      <h4 className="font-medium text-gray-700 dark:text-gray-300 text-lg mb-4">
        {title}
      </h4>
      <p className="font-normal text-gray-500 text-md">{description}</p>
    </div>
  )
}
