!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.DomSelectorObserver=t():e.DomSelectorObserver=t()}(window,(function(){return n={},e.m=t=[function(e,t,n){"use strict";var o,r=Element.prototype.matches,c=new Map,a=new Map,u=new Map,f=new Map;function i(e,t,n){var o=e.get(t);o||(o=new Map,e.set(t,o)),o.set(n,!0),f.set(t,!0)}function l(e,t,n){var o;n?(o=e.get(t))&&o.delete(n):e.delete(t);var r=!1;[c,u,a].forEach((function(e){var n=e.get(t);n&&0<n.size&&(r=!0)})),r||f.delete(t)}function d(e){var t=new Map;e.forEach((function(e){for(var n=Node.ELEMENT_NODE,o=e.removedNodes,r=e.addedNodes,c=0;c<o.length;c++){var a=o[c];a.nodeType===n&&s(t,a)}for(var u=0;u<r.length;u++){var f=r[u];f.nodeType===n&&s(t,f)}})),v(t)}function s(e,t){f.forEach((function(n,o){r.call(t,o)&&p(e,t,o);for(var c=t.querySelectorAll(o),a=0;a<c.length;a++)p(e,c[a],o)}))}function p(e,t,n){var o=e.get(n);o||(o=new Map,e.set(n,o)),o.set(t,!0)}function v(e){var t="_dom-selector-observer";e.forEach((function(e,n){e.forEach((function(e,o){var r,f=o[t],i=document.documentElement.contains(o),l=(r=(o[t]=i)?f?a:c:f?u:null)&&r.get(n);l&&l.forEach((function(e,t){t(o)}))}))}))}t.a={setShim:function(e){r=e||r},addAttachHandler:function(e,t){i(c,e,t)},removeAttachHandler:function(e,t){l(c,e,t)},addMoveHandler:function(e,t){i(a,e,t)},removeMoveHandler:function(e,t){l(a,e,t)},addDetachHandler:function(e,t){i(u,e,t)},removeDetachHandler:function(e,t){l(u,e,t)},observe:function(e){if(o)throw new Error("dom-selector-observer already watch");var t;return(o=new MutationObserver(d)).observe(document,{childList:!0,subtree:!0}),e&&(s(t=new Map,document.documentElement),v(t)),o},unobserve:function(){o.disconnect(),o=null}}},,function(e,t,n){"use strict";n.r(t);var o,r=(o=Element.prototype).matches||o.matchesSelector||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector,c=n(0);c.a.setShim(r),t.default=c.a}],e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(o,r,function(e){return t[e]}.bind(null,r));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e.p="",e(e.s=2);function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var t,n}));