/*
 * Light/dark switch. Loaded in <head>, without defer, so a remembered choice
 * is applied before the first paint instead of flashing the other theme.
 * With no choice stored the page follows the system, as it always has; the
 * button stores an explicit "light" or "dark" from then on. The button is
 * added by this script, so without JavaScript there is simply no switch.
 */
(function () {
  var KEY = 'cataloc-theme';
  var root = document.documentElement;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  var saved = stored();
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  function isDark() {
    var forced = root.getAttribute('data-theme');
    if (forced) return forced === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  var fr = root.lang.indexOf('fr') === 0;
  var labels = fr
    ? { dark: 'Passer au thème sombre', light: 'Passer au thème clair' }
    : { dark: 'Switch to dark theme', light: 'Switch to light theme' };

  function label(button) {
    var text = isDark() ? labels.light : labels.dark;
    button.setAttribute('aria-label', text);
    button.title = text;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('header.top nav');
    if (!nav) return;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.innerHTML =
      '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
      '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    label(button);
    button.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label(button);
    });
    var lang = nav.querySelector('.lang');
    nav.insertBefore(button, lang);
    // Keep the label right if the system theme changes while no choice is stored.
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      if (mq.addEventListener) mq.addEventListener('change', function () { label(button); });
    }
  });
})();
