(this.webpackJsonpcolorify=this.webpackJsonpcolorify||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,n){e.exports=n(34)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(6),o=n.n(c),l=(n(20),function(){return a.a.createElement("nav",{className:"top-panel"},a.a.createElement("div",{className:"top-panel__wrapper"},a.a.createElement("header",{className:"top-panel__project-name"},"colorify")))}),u=n(5),i=(n(21),a.a.memo((function(e){var t=e.children,n=e.type,r=e.disabled,c=e.onClick;return a.a.createElement("button",{className:"simple-button",type:n,disabled:r,onClick:c},t)}))),s=(n(22),function(){return a.a.createElement("div",{className:"loader"},a.a.createElement("div",null),a.a.createElement("div",null),a.a.createElement("div",null),a.a.createElement("div",null))}),p=n(4),f=(n(28),n(7)),m=n(13);function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var d=function e(){Object(m.a)(this,e)};d.rgbToHex=function(e){return(e.red<<16|e.green<<8|e.blue).toString(16)},d.rgbToHSL=function(e){var t=e.red,n=e.green,r=e.blue;t/=255,n/=255,r/=255;var a=Math.min(t,n,r),c=Math.max(t,n,r),o=c-a,l=0,u=0;return l=0===o?0:c===t?(n-r)/o%6:c===n?(r-t)/o+2:(t-n)/o+4,(l=Math.round(60*l))<0&&(l+=360),u=(c+a)/2,{hue:l,saturation:+(100*(0===o?0:o/(1-Math.abs(2*u-1)))).toFixed(1),lightness:u=+(100*u).toFixed(1)}},d.getColors=function(e){return new Promise((function(t){for(var n={},r=0;r<300;r++)for(var a=0;a<150;a++){var c=e.getImageData(r,a,1,1).data,o=Object(u.a)(c,3),l={red:o[0],green:o[1],blue:o[2]},i="#"+("000000"+d.rgbToHex(l)).slice(-6),s=d.rgbToHSL(l);n[i]={amount:n[i]?n[i].amount+1:1,HSL:s}}var p=Object.keys(n).map((function(e){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){Object(f.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({HEX:e},n[e])})).sort((function(e,t){return e.amount-t.amount})).reverse();p.forEach((function(e){var t=e.HSL,n=t.hue,r=t.lightness;p=p.filter((function(t){var a=t.HSL,c=a.hue,o=a.lightness;return o>r||o<r?t:c>n-10&&c<n+10&&t!==e?null:t}))})),t(p.splice(0,25))}))};var O=function(e){var t=e.image,n=Object(r.useState)(!1),c=Object(u.a)(n,2),o=c[0],l=c[1],f=Object(p.b)(),m=Object(r.useRef)(null),b=Object(r.useRef)(null),O=Object(r.useRef)(null);return a.a.createElement("section",{className:"upload-panel"},a.a.createElement("div",{className:"upload-panel__top-panel"},o?a.a.createElement(s,null):a.a.createElement(i,{onClick:t?function(){f({type:"CLEAR_IMAGE"}),l(!1);var e=O.current.getContext("2d"),t=m.current;e.clearRect(0,0,300,150),t.src=""}:function(){b.current.click()}},t?"Clear":"Upload")),a.a.createElement("input",{className:"upload-panel__loader",ref:b,type:"file",accept:"image/*",onChange:function(e){var t=e.target,n=new FileReader,r=O.current.getContext("2d"),a=m.current,c=Object(u.a)(t.files,1)[0];a.onload=function(){r.drawImage(a,0,0,300,150),d.getColors(r).then((function(e){f(function(e){return{type:"UPLOAD_IMAGE",payload:e}}(r)),f(function(e){return{type:"CALCULATE_COLORS",payload:e}}(e))}))},n.onloadstart=function(){l(!0)},n.onload=function(){l(!1),a.src=n.result},c&&n.readAsDataURL(c)}}),a.a.createElement("canvas",{className:"upload-panel__loader",ref:O}),a.a.createElement("img",{className:"upload-panel__image".concat(t?" loaded":""),ref:m,alt:""}))},g=(n(29),function(e){var t=e.color.HEX;return a.a.createElement("div",{className:"colors-panel__color",style:{backgroundColor:t}},t)}),E=(n(30),function(e){var t=e.colors;return Object(r.useEffect)((function(){return window.scrollTo(0,document.body.scrollHeight)})),a.a.createElement("section",{className:"colors-panel"},t.map((function(e,t){return a.a.createElement(g,{key:t,color:e})})))}),v=(n(31),function(){var e=Object(p.c)((function(e){return e.app})),t=e.image,n=e.colors;return a.a.createElement("main",{className:"main-panel"},a.a.createElement(O,{image:t}),t&&a.a.createElement(E,{colors:n}))}),y=(n(32),function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(l,null),a.a.createElement(v,null))}),j=n(2);function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){Object(f.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var _={image:null,colors:[]},P=Object(j.combineReducers)({app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPLOAD_IMAGE":return w({},e,{image:t.payload});case"CALCULATE_COLORS":return w({},e,{colors:t.payload});case"CLEAR_IMAGE":return w({},_)}return e}}),C=n(14),L=(n(33),Object(j.createStore)(P,Object(C.composeWithDevTools)(Object(j.applyMiddleware)())));o.a.render(a.a.createElement(p.a,{store:L},a.a.createElement(y,null)),document.getElementById("root"))}],[[15,1,2]]]);
//# sourceMappingURL=main.d1d79ecd.chunk.js.map