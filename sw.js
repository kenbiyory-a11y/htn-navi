// 二次性高血圧ナビ service worker — app shell を事前キャッシュし、オフラインでも起動できるようにする
const VERSION = 'htn-navi-v3';
const SHELL = [
  './', './index.html', './chart.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png',
  './icons/icon-192-maskable.png', './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png', './favicon.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // 同一オリジン（アプリ本体）：キャッシュ優先、裏で更新
  if (url.origin === location.origin) {
    e.respondWith(caches.open(VERSION).then(async c => {
      const cached = await c.match(e.request);
      const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => cached);
      return cached || net;
    }));
    return;
  }
  // Google Fonts：取れたらキャッシュ、取れなければキャッシュ（なければ代替フォントで表示）
  if (url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')) {
    e.respondWith(caches.open(VERSION + '-fonts').then(async c => {
      const cached = await c.match(e.request);
      try { const r = await fetch(e.request); if (r.ok) c.put(e.request, r.clone()); return r; }
      catch { return cached || Response.error(); }
    }));
  }
});
