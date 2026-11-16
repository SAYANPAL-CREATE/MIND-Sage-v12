/* Mind-sage editorial redesign. Presentation-only enhancements over the stable assessment engine. */
'use strict';

const studioIsDark = () => document.documentElement.dataset.theme === 'dark';
const studioThemeControl = (mobile=false) => {
  const dark=studioIsDark();
  const action=dark?T('Switch to light mode','লাইট মোড চালু করুন'):T('Switch to dark mode','ডার্ক মোড চালু করুন');
  const label=dark?T('Light mode','লাইট মোড'):T('Dark mode','ডার্ক মোড');
  return `<button type="button" class="studio-theme-toggle ${mobile?'studio-theme-mobile':''}" data-studio-theme="toggle" aria-label="${action}" title="${action}" aria-pressed="${dark?'true':'false'}">${I(dark?'sun':'moon',18)}<span>${label}</span></button>`;
};
function studioUpdateAppearance(){
  const dark=studioIsDark();
  document.documentElement.style.colorScheme=dark?'dark':'light';
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute('content',dark?'#101f1b':'#f8f7f1');
  document.querySelectorAll('[data-studio-theme="toggle"]').forEach(btn=>{
    const label=dark?T('Light mode','লাইট মোড'):T('Dark mode','ডার্ক মোড');
    const action=dark?T('Switch to light mode','লাইট মোড চালু করুন'):T('Switch to dark mode','ডার্ক মোড চালু করুন');
    btn.setAttribute('aria-label',action);
    btn.setAttribute('title',action);
    btn.setAttribute('aria-pressed',String(dark));
    btn.innerHTML=I(dark?'sun':'moon',18)+`<span>${label}</span>`;
  });
}
// Preserve form state: changing theme never re-renders or resets an assessment.
document.addEventListener('click',(event)=>{
  if(!event.target.closest('[data-studio-theme="toggle"]'))return;
  event.preventDefault();event.stopImmediatePropagation();
  const dark=!studioIsDark();
  if(dark)document.documentElement.dataset.theme='dark';
  else document.documentElement.removeAttribute('data-theme');
  try{localStorage.setItem('mindsage-ui-appearance',dark?'dark':'light');}catch(_){}
  studioUpdateAppearance();
},true);
document.addEventListener('DOMContentLoaded',studioUpdateAppearance);

const studioMenu = [
  { title:['Assess & understand','মূল্যায়ন ও বোঝাপড়া'], desc:['Dedicated student and guardian pathways','শিক্ষার্থী ও অভিভাবকের জন্য'], items:[
      ['moods','Start assessment','মূল্যায়ন শুরু'],['smart','Smart check-in','স্মার্ট যাচাই'],['report-studio','Report studio','রিপোর্ট স্টুডিও'],['my-profile','Personal profile','ব্যক্তিগত প্রোফাইল'],['progress','Progress tracker','অগ্রগতি পর্যবেক্ষণ'],['guardian-log','Guardian observations','অভিভাবকের পর্যবেক্ষণ']]},
  { title:['Restore & reflect','শান্তি ও ভাবনা'],desc:['Tools for everyday wellbeing','প্রতিদিনের সহায়ক অনুশীলন'],items:[
      ['bromind','Bro-minD Plus','ব্রো-মিন্ড প্লাস'],['breathing','Breathing','শ্বাসের ব্যায়াম'],['garden','Mind Garden','মনের বাগান'],['journal','Mind Journal','মনের জার্নাল'],['landscape','Emotion Landscape','অনুভূতির আকাশ'],['skills','Coping Skills Lab','মানিয়ে নেওয়ার অনুশীলন']]},
  {title:['Learn & connect','জানুন ও যোগাযোগ'],desc:['Carefully selected learning resources','বিশ্বস্ত শিক্ষামূলক সহায়তা'],items:[
      ['videos','Watch & Learn','ভিডিও দেখুন'],['vani','Swamiji Vani','স্বামীজীর বাণী'],['literacy','Literacy Centre','সচেতনতা কেন্দ্র'],['support','Support directory','সহায়তার ঠিকানা'],['contact','Contact us','যোগাযোগ করুন'],['privacy-centre','Privacy centre','গোপনীয়তা']]}
];
const studioMainNav=[['home','Home','হোম'],['moods','Assessments','মূল্যায়ন'],['dashboard','My space','আমার স্থান'],['bromind','Wellbeing tools','সুস্থতার টুল'],['videos','Watch & Learn','ভিডিও']];
const studioRoutes=new Set(['home','moods','dashboard','bromind','videos']);

