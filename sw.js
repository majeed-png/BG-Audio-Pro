const CACHE='pwa-bg-audio-v9-1756023223';
const ASSETS=[
  './','./index.html','./manifest.webmanifest',
  './icon-192.png','./icon-512.png','./icon-512-maskable.png','./apple-touch-icon.png'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const cp=r.clone(); caches.open(CACHE).then(cc=>cc.put(e.request,cp)); return r;}).catch(()=>c)));
});
