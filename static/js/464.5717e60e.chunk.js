"use strict";(self.webpackChunkoverwatchle=self.webpackChunkoverwatchle||[]).push([[464],{1977:(e,a,n)=>{n.d(a,{a:()=>d,d:()=>l,loadImage:()=>c});var o=n(4409);const r=0,t=1,i=/(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;async function c(e){return new Promise((a=>{e.loading=!0;const n=new Image;e.element=n,n.addEventListener("load",(()=>{e.loading=!1,a()})),n.addEventListener("error",(()=>{e.element=void 0,e.error=!0,e.loading=!1,(0,o.tZ)().error("".concat(o.dI," loading image: ").concat(e.source)),a()})),n.src=e.source}))}async function d(e){if("svg"!==e.type)return void await c(e);e.loading=!0;const a=await fetch(e.source);a.ok?e.svgData=await a.text():((0,o.tZ)().error("".concat(o.dI," Image not found")),e.error=!0),e.loading=!1}function l(e,a,n,d){var l,s;const g=function(e,a,n){const{svgData:t}=e;if(!t)return"";const c=(0,o.LC)(a,n);if(t.includes("fill"))return t.replace(i,(()=>c));const d=t.indexOf(">");return"".concat(t.substring(r,d),' fill="').concat(c,'"').concat(t.substring(d))}(e,n,null!==(l=null===(s=d.opacity)||void 0===s?void 0:s.value)&&void 0!==l?l:t),u={color:n,gif:a.gif,data:{...e,svgData:g},loaded:!1,ratio:a.width/a.height,replaceColor:a.replaceColor,source:a.src};return new Promise((a=>{const n=new Blob([g],{type:"image/svg+xml"}),o=URL||window.URL||window.webkitURL||window,r=o.createObjectURL(n),t=new Image;t.addEventListener("load",(()=>{u.loaded=!0,u.element=t,a(u),o.revokeObjectURL(r)}));t.addEventListener("error",(()=>{(async()=>{o.revokeObjectURL(r);const n={...e,error:!1,loading:!0};await c(n),u.loaded=!0,u.element=n.element,a(u)})()})),t.src=r}))}},464:(e,a,n)=>{n.d(a,{loadImageShape:()=>i});var o=n(1977),r=n(4409);const t=3;async function i(e){let a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];!function(e){e.loadImage||(e.loadImage=async a=>{if(!a.name&&!a.src)throw new Error("".concat(r.dI," no image source provided"));if(e.images||(e.images=[]),!e.images.find((e=>e.name===a.name||e.source===a.src)))try{var i,c;const r={gif:null!==(i=a.gif)&&void 0!==i&&i,name:null!==(c=a.name)&&void 0!==c?c:a.src,source:a.src,type:a.src.substring(a.src.length-t),error:!1,loading:!0,replaceColor:a.replaceColor,ratio:a.width&&a.height?a.width/a.height:void 0};let d;if(e.images.push(r),a.gif){const{loadGifImage:e}=await n.e(463).then(n.bind(n,463));d=e}else d=a.replaceColor?o.a:o.loadImage;await d(r)}catch{var d;throw new Error("".concat(r.dI," ").concat(null!==(d=a.name)&&void 0!==d?d:a.src," not found"))}})}(e);const{ImagePreloaderPlugin:i}=await n.e(4843).then(n.bind(n,4843)),{ImageDrawer:c}=await n.e(4752).then(n.bind(n,4752)),d=new i(e);await e.addPlugin(d,a),await e.addShape(["image","images"],new c(e),a)}}}]);
//# sourceMappingURL=464.5717e60e.chunk.js.map