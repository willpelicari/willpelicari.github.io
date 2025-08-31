import { useEffect, useState } from 'react'
import BasicSection from '../components/BasicSection'

interface GreetingProps {
  greetingMessage: string
  mainPhotoPath: string
}

export default function Greeting({
  greetingMessage,
  mainPhotoPath
}: GreetingProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentImagePath, setCurrentImagePath] = useState(mainPhotoPath)

  const handleImageError = () => {
    if (currentImagePath === mainPhotoPath) {
      // Try with relative path if absolute path fails
      setCurrentImagePath('./main-photo.jpg')
    } else {
      setImageError(true)
    }
  }

  useEffect(() => {
    setCurrentImagePath(mainPhotoPath)
    setImageError(false)
    setImageLoaded(false)
  }, [mainPhotoPath])

  return (
    <BasicSection id="greetings">
      <div className="container max-w-screen-xl mx-auto px-4 mt-16">
        <header className="flex flex-col items-center lg:flex-row justify-between lg:mb-20">
          <div className="text-center lg:text-right lg:mr-10 mb-20 lg:mb-0">
            <h1 className="font-bold text-gray-700 dark:text-gray-300 text-4xl md:text-5xl xl:text-6xl mb-10">
              {greetingMessage}
            </h1>
          </div>
          <div className="mx-auto lg:mx-0">
            {!imageError ? (
              <img
                alt="Wilton Pelicari"
                className={`rounded-lg transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                src={currentImagePath}
                style={{ width: 473 }}
                onLoad={() => setImageLoaded(true)}
                onError={handleImageError}
              />
            ) : (
              <div
                className="rounded-lg bg-slate-300 dark:bg-slate-700 flex items-center justify-center"
                style={{ width: 473, height: 473 }}
              >
                <span className="text-slate-600 dark:text-slate-400 text-lg">
                  Photo not available
                </span>
              </div>
            )}
            {!imageLoaded && !imageError && (
              <div
                className="rounded-lg bg-slate-300 dark:bg-slate-700 flex items-center justify-center animate-pulse"
                style={{ width: 473, height: 473 }}
              >
                <span className="text-slate-600 dark:text-slate-400 text-lg">
                  Loading photo...
                </span>
              </div>
            )}
          </div>
        </header>
      </div>
    </BasicSection>
  )
}
