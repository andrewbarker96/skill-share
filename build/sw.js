if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const a=s=>l(s,r),u={module:{uri:r},exports:t,require:a};e[r]=Promise.all(i.map((s=>u[s]||a(s)))).then((s=>(n(...s),t)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/focus-visible-legacy-CdO5cX4I.js",revision:null},{url:"assets/focus-visible-supuXXMI.js",revision:null},{url:"assets/index-CBydu5mY.css",revision:null},{url:"assets/index-legacy-Cm9wsPyS.js",revision:null},{url:"assets/index-qO-LIEPq.js",revision:null},{url:"assets/index9-CXe-n2OW.js",revision:null},{url:"assets/index9-legacy-uNgo2Oc8.js",revision:null},{url:"assets/input-shims-C5EODLdd.js",revision:null},{url:"assets/input-shims-legacy-Bj7sdai4.js",revision:null},{url:"assets/ios.transition-legacy-tffDjYzm.js",revision:null},{url:"assets/ios.transition-QOt87-nc.js",revision:null},{url:"assets/md.transition-BW594bWQ.js",revision:null},{url:"assets/md.transition-legacy-BC9wt70u.js",revision:null},{url:"assets/polyfills-legacy-DHBLyiWZ.js",revision:null},{url:"assets/pwa-action-sheet.entry-legacy-BMHgOkT1.js",revision:null},{url:"assets/pwa-action-sheet.entry-NrCXav24.js",revision:null},{url:"assets/pwa-camera-modal-instance.entry-Dcoe8lgb.js",revision:null},{url:"assets/pwa-camera-modal-instance.entry-legacy-Bsy0Sl2P.js",revision:null},{url:"assets/pwa-camera-modal.entry-jTW2DnCQ.js",revision:null},{url:"assets/pwa-camera-modal.entry-legacy-C3ej3joe.js",revision:null},{url:"assets/pwa-camera.entry-DdegLBuI.js",revision:null},{url:"assets/pwa-camera.entry-legacy-C08UBp3w.js",revision:null},{url:"assets/pwa-toast.entry-CJZ0Pegq.js",revision:null},{url:"assets/pwa-toast.entry-legacy-B3OM0C3S.js",revision:null},{url:"assets/status-tap-DcMMd44v.js",revision:null},{url:"assets/status-tap-legacy-BT2pTU7W.js",revision:null},{url:"assets/swipe-back-DHyQ27JC.js",revision:null},{url:"assets/swipe-back-legacy-BaE8sDV_.js",revision:null},{url:"index.html",revision:"3735d4bf51faadb9551199c4a5463e1f"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"7721fa7741a81beb0adce2c0094d6135"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
