/**
 * Builds the résumé in every language from scripts/cv/content.js:
 *
 *   public/cv/<lang>/index.html          the résumé as a web page (prints to the same layout as the PDF)
 *   public/cv/wilton-pelicari-cv-<lang>.pdf
 *   public/cv/wilton-pelicari-cv.pdf     copy of the English PDF, for links to the old file name
 *
 * public/cv/index.html (hand-written) sends visitors to the page in their browser's language.
 *
 * Usage: node scripts/cv/build.js            HTML + PDFs (needs Google Chrome installed)
 *        node scripts/cv/build.js --html     HTML only
 */
const fs = require('fs')
const os = require('os')
const path = require('path')
const { execFileSync } = require('child_process')
const { SHARED, LANGUAGES } = require('./content')

const ROOT = path.join(__dirname, '..', '..')
const OUT = path.join(ROOT, 'public', 'cv')
const SITE = 'https://www.wiltonpelicari.com'
const pdfName = (lang) => `wilton-pelicari-cv-${lang}.pdf`

const esc = (text) =>
  String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const a = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`

const bullets = (items = []) => (items.length ? `<ul>${items.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : '')
const stack = (text) => (text ? `<p class="stack">${esc(text)}</p>` : '')

function job(entry, labels) {
  const via = entry.via ? ` · ${esc(labels.via)} ${esc(entry.via)}` : ''
  const head = `<header class="job-head">
    <h3>${esc(entry.company)} <span class="via">· ${esc(entry.place)}${via}</span></h3>
    <span class="period">${esc(entry.period)}</span>
  </header>`

  let body = ''
  if (entry.projects) {
    const note = entry.note ? ` <span class="note">· ${esc(entry.note)}</span>` : ''
    body += `<p class="role">${esc(entry.title)}${note}</p>`
    body += entry.projects
      .map(
        (p) => `<div class="sub">
      <div class="sub-head"><h4>${esc(p.name)}</h4><span class="period">${esc(p.period)}</span></div>
      ${bullets(p.bullets)}${stack(p.stack)}
    </div>`
      )
      .join('')
  } else if (entry.roles) {
    body += entry.roles
      .map(
        (r) => `<div class="sub">
      <div class="sub-head"><h4>${esc(r.title)}</h4><span class="period">${esc(r.period)}</span></div>
      ${bullets(r.bullets)}${stack(r.stack)}
    </div>`
      )
      .join('')
  } else {
    body += `<p class="role">${esc(entry.title)}</p>${bullets(entry.bullets)}${stack(entry.stack)}`
  }
  return `<article class="job">${head}${body}</article>`
}

function page(c) {
  const L = c.labels
  const others = Object.values(LANGUAGES)
  const alternates = others
    .map((o) => `<link rel="alternate" hreflang="${o.lang}" href="${SITE}/cv/${o.lang}/" />`)
    .join('\n    ')
  const switcher = others
    .map((o) =>
      o.lang === c.lang
        ? `<span aria-current="page">${o.lang.toUpperCase()}</span>`
        : `<a href="../${o.lang}/" hreflang="${o.lang}" lang="${o.lang}">${o.lang.toUpperCase()}</a>`
    )
    .join('')

  const description = `${SHARED.name} — ${c.title}. ${c.summary}`

  return `<!doctype html>
<html lang="${c.locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(SHARED.name)} — ${esc(L.pageTitle)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${SITE}/cv/${c.lang}/" />
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${SITE}/cv/" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../cv.css" />
  </head>
  <body>
    <nav class="toolbar" aria-label="${esc(L.pageTitle)}">
      <a class="home" href="/">← ${esc(L.back)}</a>
      <div class="langs">${switcher}</div>
      <a class="button" href="../${pdfName(c.lang)}" download>${esc(L.download)}</a>
    </nav>

    <main class="sheet">
      <header class="masthead">
        <div>
          <h1>${esc(SHARED.name)}</h1>
          <p class="title">${esc(c.title)}</p>
        </div>
        <ul class="contact">
          <li>${esc(c.location)}</li>
          <li>${a(`mailto:${SHARED.email}`, SHARED.email)}</li>
          <li>${a(SHARED.site.href, SHARED.site.text)}</li>
          <li>${a(SHARED.linkedin.href, SHARED.linkedin.text)}</li>
          <li>${a(SHARED.github.href, SHARED.github.text)}</li>
        </ul>
      </header>

      <section>
        <h2>${esc(L.summary)}</h2>
        <p class="summary">${esc(c.summary)}</p>
      </section>

      <section>
        <h2>${esc(L.skills)}</h2>
        <dl class="skills">
          ${[...c.skills, [L.languages, c.languages.join(', ')]]
            .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
            .join('\n          ')}
        </dl>
      </section>

      <section>
        <h2>${esc(L.experience)}</h2>
        ${c.jobs.map((j) => job(j, L)).join('\n        ')}
      </section>

      <section class="keep">
        <h2>${esc(L.projects)}</h2>
        <p class="note">${esc(L.projectsNote)}</p>
        <div class="apps">
          ${c.projects
            .map(
              (p) => `<article>
            <h3>${esc(p.name)} <span class="platforms">· ${esc(p.platforms)}</span></h3>
            <p>${esc(p.text)}</p>
            <p class="url">${a(p.href, p.urlText)}</p>
          </article>`
            )
            .join('\n          ')}
        </div>
      </section>

      <section class="keep">
        <h2>${esc(L.education)}</h2>
        ${c.education
          .map(
            (e) => `<article class="edu">
          <div class="sub-head"><h3>${esc(e.title)} <span class="via">· ${esc(e.school)}</span></h3><span class="period">${esc(e.period)}</span></div>
          <p>${esc(e.text)}</p>
        </article>`
          )
          .join('')}
      </section>
    </main>
  </body>
</html>
`
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].filter(Boolean)
  return candidates.find((p) => fs.existsSync(p))
}

function printPdf(chrome, htmlFile, pdfFile) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-chrome-'))
  try {
    execFileSync(
      chrome,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-first-run',
        `--user-data-dir=${profile}`,
        '--no-pdf-header-footer',
        '--virtual-time-budget=8000',
        `--print-to-pdf=${pdfFile}`,
        `file://${htmlFile}`,
      ],
      { stdio: 'pipe' }
    )
  } finally {
    fs.rmSync(profile, { recursive: true, force: true })
  }
}

const htmlOnly = process.argv.includes('--html')
const chrome = htmlOnly ? null : findChrome()
if (!htmlOnly && !chrome) throw new Error('Google Chrome not found. Set CHROME_PATH or run with --html.')

for (const content of Object.values(LANGUAGES)) {
  const dir = path.join(OUT, content.lang)
  fs.mkdirSync(dir, { recursive: true })
  const htmlFile = path.join(dir, 'index.html')
  fs.writeFileSync(htmlFile, page(content))
  console.log(`wrote ${path.relative(ROOT, htmlFile)}`)

  if (chrome) {
    const pdfFile = path.join(OUT, pdfName(content.lang))
    printPdf(chrome, htmlFile, pdfFile)
    console.log(`wrote ${path.relative(ROOT, pdfFile)}`)
  }
}

if (chrome) {
  fs.copyFileSync(path.join(OUT, pdfName('en')), path.join(OUT, 'wilton-pelicari-cv.pdf'))
  console.log('wrote public/cv/wilton-pelicari-cv.pdf (English copy)')
}
