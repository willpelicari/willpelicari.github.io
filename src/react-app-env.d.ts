/// <reference types="react-scripts" />

interface Window {
  gtag?: (...args: unknown[]) => void
  trackPageView?: (path: string, title?: string) => void
}
