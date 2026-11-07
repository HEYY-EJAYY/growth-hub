/**
 * Growth Hub — GHL standalone file generator (v2)
 * Produces self-contained HTML files with inlined compiled Tailwind CSS.
 * CSS is included as-is: Tailwind utility class names are unique enough
 * to not conflict with GoHighLevel's own styles.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '../ghl-dist');
mkdirSync(OUT, { recursive: true });

// Read compiled CSS
const distDir = join(__dirname, '../dist/assets');
const distAssets = readdirSync(distDir);
const cssFile = distAssets.find((f) => f.endsWith('.css'));
const CSS = cssFile ? readFileSync(join(distDir, cssFile), 'utf-8') : '';

// Strip the Tailwind preflight/base reset (everything up to the first utility class)
// to avoid resetting GHL's own elements. Keep component + utility classes.
let css = CSS;
// Find where the custom base styles start (html{scroll-behavior...)
const baseStart = css.indexOf('html{scroll-behavior');
if (baseStart > 0) {
  // Keep from our custom base onward (includes our body styles + all utilities)
  css = css.substring(baseStart);
} 
// Also strip the raw preflight that comes before (the *,::before,::after block)
// Our approach: remove the first chunk that contains the Tailwind reset
const preflightEnd = css.indexOf('html{scroll-behavior');
if (preflightEnd > 0) {
  css = css.substring(preflightEnd);
}

const FONT_LINK = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet">`;

const SHARED_JS = `
(function(){
  var KEY='gh-reduce-motion';
  function isReduced(){ var s=localStorage.getItem(KEY); if(s!==null) return s==='1'; return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function applyReduced(){ document.documentElement.classList.toggle('reduce-motion',isReduced()); }
  applyReduced();
  window.ghToggleMotion=function(btn){
    var next=!isReduced(); localStorage.setItem(KEY,next?'1':'0'); applyReduced();
    document.querySelectorAll('[data-gh-motion-toggle]').forEach(function(t){t.setAttribute('aria-pressed',next)});
  };
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('[data-gh-motion-toggle]').forEach(function(t){t.setAttribute('aria-pressed',isReduced())});
  });
  window.ghToggleMenu=function(btn){
    var open=btn.getAttribute('aria-expanded')==='true';
    btn.setAttribute('aria-expanded',!open);
    var menu=document.getElementById(btn.getAttribute('aria-controls'));
    if(menu){ menu.style.display=open?'none':'flex'; document.body.style.overflow=open?'':'hidden'; }
  };
  window.ghCloseMenu=function(){ var btn=document.querySelector('[data-gh-menu-btn]'); if(btn){btn.setAttribute('aria-expanded','false');} var menu=document.getElementById('gh-mobile-menu'); if(menu){menu.style.display='none';} document.body.style.overflow=''; };
})();
`;

// Icon helper
const I = {};
function icon(name, s=20) {
  if (I[name+s]) return I[name+s];
  const paths = {
    sparkles:'<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
    calendarCheck:'<path d="M11.08 20.27a2 2 0 0 1-2.41-1.42l-.7-2.46"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M12.5 2h-9a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/><path d="M22 10v3a8 8 0 0 1-16 0v-3"/><path d="m9 13 2 2 4-4"/>',
    calendar:'<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    menu:'<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    mapPin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    arrowRight:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrowDown:'<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    calculator:'<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
    messagesSquare:'<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>',
    workflow:'<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
    bot:'<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    check:'<path d="M20 6 9 17l-5-5"/>',
    checkCircle2:'<path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/>',
    minus:'<path d="M5 12h14"/>',
    star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a.53.53 0 0 0 .4.29h5.15a.53.53 0 0 1 .482.727l-2.57 6.014a.53.53 0 0 0 .07.548l3.75 4.584a.53.53 0 0 1-.4.872h-6.09a.53.53 0 0 0-.482.316l-2.31 5.684a.53.53 0 0 1-.978 0l-2.31-5.684a.53.53 0 0 0-.482-.316h-6.09a.53.53 0 0 1-.4-.872l3.75-4.584a.53.53 0 0 0 .07-.548L2.6 8.067a.53.53 0 0 1 .482-.727h5.15a.53.53 0 0 0 .4-.29z"/>',
    trendingUp:'<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    phoneMissed:'<path d="M11.55 20.27a2 2 0 0 1-2.41-1.42l-.7-2.46"/><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><line x1="22" x2="16" y1="2" y2="8"/><line x1="16" x2="22" y1="2" y2="8"/>',
    userPlus:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="22" x2="22" y1="8" y2="14"/><line x1="19" x2="25" y1="11" y2="11"/>',
    userCheck:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
    messageSquare:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    fileText:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
    moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    chevronDown:'<path d="m6 9 6 6 6-6"/>',
    send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    alertCircle:'<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    quote:'<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
    eye:'<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
    graduationCap:'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1zM21 14h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a1 1 0 0 0 1-1z"/><path d="M3 14a9 9 0 0 1 18 0"/>',
    layers:'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    rotateCcw:'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',
    building2:'<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
    wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    shoppingCart:'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    scale:'<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    stethoscope:'<path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
    car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18.4 8.5c-.2-.5-.8-.9-1.4-.9H7c-.6 0-1.2.4-1.4.9l-2.1 2.6C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    handHelping:'<path d="M11 14h2a2 2 0 0 0 2-2 2 2 0 0 0-2-2H8"/><path d="M13.5 10h.5a2 2 0 0 0 2-2 2 2 0 0 0-2-2H8"/><path d="M16 10h1a2 2 0 0 0 2-2 2 2 0 0 0-2-2h-2.5"/><path d="M8 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path d="M9.5 21a2.5 2.5 0 0 0 2.5-2.5V14h4a2 2 0 0 0 2-2V8.5a2.5 2.5 0 0 0-5 0v.5"/>',
    heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  };
  const r = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||''}</svg>`;
  I[name+s] = r;
  return r;
}

const NAV = [
  { to: '/', label: 'Home' }, { to: '/services', label: 'Services' },
  { to: '/savings-calculator', label: 'Savings Calculator' }, { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' }, { to: '/contact', label: 'Contact' },
];

function styleTag() {
  return `<style>\n${css}\n</style>`;
}

function pageWrap(id, title, body, extraJS='') {
  return `<!-- Growth Hub — ${title} (paste into GHL Custom Code) -->
<div id="${id}">
${styleTag()}
${FONT_LINK}
${body}
<script>${SHARED_JS}\n${extraJS}</script>
</div>`;
}

function mobileBar() {
  return `<div class="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-dark-deep/95 backdrop-blur-md border-t border-brand-300/20 px-4 py-2.5 safe-pb"><a href="/contact#book" class="btn-primary w-full !py-3.5 text-base">${icon('calendarCheck',20)} Book a free consultation</a></div>`;
}

function cta(title, body, opts={}) {
  const dark = opts.dark !== false;
  const sec = opts.secondaryLabel ? `<a href="${opts.secondaryTo}" class="${dark?'btn-ghost-dark':'btn-ghost'}">${opts.secondaryLabel} ${icon('arrowRight',16)}</a>` : '';
  return `<section class="${dark?'bg-dark-deep text-white':'bg-surface text-ink'} transition-colors">
<div class="container-gh py-20 md:py-28 text-center max-w-3xl mx-auto px-6">
<h2 class="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-5">${title}</h2>
<p class="text-base sm:text-lg leading-relaxed mb-8 ${dark?'text-white/75':'text-ink-muted'} text-measure mx-auto">${body}</p>
<div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
<a href="/contact#book" class="btn-primary" style="box-shadow:0 0 28px rgba(5,150,105,0.4)">${icon('calendarCheck',20)} ${opts.primaryLabel||'Book a free consultation'}</a>
${sec}
</div>
<p class="mt-5 text-sm ${dark?'text-white/50':'text-ink-muted/70'}">The first call is one hour, free, no obligation.</p>
</div></section>`;
}

// ---- HEADER ----
function buildHeader(currentPath) {
  const navLinks = NAV.map(l => {
    const a = currentPath === l.to;
    return `<a href="${l.to}" class="relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors on-dark ${a?'text-brand-300':'text-white/75 hover:text-white'}"${a?' aria-current="page"':''}>${l.label}${a?'<span class="absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-400" aria-hidden="true"></span>':''}</a>`;
  }).join('');
  const mobileLinks = NAV.map(l => {
    const a = currentPath === l.to;
    return `<a href="${l.to}"${a?' aria-current="page"':''} class="block px-4 py-3.5 rounded-lg text-base font-medium on-dark ${a?'bg-brand-500/15 text-brand-300':'text-white/85 hover:bg-white/5'}">${l.label}</a>`;
  }).join('');
  return `<!-- Growth Hub — Header (paste into GHL Custom Code > Header) -->
<div id="gh-header">
${styleTag()}
${FONT_LINK}
<a href="#main" class="skip-link on-dark">Skip to content</a>
<div class="fixed top-0 inset-x-0 z-50 bg-dark-deep/95 backdrop-blur-md border-b border-brand-300/15">
<div class="container-gh flex items-center justify-between h-16 md:h-20">
<a href="/" class="flex items-center gap-2 text-white on-dark" aria-label="Growth Hub home">
<span class="grid place-items-center w-9 h-9 rounded-lg bg-brand-500 text-white" style="box-shadow:0 0 18px rgba(5,150,105,0.45)">${icon('sparkles',20)}</span>
<span class="font-display text-lg font-semibold tracking-tight">Growth Hub</span></a>
<nav class="hidden lg:flex items-center gap-1" aria-label="Primary">${navLinks}</nav>
<div class="flex items-center gap-2">
<button type="button" data-gh-motion-toggle onclick="window.ghToggleMotion(this)" aria-pressed="false" class="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-white/70 hover:text-white border border-white/10 hover:border-brand-300/40 transition-colors on-dark" title="Reduce motion"><span class="relative inline-block w-7 h-3.5 rounded-full bg-white/15" aria-hidden="true"><span class="absolute top-0.5 left-0.5 w-2.5 h-2.5 rounded-full bg-brand-300 transition-transform"></span></span>Reduce motion</button>
<a href="/contact#book" class="btn-primary !py-2.5 !px-4 text-sm" style="box-shadow:0 0 22px rgba(5,150,105,0.35)">${icon('calendarCheck',16)}<span class="hidden sm:inline">Book a free consultation</span><span class="sm:hidden">Book a call</span></a>
<button type="button" data-gh-menu-btn onclick="window.ghToggleMenu(this)" class="lg:hidden grid place-items-center w-10 h-10 rounded-lg text-white border border-white/15 on-dark" aria-label="Open menu" aria-expanded="false" aria-controls="gh-mobile-menu">${icon('menu',20)}</button>
</div></div></div>
<div id="gh-mobile-menu" style="display:none" class="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Menu">
<div class="absolute inset-0 bg-dark-deep/80 backdrop-blur-sm" onclick="window.ghCloseMenu()"></div>
<div class="absolute right-0 top-0 bottom-0 w-[min(86%,360px)] bg-dark-deep border-l border-brand-300/15 flex flex-col">
<div class="flex items-center justify-between h-16 px-4 border-b border-white/10"><span class="font-display text-white font-semibold">Menu</span>
<button type="button" onclick="window.ghCloseMenu()" class="grid place-items-center w-10 h-10 rounded-lg text-white border border-white/15 on-dark" aria-label="Close menu">${icon('x',20)}</button></div>
<nav class="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">${mobileLinks}</nav>
<div class="p-4 border-t border-white/10">
<button type="button" data-gh-motion-toggle onclick="window.ghToggleMotion(this)" aria-pressed="false" class="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm text-white/80 border border-white/10 on-dark mb-3"><span>Reduce motion</span><span class="relative inline-block w-9 h-5 rounded-full bg-white/15" aria-hidden="true"><span class="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-brand-300 transition-transform"></span></span></button>
<a href="/contact#book" onclick="window.ghCloseMenu()" class="btn-primary w-full">Book a free consultation</a>
</div></div></div>
<script>${SHARED_JS}</script>
</div>`;
}

// ---- FOOTER ----
function buildFooter() {
  const explore = NAV.map(l => `<li><a href="${l.to}" class="text-sm text-white/70 hover:text-brand-300 transition-colors on-dark">${l.label}</a></li>`).join('');
  return `<!-- Growth Hub — Footer (paste into GHL Custom Code > Footer) -->
<div id="gh-footer">
${styleTag()}
${FONT_LINK}
<footer class="bg-dark-deep text-white/80 border-t border-brand-300/15">
<div class="container-gh py-14 md:py-20">
<div class="grid gap-10 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
<div><div class="flex items-center gap-2 text-white mb-4"><span class="grid place-items-center w-9 h-9 rounded-lg bg-brand-500">${icon('sparkles',20)}</span><span class="font-display text-lg font-semibold">Growth Hub, LLC</span></div><p class="text-sm leading-relaxed text-white/65 text-measure-tight">We set up the CRM, automation, AI assistance and websites your business runs on — then teach you to use them. Based in Phoenix, Arizona.</p></div>
<div><h2 class="font-display text-white text-sm font-semibold mb-4 tracking-wide">Explore</h2><ul class="space-y-2.5">${explore}</ul></div>
<div><h2 class="font-display text-white text-sm font-semibold mb-4 tracking-wide">Contact</h2><ul class="space-y-3 text-sm">
<li class="flex items-start gap-3">${icon('mail',16)}<div><div class="text-white/50">Email</div><a href="mailto:support@mygrowthhub.io" class="text-white/70 hover:text-brand-300 transition-colors on-dark">support@mygrowthhub.io</a></div></li>
<li class="flex items-start gap-3">${icon('phone',16)}<div><div class="text-white/50">Phone</div><a href="tel:+14807380576" class="text-white/70 hover:text-brand-300 transition-colors on-dark">+1 480-738-0576</a></div></li>
<li class="flex items-start gap-3">${icon('clock',16)}<div><div class="text-white/50">Hours</div><span class="text-white/70">Mon, Tue, Wed &amp; Fri, 10 AM – 4 PM Arizona time</span></div></li>
<li class="flex items-start gap-3">${icon('mapPin',16)}<div><div class="text-white/50">Location</div><span class="text-white/70">Phoenix, Arizona</span></div></li>
</ul></div>
<div><h2 class="font-display text-white text-sm font-semibold mb-4 tracking-wide">Legal</h2><ul class="space-y-2.5"><li><a href="/privacy" class="text-sm text-white/70 hover:text-brand-300 transition-colors on-dark">Privacy Policy</a></li><li><a href="/terms" class="text-sm text-white/70 hover:text-brand-300 transition-colors on-dark">Terms of Service</a></li></ul></div>
</div>
<div class="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"><p class="text-xs text-white/50">© 2026 Growth Hub, LLC. All rights reserved.</p><p class="text-xs text-white/40">Customer relationship management (CRM), automation &amp; web design.</p></div>
</div></footer>
</div>`;
}

// Now write all files
const files = {};
files['header.html'] = buildHeader('/');
files['footer.html'] = buildFooter();

// ---- HOME ----
files['home.html'] = pageWrap('gh-home', 'Home', `
<main id="main">
<section class="relative bg-dark-deep text-white overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28">
<canvas id="gh-hero-canvas" class="absolute inset-0 w-full h-full" aria-hidden="true"></canvas>
<div class="relative z-10 container-gh">
<div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
<div class="animate-fadeUp">
<p class="text-sm text-brand-300 mb-5 flex items-center gap-2"><span class="w-6 h-px bg-brand-400" aria-hidden="true"></span>CRM, automation, AI &amp; websites — Phoenix, AZ</p>
<h1 class="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] mb-6 text-measure">Your leads, messages and appointments in one organized place.</h1>
<p class="text-lg text-white/75 leading-relaxed mb-8 text-measure-tight">Growth Hub sets up the CRM, follow-ups and website forms your business runs on, then teaches you to use them.</p>
<div class="flex flex-col sm:flex-row gap-3">
<a href="/contact#book" class="btn-primary" style="box-shadow:0 0 28px rgba(5,150,105,0.4)">${icon('calendarCheck',20)} Book a free consultation</a>
<a href="/savings-calculator" class="btn-ghost-dark">${icon('calculator',20)} Check what you pay for software</a>
</div><p class="mt-5 text-sm text-white/50">The first call is one hour, free, no obligation.</p>
</div>
<div class="animate-fadeUp" style="animation-delay:0.15s">
<div class="relative w-full max-w-md mx-auto">
<div class="absolute -inset-6 bg-brand-500/15 blur-3xl rounded-full" aria-hidden="true"></div>
<div class="relative rounded-2xl bg-dark-mid/90 backdrop-blur-xl border border-brand-300/25 overflow-hidden" style="box-shadow:0 30px 80px -20px rgba(3,18,13,0.8)">
<div class="flex items-center justify-between px-5 py-3.5 border-b border-white/10"><div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulseSoft" aria-hidden="true"></span><span class="text-white text-sm font-medium">Live workspace</span></div><span class="text-[11px] text-white/45 uppercase tracking-wide flex items-center gap-1">${icon('clock',12)} now</span></div>
<div class="grid grid-cols-3 gap-px bg-white/5"><div class="bg-dark-mid px-4 py-3"><div class="text-white text-xl font-display font-semibold">12</div><div class="text-[11px] text-white/50 mt-0.5">New leads</div></div><div class="bg-dark-mid px-4 py-3"><div class="text-white text-xl font-display font-semibold">5</div><div class="text-[11px] text-white/50 mt-0.5">Follow-ups</div></div><div class="bg-dark-mid px-4 py-3"><div class="text-white text-xl font-display font-semibold">8</div><div class="text-[11px] text-white/50 mt-0.5">Booked</div></div></div>
<ul class="divide-y divide-white/5">
<li class="flex items-start gap-3 px-5 py-3.5"><span class="grid place-items-center w-8 h-8 rounded-lg shrink-0 text-brand-300 bg-brand-500/15">${icon('userPlus',16)}</span><div class="min-w-0 flex-1"><p class="text-white text-sm font-medium leading-snug">New lead from an Instagram message</p><p class="text-white/55 text-xs mt-0.5 truncate">Daniela R.</p></div><span class="text-[11px] text-white/40 shrink-0">2m ago</span></li>
<li class="flex items-start gap-3 px-5 py-3.5"><span class="grid place-items-center w-8 h-8 rounded-lg shrink-0 text-emerald-200 bg-emerald-400/15">${icon('calendarCheck',16)}</span><div class="min-w-0 flex-1"><p class="text-white text-sm font-medium leading-snug">Booking confirmed</p><p class="text-white/55 text-xs mt-0.5 truncate">Marcus T. — Tue 11:00 AM</p></div><span class="text-[11px] text-white/40 shrink-0">6m ago</span></li>
<li class="flex items-start gap-3 px-5 py-3.5"><span class="grid place-items-center w-8 h-8 rounded-lg shrink-0 text-amber-200 bg-amber-400/15">${icon('phoneMissed',16)}</span><div class="min-w-0 flex-1"><p class="text-white text-sm font-medium leading-snug">Missed-call text-back sent</p><p class="text-white/55 text-xs mt-0.5 truncate">Auto-reply to (602) 555-0148</p></div><span class="text-[11px] text-white/40 shrink-0">11m ago</span></li>
<li class="flex items-start gap-3 px-5 py-3.5"><span class="grid place-items-center w-8 h-8 rounded-lg shrink-0 text-sky-200 bg-sky-400/15">${icon('messageSquare',16)}</span><div class="min-w-0 flex-1"><p class="text-white text-sm font-medium leading-snug">Quote request logged in pipeline</p><p class="text-white/55 text-xs mt-0.5 truncate">Priya S. — Kitchen remodel</p></div><span class="text-[11px] text-white/40 shrink-0">18m ago</span></li>
</ul>
<div class="px-5 py-3 border-t border-white/10 flex items-center gap-2">${icon('checkCircle2',14)}<span class="text-[11px] text-white/50">Everything in one list, nothing forgotten.</span></div>
</div><p class="text-center text-[11px] text-white/40 mt-3">Illustration with sample data.</p>
</div></div></div>
</section>
<section class="bg-surface pt-20 md:pt-28 pb-20 md:pb-28" aria-labelledby="problem-h">
<div class="container-gh max-w-4xl">
<p class="text-sm text-brand-600 mb-4">The problem</p>
<h2 id="problem-h" class="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-10 text-ink text-measure">Most businesses don't have a lead problem. They have a scattered-tools problem.</h2>
<ul class="border-t border-surface-line">
<li class="border-b border-surface-line py-5 flex items-baseline gap-5"><span class="font-display text-brand-500 text-sm font-semibold w-8 shrink-0">01</span><span class="text-ink-soft text-lg leading-relaxed">Inquiries scattered across texts, emails and social media.</span></li>
<li class="border-b border-surface-line py-5 flex items-baseline gap-5"><span class="font-display text-brand-500 text-sm font-semibold w-8 shrink-0">02</span><span class="text-ink-soft text-lg leading-relaxed">Follow-ups depend on memory.</span></li>
<li class="border-b border-surface-line py-5 flex items-baseline gap-5"><span class="font-display text-brand-500 text-sm font-semibold w-8 shrink-0">03</span><span class="text-ink-soft text-lg leading-relaxed">Tools do not communicate with each other.</span></li>
<li class="border-b border-surface-line py-5 flex items-baseline gap-5"><span class="font-display text-brand-500 text-sm font-semibold w-8 shrink-0">04</span><span class="text-ink-soft text-lg leading-relaxed">The same information gets entered more than once.</span></li>
<li class="border-b border-surface-line py-5 flex items-baseline gap-5"><span class="font-display text-brand-500 text-sm font-semibold w-8 shrink-0">05</span><span class="text-ink-soft text-lg leading-relaxed">Monthly software bills keep adding up.</span></li>
</ul>
<p class="mt-8 text-ink-muted text-base max-w-prose">Sound familiar? We replace the pile with one organized place — and the work that used to fall through the cracks gets done.</p>
</div></section>
<section class="bg-dark-deep text-white py-20 md:py-28" aria-labelledby="auto-h">
<div class="container-gh">
<div class="max-w-2xl mx-auto text-center mb-12"><p class="text-sm text-brand-300 mb-4">Automation in action</p><h2 id="auto-h" class="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4">See what happens when a customer calls or texts.</h2><p class="text-white/65 text-lg leading-relaxed">Pick a route. The system handles the rest — and you stay in control.</p></div>
<div class="max-w-3xl mx-auto">
<div class="flex flex-col items-center">
<div class="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-dark-mid border border-brand-300/30" style="box-shadow:0 0 30px rgba(5,150,105,0.2)"><span class="grid place-items-center w-8 h-8 rounded-lg bg-brand-500 text-white">${icon('phone',16)}</span><div class="text-left"><div class="text-white text-sm font-semibold">A customer calls or texts</div><div class="text-white/50 text-xs">Trigger</div></div></div>
<div class="w-px h-8 bg-brand-300/30" aria-hidden="true"></div><div class="text-[11px] uppercase tracking-wider text-white/40">IF / ELSE</div><div class="w-px h-6 bg-brand-300/30" aria-hidden="true"></div>
</div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
<button type="button" data-route="book" aria-pressed="false" class="gh-route-btn flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all bg-dark-mid/60 border-white/10 text-white/70 hover:border-brand-300/40 hover:text-white"><span class="grid place-items-center w-10 h-10 rounded-lg bg-white/5 text-brand-300">${icon('calendar',20)}</span><span class="text-sm font-medium leading-tight">Book a meeting</span><span class="text-[11px] text-white/40 leading-tight">They want to schedule.</span></button>
<button type="button" data-route="quote" aria-pressed="false" class="gh-route-btn flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all bg-dark-mid/60 border-white/10 text-white/70 hover:border-brand-300/40 hover:text-white"><span class="grid place-items-center w-10 h-10 rounded-lg bg-white/5 text-brand-300">${icon('fileText',20)}</span><span class="text-sm font-medium leading-tight">Ask for a quote</span><span class="text-[11px] text-white/40 leading-tight">They are shopping around.</span></button>
<button type="button" data-route="speak" aria-pressed="false" class="gh-route-btn flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all bg-dark-mid/60 border-white/10 text-white/70 hover:border-brand-300/40 hover:text-white"><span class="grid place-items-center w-10 h-10 rounded-lg bg-white/5 text-brand-300">${icon('userCheck',20)}</span><span class="text-sm font-medium leading-tight">Speak to someone</span><span class="text-[11px] text-white/40 leading-tight">They want a person.</span></button>
<button type="button" data-route="after" aria-pressed="false" class="gh-route-btn flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all bg-dark-mid/60 border-white/10 text-white/70 hover:border-brand-300/40 hover:text-white"><span class="grid place-items-center w-10 h-10 rounded-lg bg-white/5 text-brand-300">${icon('moon',20)}</span><span class="text-sm font-medium leading-tight">After hours</span><span class="text-[11px] text-white/40 leading-tight">You are closed.</span></button>
</div>
<div class="mt-6 min-h-[120px]" aria-live="polite" id="gh-auto-flow"><p class="text-center text-white/45 text-sm py-8 px-4 rounded-xl border border-dashed border-white/10">${icon('messageSquare',16)} Pick a route above to see what happens automatically.</p></div>
</div></div></section>
<section class="bg-white py-20 md:py-28" aria-labelledby="serv-h">
<div class="container-gh">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"><div><p class="text-sm text-brand-600 mb-4">What we set up</p><h2 id="serv-h" class="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink text-measure">Four pieces, one workspace.</h2></div><a href="/services" class="btn-ghost shrink-0">See all services ${icon('arrowRight',16)}</a></div>
<div class="grid md:grid-cols-2 gap-px bg-surface-line border border-surface-line rounded-xl overflow-hidden">
<a href="/services" class="group bg-white p-7 md:p-9 hover:bg-surface transition-colors flex gap-5 items-start"><span class="grid place-items-center w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">${icon('messagesSquare',24)}</span><div class="flex-1"><h3 class="font-display text-xl font-medium text-ink mb-2">CRM &amp; contact management</h3><p class="text-ink-muted text-base leading-relaxed">Pipelines that match how you sell. Tags, notes, tasks and reminders. Lead and sales dashboards.</p></div></a>
<a href="/services" class="group bg-white p-7 md:p-9 hover:bg-surface transition-colors flex gap-5 items-start"><span class="grid place-items-center w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">${icon('workflow',24)}</span><div class="flex-1"><h3 class="font-display text-xl font-medium text-ink mb-2">Business automation</h3><p class="text-ink-muted text-base leading-relaxed">Instant replies, confirmations, reminders and missed-call text-back. Follow-ups that stop when a customer replies.</p></div></a>
<a href="/services" class="group bg-white p-7 md:p-9 hover:bg-surface transition-colors flex gap-5 items-start"><span class="grid place-items-center w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">${icon('bot',24)}</span><div class="flex-1"><h3 class="font-display text-xl font-medium text-ink mb-2">AI assistance</h3><p class="text-ink-muted text-base leading-relaxed">Trained on your services, hours and policies. It hands off to a person when asked or unsure.</p></div></a>
<a href="/services" class="group bg-white p-7 md:p-9 hover:bg-surface transition-colors flex gap-5 items-start"><span class="grid place-items-center w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">${icon('globe',24)}</span><div class="flex-1"><h3 class="font-display text-xl font-medium text-ink mb-2">Custom websites</h3><p class="text-ink-muted text-base leading-relaxed">Forms and booking that feed your pipeline. Mobile-first. Quoted by page count and functionality.</p></div></a>
</div></div></section>
<section class="bg-surface py-20 md:py-28" aria-labelledby="how-h">
<div class="container-gh max-w-3xl">
<p class="text-sm text-brand-600 mb-4">How we work together</p>
<h2 id="how-h" class="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink mb-12">Three steps. No mystery.</h2>
<ol class="relative border-l-2 border-brand-300/40 ml-2">
<li class="relative pl-8 md:pl-10 pb-10 last:pb-0"><span class="absolute -left-[11px] top-0 grid place-items-center w-5 h-5 rounded-full bg-brand-500 ring-4 ring-surface">${icon('check',12)}</span><div class="flex items-baseline gap-3 mb-2"><span class="font-display text-brand-500 text-sm font-semibold">01</span><h3 class="font-display text-2xl font-medium text-ink">We talk.</h3></div><p class="text-ink-muted text-lg leading-relaxed text-measure-tight">A free one-hour call. You tell me where things break down. I tell you honestly whether I can help.</p></li>
<li class="relative pl-8 md:pl-10 pb-10 last:pb-0"><span class="absolute -left-[11px] top-0 grid place-items-center w-5 h-5 rounded-full bg-brand-500 ring-4 ring-surface">${icon('check',12)}</span><div class="flex items-baseline gap-3 mb-2"><span class="font-display text-brand-500 text-sm font-semibold">02</span><h3 class="font-display text-2xl font-medium text-ink">You receive a written plan.</h3></div><p class="text-ink-muted text-lg leading-relaxed text-measure-tight">A clear scope, the tools I recommend, and what each piece costs. No surprises, no pressure.</p></li>
<li class="relative pl-8 md:pl-10 pb-10 last:pb-0"><span class="absolute -left-[11px] top-0 grid place-items-center w-5 h-5 rounded-full bg-brand-500 ring-4 ring-surface">${icon('check',12)}</span><div class="flex items-baseline gap-3 mb-2"><span class="font-display text-brand-500 text-sm font-semibold">03</span><h3 class="font-display text-2xl font-medium text-ink">We build and train you.</h3></div><p class="text-ink-muted text-lg leading-relaxed text-measure-tight">I set everything up, move your contacts over, and show you how it works — in plain language.</p></li>
</ol>
<div class="mt-10 pl-8 md:pl-10"><a href="/contact#book" class="btn-primary">${icon('handHelping',20)} Start with a free call</a></div>
</div></section>
${cta("Let's see if we're a fit.","Book a free one-hour consultation. We'll look at what you're using now, where leads are getting lost, and whether Growth Hub can help. If it can't, I'll tell you.",{secondaryLabel:'See pricing',secondaryTo:'/pricing'})}
</main>
${mobileBar()}
`, `
var canvas=document.getElementById('gh-hero-canvas');if(!canvas) return;
var ctx=canvas.getContext('2d');if(!ctx) return;
var KEY='gh-reduce-motion';
function reduced(){var s=localStorage.getItem(KEY);if(s!==null) return s==='1';return window.matchMedia('(prefers-reduced-motion: reduce)').matches;}
var dpr=Math.min(window.devicePixelRatio||1,2),w=0,h=0,raf=0,running=false;
var pointer={x:0.5,y:0.4};
var starts=[{x:0.05,y:0.15,b:{x:-0.08,y:0.12}},{x:0.95,y:0.2,b:{x:0.1,y:0.1}},{x:0.08,y:0.85,b:{x:-0.1,y:-0.1}},{x:0.92,y:0.8,b:{x:0.08,y:-0.14}},{x:0.5,y:0.02,b:{x:0,y:0.18}}];
var PATHS=5,PP=6,particles=[];
function resize(){var r=canvas.getBoundingClientRect();w=r.width;h=r.height;canvas.width=Math.floor(w*dpr);canvas.height=Math.floor(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);}
function hub(){return{x:w*0.5,y:h*0.55};}
function pp(i,t){var c=hub(),s=starts[i%starts.length],sx=s.x*w,sy=s.y*h,cx=(sx+c.x)/2+s.b.x*w,cy=(sy+c.y)/2+s.b.y*h,u=1-t;return{x:u*u*sx+2*u*t*cx+t*t*c.x,y:u*u*sy+2*u*t*cy+t*t*c.y};}
function init(){particles=[];for(var p=0;p<PATHS;p++){for(var i=0;i<PP;i++){particles.push({t:Math.random(),speed:0.0015+Math.random()*0.002,path:p,hue:150+Math.random()*30,size:1.6+Math.random()*2.2});}}}
function dp(i){var c=hub(),s=starts[i],sx=s.x*w,sy=s.y*h,cx=(sx+c.x)/2+s.b.x*w,cy=(sy+c.y)/2+s.b.y*h;ctx.beginPath();ctx.moveTo(sx,sy);ctx.quadraticCurveTo(cx,cy,c.x,c.y);ctx.strokeStyle='rgba(110,231,183,0.10)';ctx.lineWidth=1;ctx.stroke();}
function frame(){if(!running)return;ctx.clearRect(0,0,w,h);var c=hub(),px=c.x+(pointer.x-0.5)*40,py=c.y+(pointer.y-0.4)*30;var g=ctx.createRadialGradient(px,py,0,px,py,Math.max(w,h)*0.7);g.addColorStop(0,'rgba(5,150,105,0.22)');g.addColorStop(0.45,'rgba(6,78,59,0.12)');g.addColorStop(1,'rgba(3,18,13,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);for(var i=0;i<PATHS;i++)dp(i);for(var j=0;j<particles.length;j++){var p=particles[j];p.t+=p.speed;if(p.t>1)p.t-=1;var pt=pp(p.path,p.t);var gl=ctx.createRadialGradient(pt.x,pt.y,0,pt.x,pt.y,p.size*6);gl.addColorStop(0,'hsla('+p.hue+',80%,70%,0.9)');gl.addColorStop(1,'hsla('+p.hue+',80%,70%,0)');ctx.fillStyle=gl;ctx.beginPath();ctx.arc(pt.x,pt.y,p.size*6,0,Math.PI*2);ctx.fill();ctx.fillStyle='hsla('+p.hue+',90%,85%,0.95)';ctx.beginPath();ctx.arc(pt.x,pt.y,p.size,0,Math.PI*2);ctx.fill();}var pu=0.5+0.5*Math.sin(performance.now()/900),hr=10+pu*3,hg=ctx.createRadialGradient(c.x,c.y,0,c.x,c.y,hr*6);hg.addColorStop(0,'rgba(110,231,183,0.55)');hg.addColorStop(1,'rgba(110,231,183,0)');ctx.fillStyle=hg;ctx.beginPath();ctx.arc(c.x,c.y,hr*6,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(110,231,183,0.9)';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(c.x,c.y,hr,0,Math.PI*2);ctx.stroke();raf=requestAnimationFrame(frame);}
function ds(){ctx.clearRect(0,0,w,h);var c=hub(),g=ctx.createRadialGradient(c.x,c.y,0,c.x,c.y,Math.max(w,h)*0.6);g.addColorStop(0,'rgba(5,150,105,0.18)');g.addColorStop(1,'rgba(3,18,13,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);for(var i=0;i<PATHS;i++)dp(i);ctx.strokeStyle='rgba(110,231,183,0.8)';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(c.x,c.y,11,0,Math.PI*2);ctx.stroke();for(var i=0;i<PATHS;i++){var pt=pp(i,0.5);ctx.fillStyle='rgba(110,231,183,0.85)';ctx.beginPath();ctx.arc(pt.x,pt.y,2.4,0,Math.PI*2);ctx.fill();}}
function start(){if(running||reduced())return;running=true;raf=requestAnimationFrame(frame);}
function stop(){running=false;cancelAnimationFrame(raf);}
resize();init();if(reduced()){ds();}else{start();}
canvas.addEventListener('pointermove',function(e){var r=canvas.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width;pointer.y=(e.clientY-r.top)/r.height;});
window.addEventListener('resize',resize);
var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting&&!reduced())start();else stop();});},{threshold:0.05});io.observe(canvas);
document.addEventListener('visibilitychange',function(){if(document.hidden)stop();else if(!reduced())start();});
// Automation demo
var routes={book:['We text a booking link and add the appointment to your calendar.','A reminder goes out the day before.'],quote:['We reply asking what they need and log it in your pipeline.','You receive an alert to prepare an accurate quote.'],speak:['The conversation is flagged and you are notified.','The customer is told someone will be in touch.'],after:['A polite message with your business hours and booking link is sent.','The lead is waiting in your list the next morning.']};
var flow=document.getElementById('gh-auto-flow');
document.querySelectorAll('.gh-route-btn').forEach(function(btn){
btn.addEventListener('click',function(){
var id=btn.getAttribute('data-route');var isA=btn.getAttribute('aria-pressed')==='true';
document.querySelectorAll('.gh-route-btn').forEach(function(b){b.setAttribute('aria-pressed','false');b.className='gh-route-btn flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all bg-dark-mid/60 border-white/10 text-white/70 hover:border-brand-300/40 hover:text-white';});
if(isA){flow.innerHTML='<p class="text-center text-white/45 text-sm py-8 px-4 rounded-xl border border-dashed border-white/10">Pick a route above to see what happens automatically.</p>';return;}
btn.setAttribute('aria-pressed','true');btn.className='gh-route-btn flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all bg-brand-500/20 border-brand-400 text-white';
var s=routes[id],h='<ol class="flex flex-col gap-3 animate-fadeUp">';
s.forEach(function(st,i){h+='<li class="flex items-start gap-3 p-4 rounded-xl bg-dark-mid/70 border border-brand-300/20"><span class="grid place-items-center w-7 h-7 rounded-full bg-brand-500 text-white text-xs font-bold shrink-0">'+(i+1)+'</span><p class="text-white/85 text-sm leading-relaxed">'+st+'</p></li>';});
h+='<li class="flex items-center gap-2 text-brand-300 text-sm pl-2"><span>→ Then the lead sits, organized, in your list — nothing slips.</span></li></ol>';flow.innerHTML=h;
});
});
`);

// I'll add remaining pages in a second script due to size
for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(OUT, name), content, 'utf-8');
  console.log(`Wrote ${name} (${content.length} bytes)`);
}
console.log('\nDone. Remaining pages in gen-ghl-pages.mjs');