header=function(){
  const p=pageNow();
  return `<header class="studio-header"><div class="studio-header-main">
      <a class="studio-logo" href="#/home" aria-label="Mind-sage home"><span class="studio-logo-glyph">${I('leaf',21)}</span><span class="studio-logo-type">mind<span>sage</span></span><span class="studio-logo-rule"></span><small>${T('STUDENT WELLBEING','শিক্ষার্থীদের মানসিক সুস্থতা')}</small></a>
      <nav class="studio-topnav" aria-label="${T('Main navigation','প্রধান নেভিগেশন')}">${studioMainNav.map(([path,en,bn])=>`<a class="${(p===path||(path==='moods'&&['assessment','report','profile'].includes(p)))?'current':''}" href="#/${path}" ${p===path?'aria-current="page"':''}>${T(en,bn)}</a>`).join('')}</nav>
      <div class="studio-controls"><details class="studio-explore" id="studio-explore"><summary>${T('Explore','আরও দেখুন')} <span aria-hidden="true">⌄</span></summary><div class="studio-mega">${studioMenu.map(c=>`<section><h3>${T(...c.title)}</h3><p>${T(...c.desc)}</p>${c.items.map(([to,en,bn])=>`<a href="#/${to}">${T(en,bn)}<span aria-hidden="true">↗</span></a>`).join('')}</section>`).join('')}</div></details>${studioThemeControl()}<button data-action="lang" class="studio-lang lang-btn" aria-label="${state.lang==='en'?'Switch to Bengali':'Switch to English'}">${state.lang==='en'?'বাংলা':'English'}</button><button id="menu-toggle" class="studio-menu-button menu-icon" aria-label="${T('Open menu','মেনু খুলুন')}" aria-expanded="false">${I('grid',22)}</button></div>
  </div></header>`;
};

const studioDrawer=()=>`<aside class="studio-mobile-drawer" id="studio-mobile-drawer" aria-label="${T('Mobile navigation','মোবাইল নেভিগেশন')}"><div class="studio-drawer-head"><strong>mind<span>sage</span></strong><button class="studio-drawer-close" data-studio="close" aria-label="Close menu">${I('close',22)}</button></div><div class="studio-drawer-appearance">${studioThemeControl(true)}</div><div class="studio-drawer-scroll">${studioMenu.map(c=>`<section><h3>${T(...c.title)}</h3>${c.items.map(([to,en,bn])=>`<a href="#/${to}">${T(en,bn)}<span>↗</span></a>`).join('')}</section>`).join('')}</div><a class="studio-drawer-emergency" href="#/support">${I('heart',18)} ${T('Find support','সহায়তা খুঁজুন')}</a></aside>`;

