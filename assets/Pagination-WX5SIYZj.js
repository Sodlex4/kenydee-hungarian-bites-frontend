import{j as s,c as m}from"./vendor-ui-BOOqW7iA.js";import{c as t,j as b}from"./index-D5bIZ9Hs.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=t("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=t("ChevronsLeft",[["path",{d:"m11 17-5-5 5-5",key:"13zhaf"}],["path",{d:"m18 17-5-5 5-5",key:"h8a8et"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=t("ChevronsRight",[["path",{d:"m6 17 5-5-5-5",key:"xnjwq"}],["path",{d:"m13 17 5-5-5-5",key:"17xmmf"}]]),j=({currentPage:l,totalPages:e,totalItems:i,itemsPerPage:a,onPageChange:r})=>{if(e<=1)return null;const n=(l-1)*a+1,c=Math.min(l*a,i),d=[];for(let o=1;o<=e;o++)o===1||o===e||o>=l-1&&o<=l+1?d.push(o):d[d.length-1]!=="..."&&d.push("...");return s.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-between gap-4 mt-4",children:[s.jsxs("p",{className:"text-sm",style:{color:"hsl(var(--muted-foreground))"},children:["Showing ",n,"-",c," of ",i]}),s.jsxs("div",{className:"flex items-center gap-1",children:[s.jsx("button",{onClick:()=>r(1),disabled:l===1,className:"p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted","aria-label":"First page",children:s.jsx(x,{className:"w-4 h-4",style:{color:"hsl(var(--foreground))"}})}),s.jsx("button",{onClick:()=>r(l-1),disabled:l===1,className:"p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted","aria-label":"Previous page",children:s.jsx(u,{className:"w-4 h-4",style:{color:"hsl(var(--foreground))"}})}),d.map((o,h)=>s.jsx(m.Fragment,{children:o==="..."?s.jsx("span",{className:"px-2",style:{color:"hsl(var(--muted-foreground))"},children:"..."}):s.jsx("button",{onClick:()=>r(o),className:`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${l===o?"text-white":"hover:bg-muted"}`,style:l===o?{background:"var(--gradient-primary)"}:{color:"hsl(var(--foreground))"},children:o})},h)),s.jsx("button",{onClick:()=>r(l+1),disabled:l===e,className:"p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted","aria-label":"Next page",children:s.jsx(b,{className:"w-4 h-4",style:{color:"hsl(var(--foreground))"}})}),s.jsx("button",{onClick:()=>r(e),disabled:l===e,className:"p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted","aria-label":"Last page",children:s.jsx(f,{className:"w-4 h-4",style:{color:"hsl(var(--foreground))"}})})]})]})};export{j as P};
