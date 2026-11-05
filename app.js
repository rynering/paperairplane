'use strict';

// Each preview and embedded lesson uses the same video, linked by the creator
// on the corresponding Fold 'N Fly design page.
const planes = [
  {
    "id": "basic-dart",
    "name": "Basic Dart",
    "tag": "A GREAT FIRST PLANE",
    "desc": "A familiar pointed nose and straight wings. Start here.",
    "level": "Easy",
    "videoId": "gZQI1Z_viNg",
    "source": 1,
    "type": "Distance"
  },
  {
    "id": "the-basic",
    "name": "The Basic",
    "tag": "JUST A FEW FOLDS",
    "desc": "A simple first build with a gentle launch.",
    "level": "Easy",
    "videoId": "u-HKNkao6i0",
    "source": 0,
    "type": "Beginner"
  },
  {
    "id": "the-stable",
    "name": "The Stable",
    "tag": "A LITTLE LOCKING FOLD",
    "desc": "A folded nose and wide wings to try next.",
    "level": "Easy",
    "videoId": "QbDUiGmxQIQ",
    "source": 2,
    "type": "Glide"
  },
  {
    "id": "the-buzz",
    "name": "The Buzz",
    "tag": "TRY A NEW SHAPE",
    "desc": "A short body and broad wings with a different look.",
    "level": "Intermediate",
    "videoId": "WB6NornyZc4",
    "source": 3,
    "type": "Explore"
  },
  {
    "id": "hunting-flight",
    "name": "Hunting Flight",
    "tag": "TURN UP THE WINGTIPS",
    "desc": "A weighty folded nose and small upturned wingtips.",
    "level": "Intermediate",
    "videoId": "9BmrfQqrXkg",
    "source": 6,
    "type": "Distance"
  },
  {
    "id": "the-sprinter",
    "name": "The Sprinter",
    "tag": "A NEW FOLDING CHALLENGE",
    "desc": "A tall tail fin. Take your time with this one.",
    "level": "Intermediate",
    "videoId": "5puhYt-KeBU",
    "source": 4,
    "type": "Explore"
  }
];
const storageKey = 'fold-and-fly-video-completed-v1';
let completed = [];
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(saved)) completed = saved.filter(id => planes.some(p => p.id === id));
} catch { /* The guides also work when browser storage is unavailable. */ }
let filter = 'all';
let active = null;
const watchUrl = p => `https://www.youtube.com/watch?v=${p.videoId}`;
const sourceUrl = p => `https://www.foldnfly.com/${p.source}v.html`;
const thumbnail = p => `https://i.ytimg.com/vi/${p.videoId}/hqdefault.jpg`;
const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor"/></svg>';

function preview(p, hero = false) {
  return `<div class="video-preview ${hero ? 'hero-preview' : ''}">
    <img src="${thumbnail(p)}" alt="Preview of the ${p.name} video tutorial" ${hero ? 'fetchpriority="high"' : 'loading="lazy"'} width="480" height="360">
    <span class="play-badge" aria-hidden="true">${playIcon}</span>
    <span class="preview-label">${hero ? 'START HERE · BASIC DART' : 'WATCH & FOLD'}</span>
  </div>`;
}

function renderCards() {
  document.getElementById('cards').innerHTML = planes
    .filter(p => filter === 'all' || p.level === filter)
    .map(p => `<article class="aircraft">
      <a class="card-link" href="#plane/${p.id}" aria-label="Watch the ${p.name} folding tutorial">
        ${preview(p)}
        <div class="card-copy">
          <div class="card-heading"><h3>${p.name}</h3><span aria-hidden="true">↗</span></div>
          <p>${p.desc}</p>
          <div class="card-meta">
            <span class="difficulty ${p.level.toLowerCase()}">${p.level === 'Easy' ? '●' : '◐'} ${p.level}</span>
            <span>Video guide</span>
            ${completed.includes(p.id) ? '<span class="folded-label">✓ Folded</span>' : ''}
          </div>
        </div>
      </a>
    </article>`).join('');
}

document.getElementById('hero-video').innerHTML = `<a href="#plane/basic-dart" aria-label="Start folding the Basic Dart">${preview(planes[0], true)}<span class="hero-video-caption">Your first flight starts here. <span aria-hidden="true">↗</span></span></a>`;
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(other => {
      other.classList.toggle('active', other === button);
      other.setAttribute('aria-pressed', String(other === button));
    });
    renderCards();
  });
});

function embedUrl(p) {
  const url = new URL(`https://www.youtube-nocookie.com/embed/${p.videoId}`);
  url.searchParams.set('playsinline', '1');
  url.searchParams.set('rel', '0');
  // Send the actual hosting origin, together with a normal referrer, so
  // YouTube can identify the embedding site (avoids player error 153).
  if (location.protocol === 'https:' || location.protocol === 'http:') {
    url.searchParams.set('origin', location.origin);
  }
  return url.href;
}

