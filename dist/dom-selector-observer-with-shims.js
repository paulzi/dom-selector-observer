!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.DomSelectorObserver=t():e.DomSelectorObserver=t()}(window,(function(){return n={},e.m=t=[function(e,t,n){"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,a=void 0;try{for(var c,u=e[Symbol.iterator]();!(r=(c=u.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw a}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var a,c=Element.prototype.matches,u=new Map,i=new Map,f=new Map,l=new Map;function d(e,t,n){var r=e.get(t);r||(r=new Map,e.set(t,r)),r.set(n,!0),l.set(t,!0)}function s(e,t,n){var r;n?(r=e.get(t))&&r.delete(n):e.delete(t);var o=!1;[u,f,i].forEach((function(e){var n=e.get(t);n&&0<n.size&&(o=!0)})),o||l.delete(t)}function p(e){var t=new Map;e.forEach((function(e){for(var n=Node.ELEMENT_NODE,r=e.removedNodes,o=e.addedNodes,a=0;a<r.length;a++){var c=r[a];c.nodeType===n&&v(t,c)}for(var u=0;u<o.length;u++){var i=o[u];i.nodeType===n&&v(t,i)}})),y(t)}function v(e,t){l.forEach((function(n,r){c.call(t,r)&&m(e,t,r);for(var o=t.querySelectorAll(r),a=0;a<o.length;a++)m(e,o[a],r)}))}function m(e,t,n){var r=e.get(n);r||(r=new Map,e.set(n,r)),r.set(t,!0)}function y(e){var t="_dom-selector-observer",n=new Map;e.forEach((function(e,o){e.forEach((function(e,a){var c,l,d,s;n.has(a)?(l=(c=r(n.get(a),2))[0],d=c[1]):(l=a[t],d=document.documentElement.contains(a),a[t]=d,n.set(a,[l,d]));var p=(s=d?l?i:u:l?f:null)&&s.get(o);p&&p.forEach((function(e,t){t(a)}))}))}))}t.a={setShim:function(e){c=e||c},addAttachHandler:function(e,t){d(u,e,t)},removeAttachHandler:function(e,t){s(u,e,t)},addMoveHandler:function(e,t){d(i,e,t)},removeMoveHandler:function(e,t){s(i,e,t)},addDetachHandler:function(e,t){d(f,e,t)},removeDetachHandler:function(e,t){s(f,e,t)},observe:function(e){if(a)throw new Error("dom-selector-observer already watch");var t;return(a=new MutationObserver(p)).observe(document,{childList:!0,subtree:!0}),e&&(v(t=new Map,document.documentElement),y(t)),a},unobserve:function(){a.disconnect(),a=null}}},,function(e,t,n){"use strict";n.r(t);var r,o=(r=Element.prototype).matches||r.matchesSelector||r.webkitMatchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector,a=n(0);a.a.setShim(o),t.default=a.a}],e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(e){return t[e]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e.p="",e(e.s=2);function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var t,n}));