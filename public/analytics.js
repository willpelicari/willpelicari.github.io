// Google Analytics 4, shared by the portfolio SPA and the static Cataloc pages.
// Replace GA_ID with the Measurement ID from GA → Admin → Data streams → Web.
;(function () {
  var GA_ID = 'G-0WP0NW5YH5'

  var host = window.location.hostname
  var isLocal = host === 'localhost' || host === '127.0.0.1' || host === '[::1]'
  var debug = /[?&]ga_debug\b/.test(window.location.search)

  // Without a real ID, or on a dev machine, keep a no-op gtag so callers never break.
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }
  if (/X{6}/.test(GA_ID) || (isLocal && !debug)) {
    window.gtag = function () {}
    return
  }

  var s = document.createElement('script')
  s.async = true
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID
  document.head.appendChild(s)

  // The SPA uses hash routes (/#/apps), which GA would collapse into "/".
  // Report them as real paths and send page views ourselves.
  var isSpa = window.location.pathname === '/' || window.location.pathname === '/index.html'

  gtag('js', new Date())
  gtag('config', GA_ID, {
    send_page_view: !isSpa,
    debug_mode: debug || undefined,
  })
  gtag('set', 'user_properties', {
    preferred_language: (navigator.language || '').toLowerCase(),
    color_scheme:
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
  })

  // `set` makes later events (scrolls, outbound clicks, our own) carry the route too.
  window.trackPageView = function (path, title) {
    var page = {
      page_location: window.location.origin + path + window.location.search,
      page_path: path,
      page_title: title || document.title,
    }
    gtag('set', page)
    gtag('event', 'page_view', page)
  }

  // Named events for the clicks worth knowing about. Outbound links and file
  // downloads are also captured by GA's enhanced measurement; these add context.
  document.addEventListener(
    'click',
    function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null
      if (!a) return
      var href = a.href
      var label = (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 100)
      var from = window.location.pathname + window.location.hash

      if (/apps\.apple\.com|testflight\.apple\.com/.test(href)) {
        var app = (href.match(/\/app\/([^/]+)\//) || [])[1] || 'testflight'
        gtag('event', 'app_store_click', { app_name: app, link_url: href, link_text: label, from_page: from })
      } else if (/\.pdf(\?|#|$)/i.test(href)) {
        gtag('event', 'cv_download', { link_url: href, from_page: from })
      } else if (href.indexOf('mailto:') === 0) {
        gtag('event', 'contact_click', { method: 'email', link_text: label, from_page: from })
      } else if (/linkedin\.com|github\.com/.test(href)) {
        gtag('event', 'social_click', {
          network: /linkedin/.test(href) ? 'linkedin' : 'github',
          link_url: href,
          from_page: from,
        })
      }
    },
    true
  )
})()
