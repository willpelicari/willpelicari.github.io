/*
 * Screenshot viewer. Each shot in .shots is a link to its full-size image, so
 * without this script a click simply opens the picture. With it, the picture
 * opens over the page instead: tap it to switch between fitting the screen and
 * full size (pinch-zoom works too), arrows step through the strip, and Escape,
 * the close button or a tap outside the picture closes it.
 */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.shots a.zoom'));
  if (!links.length || typeof HTMLDialogElement !== 'function') return;

  var fr = document.documentElement.lang.indexOf('fr') === 0;
  var t = fr
    ? { close: 'Fermer', prev: 'Capture précédente', next: 'Capture suivante', zoom: 'Toucher pour agrandir ou réduire' }
    : { close: 'Close', prev: 'Previous screenshot', next: 'Next screenshot', zoom: 'Tap to zoom in or out' };

  var dialog = document.createElement('dialog');
  dialog.className = 'viewer';
  dialog.innerHTML =
    '<div class="viewer-stage"><img alt=""></div>' +
    '<p class="viewer-caption"></p>' +
    '<button type="button" class="viewer-close" aria-label="' + t.close + '">×</button>' +
    '<button type="button" class="viewer-prev" aria-label="' + t.prev + '">‹</button>' +
    '<button type="button" class="viewer-next" aria-label="' + t.next + '">›</button>';
  document.body.appendChild(dialog);

  var stage = dialog.querySelector('.viewer-stage');
  var img = dialog.querySelector('img');
  var caption = dialog.querySelector('.viewer-caption');
  var index = 0;
  img.title = t.zoom;

  function show(i) {
    index = (i + links.length) % links.length;
    var link = links[index];
    var thumb = link.querySelector('img');
    dialog.classList.remove('zoomed');
    // Show the thumbnail at once, then swap in the full image when it arrives.
    img.src = thumb.currentSrc || thumb.src;
    img.alt = thumb.alt;
    var full = new Image();
    full.onload = function () { if (links[index] === link) img.src = full.src; };
    full.src = link.href;
    var text = link.parentNode.querySelector('p');
    caption.innerHTML = text ? text.innerHTML : '';
    stage.scrollTop = stage.scrollLeft = 0;
  }

  links.forEach(function (link, i) {
    link.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      show(i);
      dialog.showModal();
    });
  });

  img.addEventListener('click', function (e) {
    e.stopPropagation();
    dialog.classList.toggle('zoomed');
  });
  dialog.querySelector('.viewer-close').addEventListener('click', function () { dialog.close(); });
  dialog.querySelector('.viewer-prev').addEventListener('click', function () { show(index - 1); });
  dialog.querySelector('.viewer-next').addEventListener('click', function () { show(index + 1); });
  // A tap on the dark area around the picture closes the viewer.
  stage.addEventListener('click', function (e) { if (e.target === stage) dialog.close(); });
  dialog.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();
