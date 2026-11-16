/* Mind-sage offline asset cache. No user answers or personal information are cached. */
const CACHE='mind-sage-editorial-contrast-2026-11-16-3';
const STATIC=['./','./index.html','./styles.css','./v3.css','./v4.css','./video-library.css','./experience.css','./visual-refresh.css','./personal-details.css','./v9.css','./atelier.css','./theme.css','./data.js','./app.js','./v3.js','./v4-questions.js','./v4.js','./video-library.js','./experience.js','./visual-refresh.js','./personal-details.js','./v9.js','./atelier.js','./config.js','./vivekananda-portrait.webp','./student-calm-sunset.webp','./parent-child-reflection.webp','./student-mindful-portrait.webp','./students-supporting-each-other.webp','./campus-conversation.webp','./sayan-pal-contact.png','./rahul-karmakar-contact.png','./favicon.svg','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&k.startsWith('mind-sage-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 if(req.mode==='navigate'){event.respondWith(fetch(req).then(res=>res.ok?res:caches.match('./index.html')).catch(()=>caches.match('./index.html')));return;}
 event.respondWith(fetch(req).then(res=>{if(res.ok&&STATIC.some(a=>new URL(a,self.registration.scope).pathname===url.pathname)){const clone=res.clone();caches.open(CACHE).then(c=>c.put(req,clone));}return res;}).catch(()=>caches.match(req)));
});