shell=function(body,compact=false){const p=pageNow(),current=navs.find(x=>x[0]===p);return `<div class="app-shell studio-app">${header()}${studioDrawer()}<div class="nav-shade" id="nav-shade"></div><div class="studio-body"><main class="content studio-content ${compact?'content-wide':''}" id="main-content">${p!=='home'?`<div class="studio-page-context"><a href="#/home">${T('Mind-sage','Mind-sage')}</a><span>/</span><strong>${esc(current?T(current[2],current[3]):T('Your wellbeing space','আপনার ভালো থাকার স্থান'))}</strong></div>`:''}${body}</main><footer class="studio-footer"><div class="studio-footer-top"><div class="studio-footer-about"><span class="studio-logo-glyph">${I('leaf',21)}</span><strong>Mind-sage</strong><p>${T('Thoughtful digital wellbeing for students, scholars and families.','শিক্ষার্থী, গবেষক ও পরিবারের জন্য চিন্তাশীল ডিজিটাল সুস্থতা।')}</p></div><div class="studio-footer-links"><div><span>${T('Explore','বিভাগসমূহ')}</span><a href="#/moods">${T('Assessments','মূল্যায়ন')}</a><a href="#/report-studio">${T('Report Studio','রিপোর্ট স্টুডিও')}</a><a href="#/journal">${T('Mind Journal','জার্নাল')}</a></div><div><span>${T('About','তথ্য')}</span><a href="#/vani">${T('Swamiji Vani','বাণী')}</a><a href="#/contact">${T('Contact us','যোগাযোগ')}</a><a href="#/privacy-centre">${T('Privacy','গোপনীয়তা')}</a></div><div><span>${T('Support','সহায়তা')}</span><a href="#/support">Tele-MANAS 14416</a><a href="#/guardian">${T('Guardian Care','অভিভাবকের যত্ন')}</a><a href="#/videos">${T('Learning videos','ভিডিও')}</a></div></div></div><div class="studio-footer-bottom"><span>© ${new Date().getFullYear()} Mind-sage</span><span>${T('Made for thoughtful, accessible experiences','সবার জন্য সহজ ও যত্নশীল অভিজ্ঞতা')}</span></div></footer></div></div>`;};

function studioStageCards(){return `<div class="studio-stage-list">${LEVELS.map((lv,i)=>`<button class="studio-stage" data-action="level" data-id="${lv.id}"><span class="studio-stage-number">0${i+1}</span><span class="studio-stage-icon">${I(['book','sun','grid','chart','spark'][i],22)}</span><span class="studio-stage-name">${esc(nameOf(lv.id))}<small>${T(['Guardian-completed observations','Exams, peers and school life','Campus, learning and transition','Dissertations and further study','Research, supervision and progress'][i],['অভিভাবকের পর্যবেক্ষণ','পরীক্ষা ও স্কুলজীবন','ক্যাম্পাস ও শিক্ষাজীবন','ডিসার্টেশন ও উচ্চতর পড়াশোনা','গবেষণা ও তত্ত্বাবধান'][i])}</small></span><span class="studio-stage-go">${I('arrow',18)}</span></button>`).join('')}</div>`;}

function studioModule(to,title,bn,sub,subBn,icon){return `<a class="studio-tool-item" href="#/${to}"><span class="studio-tool-icon">${I(icon,19)}</span><span><strong>${T(title,bn)}</strong><small>${T(sub,subBn)}</small></span><span class="studio-tool-arrow" aria-hidden="true">↗</span></a>`;}

