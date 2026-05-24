import{c as n,a as t}from"./index-1c6_wJfY.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=n("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]),o={order:"order",info:"user",alert:"alert"};async function s(){return(await t.get("/notifications")).map(i=>({...i,type:o[i.type]||"alert"}))}async function r(a){await t.patch(`/notifications/${a}/read`)}async function f(){await t.patch("/notifications/read-all")}async function l(a){await t.delete(`/notifications/${a}`)}export{c as D,r as a,l as d,s as g,f as m};
