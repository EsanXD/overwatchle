"use strict";(self.webpackChunkoverwatchle=self.webpackChunkoverwatchle||[]).push([[8438],{7113:(t,e,n)=>{n.d(e,{L:()=>s});var r=n(4409);const a=0,o=0;class s{draw(t){const{particle:e,radius:n}=t;!function(t,e,n){const{context:s}=t,u=n.count.numerator*n.count.denominator,i=n.count.numerator/n.count.denominator,c=180*(i-2)/i,l=Math.PI-(0,r.pu)(c);if(s){s.beginPath(),s.translate(e.x,e.y),s.moveTo(a,o);for(let t=0;t<u;t++)s.lineTo(n.length,o),s.translate(n.length,o),s.rotate(l)}}(t,this.getCenter(e,n),this.getSidesData(e,n))}getSidesCount(t){var e;const n=t.shapeData;return Math.round((0,r.VG)(null!==(e=null===n||void 0===n?void 0:n.sides)&&void 0!==e?e:5))}}},8438:(t,e,n)=>{n.d(e,{TriangleDrawer:()=>a});var r=n(7113);class a extends r.L{getCenter(t,e){return{x:-e,y:e/1.66}}getSidesCount(){return 3}getSidesData(t,e){return{count:{denominator:2,numerator:3},length:2*e}}}}}]);
//# sourceMappingURL=8438.a851afd6.chunk.js.map