function renderManual() {
  const p = active;
  document.getElementById('manual').innerHTML = `
    <a class="back" href="#fleet">← Choose another plane</a>
    <div class="manual-heading">
      <div><div class="eyebrow">${p.tag}</div><h1>${p.name}</h1>
      <p>${p.desc} <span class="difficulty ${p.level.toLowerCase()}">${p.level}</span></p></div>
      <a class="secondary youtube-link" href="${watchUrl(p)}" target="_blank" rel="noopener noreferrer">Open in YouTube ↗</a>
    </div>
    <div class="manual-prep"><strong>Get ready:</strong> One fresh sheet of A4 or US Letter printer paper and a flat table. Put your paper the same way round as the paper in the video.</div>
    <div class="video-layout">
      <section class="video-main" aria-label="${p.name} video instructions">
        <div class="video-frame">
          <iframe id="folding-video" src="${embedUrl(p)}" title="How to fold ${p.name} — Fold 'N Fly"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowfullscreen></iframe>
        </div>
        <div class="video-credit"><span>Tutorial by <a href="${sourceUrl(p)}" target="_blank" rel="noopener noreferrer">Fold ’N Fly ↗</a></span><button class="secondary" id="replay">Replay from the start</button></div>
        <p class="video-fallback">Video not playing? <a href="${watchUrl(p)}" target="_blank" rel="noopener noreferrer">Watch this same tutorial on YouTube ↗</a></p>
      </section>
      <aside class="watch-help" aria-labelledby="watch-heading">
        <div class="eyebrow">GO AT YOUR OWN PACE</div><h2 id="watch-heading">Watch. Pause. Fold.</h2>
        <ol>
          <li><strong>Watch one fold.</strong><span>Press play and see where the hands move the paper.</span></li>
          <li><strong>Pause and copy it.</strong><span>Pause the video. Turn and fold your paper to match what you see.</span></li>
          <li><strong>Ready? Keep going.</strong><span>Press play for the next fold. Replay any bit as often as you like.</span></li>
        </ol>
        <p class="speed-tip">Too fast? Open the video’s settings ⚙ and choose a slower playback speed, such as 0.75×.</p>
        <button class="primary" id="mark-folded" aria-pressed="${completed.includes(p.id)}">${completed.includes(p.id) ? '✓ I made this plane!' : 'I made this plane!'} <span aria-hidden="true">✓</span></button>
        <p id="fold-status" role="status">${completed.includes(p.id) ? 'Saved! Ready for a test flight?' : 'Finished folding? Mark your plane here.'}</p>
      </aside>
    </div>
    <div class="manual-bottom"><span>Try a gentle first launch in an open space.</span><a href="#flight-school">Help my plane fly better ↗</a></div>`;
  document.getElementById('replay').addEventListener('click', () => {
    const frame = document.getElementById('folding-video');
    frame.src = embedUrl(p);
    frame.focus();
  });
  document.getElementById('mark-folded').addEventListener('click', event => {
    const wasFolded = completed.includes(p.id);
    completed = wasFolded ? completed.filter(id => id !== p.id) : [...completed, p.id];
    let saved = true;
    try { localStorage.setItem(storageKey, JSON.stringify(completed)); } catch { saved = false; }
    const button = event.currentTarget;
    button.setAttribute('aria-pressed', String(!wasFolded));
    button.innerHTML = `${wasFolded ? 'I made this plane!' : '✓ I made this plane!'} <span aria-hidden="true">✓</span>`;
    document.getElementById('fold-status').textContent = wasFolded
      ? 'Marked as not folded yet.'
      : saved ? 'Saved! Ready for a test flight?' : 'Ready for a test flight? This browser cannot save your progress.';
  });
}

const legacyIds = {'classic-dart':'basic-dart', 'wide-wing':'the-basic', 'nakamura':'the-stable'};
function route() {
  let id = location.hash.startsWith('#plane/') ? location.hash.slice(7) : null;
  if (legacyIds[id]) {
    id = legacyIds[id];
    history.replaceState(null, '', `#plane/${id}`);
  }
  const p = planes.find(plane => plane.id === id);
  document.getElementById('home').hidden = !!p;
  document.getElementById('manual').hidden = !p;
  if (p) {
    active = p;
    renderManual();
    document.title = `${p.name} video guide — Fold & Fly`;
    window.scrollTo(0, 0);
  } else {
    active = null;
    // Remove the iframe so a hidden video cannot keep playing after leaving.
    document.getElementById('manual').innerHTML = '';
    document.title = 'Fold & Fly — Watch, pause, fold';
    renderCards();
    requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
    });
  }
}
window.addEventListener('hashchange', route);
route();