v3Landing=function(){
 const quote=QUOTES[0];
 return shell(`<div class="studio-home">
 <section class="studio-intro" aria-label="${T('Introduction','পরিচয়')}"><div class="studio-intro-kicker"><span></span>${T('A BETTER WAY TO CARE FOR YOUR MIND','নিজের মনকে বুঝে নেওয়ার নতুন পথ')}</div><div class="studio-intro-grid"><div><h1>${T('A quieter mind starts<br>with being <em>heard.</em>','মন ভালো থাকার শুরু<br><em>নিজেকে বুঝতে পারায়।</em>')}</h1></div><div class="studio-intro-side"><p>${T('A considered space to reflect, understand your feelings and find your next step — built around the realities of student life.','শিক্ষাজীবনের বাস্তব অভিজ্ঞতাকে সামনে রেখে অনুভূতি বোঝা, নিজের কথা ভাবা এবং পরের পদক্ষেপ খুঁজে পাওয়ার একটি যত্নশীল স্থান।')}</p><a class="studio-text-link" href="#/moods">${T('Begin a wellbeing check-in','নিজের অনুভূতি যাচাই করুন')} <span>↗</span></a></div></div></section>
 <section class="studio-photo-story"><img src="./student-calm-sunset.webp" alt="A student taking a peaceful breath at sunset" fetchpriority="high" decoding="async"><div class="studio-story-caption"><span>${T('MIND-SAGE / A MOMENT FOR YOURSELF','মাইন্ড-সেজ / নিজের জন্য একটু সময়')}</span><strong>${T('A little space changes<br>how the day feels.','একটু থামলে<br>দিনটাও বদলে যায়।')}</strong></div><a href="#/bromind" class="studio-story-chip">${I('wind',19)} ${T('Breathe with Bro-minD','ব্রো-মিন্ডে শ্বাস নিন')} <span>↗</span></a></section>
 <div class="studio-value-strip"><span>${I('shield',17)} ${T('Private-first experience','গোপনীয়তাকে গুরুত্ব')}</span><span>${I('users',17)} ${T('Student & guardian pathways','শিক্ষার্থী ও অভিভাবকের জন্য')}</span><span>${I('book',17)} ${T('English & Bengali','ইংরেজি ও বাংলা')}</span><span>${I('download',17)} ${T('Reports you can download','ডাউনলোডযোগ্য রিপোর্ট')}</span></div>
 <section class="studio-entry-section"><div class="studio-section-intro"><div><span class="studio-eyebrow">01 <i></i> ${T('GET STARTED','শুরু করুন')}</span><h2>${T('Your journey, your stage.','শিক্ষার স্তর অনুযায়ী আপনার পথ।')}</h2></div><p>${T('Choose the group that best describes you. Each pathway uses its own set of questions; primary-school forms are completed by a parent or guardian.','আপনার শিক্ষার স্তর বেছে নিন। প্রতিটির নিজস্ব প্রশ্নমালা আছে; প্রাথমিক স্তরের জন্য উত্তর দেবেন অভিভাবক।')}</p></div>${studioStageCards()}</section>
 <section class="studio-feature-section"><div class="studio-section-intro"><div><span class="studio-eyebrow">02 <i></i> ${T('EXPLORE MINDSAGE','মাইন্ড-সেজ অন্বেষণ করুন')}</span><h2>${T('Different needs.<br>One thoughtful space.','বিভিন্ন প্রয়োজন।<br>একটি যত্নশীল স্থান।')}</h2></div><p>${T('Choose what you need today. There is no fixed sequence, and you can return whenever you wish.','আজ আপনার যা দরকার তা বেছে নিন। কোনো নির্দিষ্ট ক্রম নেই; চাইলে আবার ফিরে আসতে পারেন।')}</p></div><div class="studio-feature-layout"><a href="#/report-studio" class="studio-feature-spotlight"><div class="studio-spotlight-bg"><span>01 / ${T('UNDERSTAND','বোঝাপড়া')}</span><strong>${T('Know your patterns,<br>not just a number.','শুধু সংখ্যা নয়,<br>নিজের অভিজ্ঞতা বুঝুন।')}</strong><span class="studio-feature-cta">${T('Explore Report Studio','রিপোর্ট স্টুডিও দেখুন')} ↗</span></div><img src="./student-mindful-portrait.webp" alt="Student resting in a peaceful outdoor setting" loading="lazy"></a><div class="studio-feature-stack"><a href="#/guardian" class="studio-feature-tile"><img src="./parent-child-reflection.webp" alt="Guardian listening attentively to a young child" loading="lazy"><div><span>${T('FOR FAMILIES','পরিবারের জন্য')}</span><h3>${T('Guardian Care','অভিভাবকের যত্ন')}</h3><p>${T('Support the little voices around you.','শিশুর কথা শোনার জন্য একটি বিশেষ স্থান।')}</p><b>↗</b></div></a><a href="#/journal" class="studio-feature-tile"><img src="./students-supporting-each-other.webp" alt="Two women having a supportive conversation" loading="lazy"><div><span>${T('REFLECT','নিজের ভাবনা')}</span><h3>${T('Mind Journal','মনের জার্নাল')}</h3><p>${T('Give words to what you feel.','নিজের অনুভূতি লিখে রাখুন।')}</p><b>↗</b></div></a></div></div></section>
 <section class="studio-tools-section"><div class="studio-section-intro"><div><span class="studio-eyebrow">03 <i></i> ${T('YOUR EVERYDAY TOOLKIT','প্রতিদিনের সহায়ক টুল')}</span><h2>${T('Small things. Meaningful care.','ছোট অনুশীলন। আন্তরিক যত্ন।')}</h2></div><a href="#/dashboard" class="studio-text-link">${T('View personal dashboard','ড্যাশবোর্ড দেখুন')} <span>↗</span></a></div><div class="studio-tool-grid">${[
 ['smart','Smart Check-in','স্মার্ট যাচাই','Adaptive reflection prompts','পরিস্থিতি অনুযায়ী প্রশ্ন','target'],
 ['bromind','Bro-minD Plus','ব্রো-মিন্ড প্লাস','Breathing, grounding and meditation','শ্বাস ও ধ্যানের অনুশীলন','wind'],
 ['progress','Progress Tracker','অগ্রগতি পর্যবেক্ষণ','Explore changes over time','সময়ের সঙ্গে পরিবর্তন','chart'],
 ['garden','Mind Garden','মনের বাগান','Celebrate gentle self-care habits','নিজের যত্নের ছোট অভ্যাস','leaf'],
 ['videos','Watch & Learn','ভিডিও দেখুন','Curated wellbeing learning','নির্বাচিত শেখার ভিডিও','play'],
 ['contact','Contact Us','যোগাযোগ করুন','Reach our project contacts','প্রকল্পে যোগাযোগ','message']
 ].map(r=>studioModule(...r)).join('')}</div></section>
 <section class="studio-wisdom"><div class="studio-wisdom-portrait"><img src="./vivekananda-portrait.webp" alt="Swami Vivekananda artistic portrait" loading="eager"></div><div class="studio-wisdom-copy"><span>${T('WISDOM & REFLECTION','বাণী ও ভাবনা')}</span><h2>${T('A moment with Swamiji','স্বামীজীর বাণী')}</h2><blockquote lang="bn">“${esc(quote.bn)}”</blockquote><p>${T('Explore our collection of 18 Bengali sayings with source references.','উৎস-সহ স্বামীজীর নির্বাচিত ১৮টি বাংলা বাণী পড়ুন।')}</p><a class="studio-text-link" href="#/vani">${T('Read the Vani collection','বাণী সংগ্রহ পড়ুন')} <span>↗</span></a></div></section>
 <section class="studio-support-panel"><div><span>${T('REAL SUPPORT, WHEN IT MATTERS','প্রয়োজনে বাস্তব সহায়তা')}</span><h2>${T('You do not have to find the next step alone.','পরের পদক্ষেপ একা খুঁজতে হবে না।')}</h2><p>${T('Explore public mental-health support options in India, including Tele-MANAS at 14416.','ভারতে টেলি-মানস ১৪৪১৬-সহ নির্ভরযোগ্য মানসিক স্বাস্থ্য সহায়তা খুঁজুন।')}</p></div><a href="#/support">${T('Find support resources','সহায়তার ঠিকানা দেখুন')} ${I('arrow',18)}</a></section>
 </div>`,true);
};

// Existing route handlers remain authoritative; only the visual shell and landing are replaced.
const studioPreviousAfterNavigate=v3AfterNavigate;
v3AfterNavigate=function(page){studioPreviousAfterNavigate(page);const app=document.querySelector('.app-shell');if(app)app.classList.remove('nav-open');const details=document.querySelector('#studio-explore');if(details)details.open=false;};

document.addEventListener('click',(e)=>{
  if(e.target.closest('[data-studio="close"]')){document.querySelector('.app-shell')?.classList.remove('nav-open');const b=document.querySelector('#menu-toggle');if(b)b.setAttribute('aria-expanded','false');}
  if(e.target.closest('.studio-mobile-drawer a')){document.querySelector('.app-shell')?.classList.remove('nav-open');}
  if(e.target.closest('.studio-mega a')){document.querySelector('#studio-explore')?.removeAttribute('open');}
},true);
