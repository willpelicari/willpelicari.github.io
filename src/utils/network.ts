export function statusTagClasses(status: string): string {
  const base = 'px-2.5 py-1 text-xs font-semibold'

  switch (status) {
    case 'live':
      return `${base} bg-blue-200 text-blue-900`
    case 'open-source':
      return `${base} border border-slate-400 text-slate-700 dark:text-slate-300`
    default:
      return `${base} bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200`
  }
}
