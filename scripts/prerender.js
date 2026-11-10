/**
 * Runs after `react-scripts build` (npm's postbuild hook). Writes the English portfolio into build/index.html as
 * plain HTML, so a crawler that doesn't run JavaScript still finds the name, the apps and the experience, with
 * real links to /cataloc/ and /mapadoboi/. React's createRoot replaces it all on the first render.
 *
 * Plain Node, no dependencies: it reads the same public/data/portfolio-en.json the app fetches, so the text
 * stays in one place.
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const INDEX = path.join(ROOT, 'build', 'index.html')
const SITE = 'https://www.wiltonpelicari.com'

const content = JSON.parse(fs.readFileSync(path.join(ROOT, 'public', 'data', 'portfolio-en.json'), 'utf8'))

const esc = (text) =>
  String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const link = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`

const { home, about, apps, network = [], experiences, footer } = content
const byline = home.byline

const projects = network
  .map((entry) => {
    const featured = apps?.featuredProjects?.[entry.number]
    const description = featured?.description || entry.tileDescription || entry.descriptor || ''
    return `<li><h3>${link(entry.link, entry.name)}</h3><p>${esc(description)}</p></li>`
  })
  .join('')

const jobs = (experiences?.entries ?? [])
  .flatMap((entry) =>
    (entry.jobs ?? []).map(
      (job) => `<li><b>${esc(job.title)}</b>, ${esc(entry.company?.name)} · ${esc(job.duration)}</li>`
    )
  )
  .join('')

const body = `<main style="max-width:720px;margin:0 auto;padding:48px 20px;font-family:Archivo,system-ui,sans-serif;line-height:1.5">
<header><h1>${esc(byline.name)} — ${esc(byline.role)}</h1><p>${esc(byline.location)} · ${link(byline.githubLink, byline.github)} · ${link(byline.linkedinLink, byline.linkedin)} · ${link(content.header.buttonCv.link, content.header.buttonCv.text)}</p></header>
<p>${esc(home.heroTitle)}</p>
<section><h2>${esc(apps?.title)}</h2><ul>${projects}</ul></section>
<section><h2>${esc(about.title)}</h2><p>${esc(about.bio)}</p></section>
<section><h2>${esc(content.experiencesPage?.title)}</h2><ul>${jobs}</ul></section>
<footer><p>${esc(footer.copyright)}</p></footer>
</main>`

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: byline.name,
  jobTitle: 'Senior Full Stack Developer',
  url: `${SITE}/`,
  image: `${SITE}/main-photo.jpg`,
  address: { '@type': 'PostalAddress', addressLocality: 'Québec City', addressRegion: 'QC', addressCountry: 'CA' },
  sameAs: [byline.githubLink, byline.linkedinLink],
}
const jsonLd = `<script type="application/ld+json">${JSON.stringify(person).replace(/</g, '\\u003c')}</script>`

let html = fs.readFileSync(INDEX, 'utf8')
if (!html.includes('<div id="root"></div>')) throw new Error('build/index.html: empty <div id="root"></div> not found')
html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`).replace('</head>', `${jsonLd}</head>`)
fs.writeFileSync(INDEX, html)
console.log(`Prerendered ${network.length} projects and the experience list into build/index.html`)
