(()=>{"use strict";!function(e){let t=0,n=!1;e.querySelector(".button").addEventListener("click",(l=>{l.preventDefault(),n?v():(o.classList.add("spin"),setTimeout((()=>{o.classList.remove("spin")}),2e3),function(){const n=function(){let e=0;for(const t of c)t&&++e;return 0===e||4===e?"None":1===e||3===e?"One":2===e&&c[1]===c[3]?"Diagonal":"Side"}(),o=[!1,!1,!1];for(let e=0;e<3;++e)r[e]&&d(o,f(n,e));r=o,++t,p(r,[!1,!1,!1])&&v(),function(){for(let e=0;e<4;++e)c[e]=!0;e.querySelectorAll(".circle").forEach((e=>e.classList.remove("flipped"))),e.querySelector(".counter").innerHTML=function(e){return"Move "+e}(t)}()}())}));const o=e.querySelector(".table"),c=[!0,!0,!0,!0];let r=[!0,!0,!0];const l=e.querySelector(".circle1");l.addEventListener("click",(e=>{e.preventDefault(),n||(l.classList.toggle("flipped"),a(0))}));const i=e.querySelector(".circle3");i.addEventListener("click",(e=>{e.preventDefault(),n||(i.classList.toggle("flipped"),a(1))}));const s=e.querySelector(".circle4");s.addEventListener("click",(e=>{e.preventDefault(),n||(s.classList.toggle("flipped"),a(2))}));const u=e.querySelector(".circle2");function a(e){c[e]=!c[e]}function f(e,t){if("None"===e){const e=[!1,!1,!1];return e[t]=!0,e}return"One"===e?0===t?[!1,!0,!0]:[!0,!1,!1]:"Diagonal"===e&&0===t?[!0,!1,!1]:"Diagonal"===e&&1===t?[!1,!1,!1]:"Diagonal"===e&&2===t?[!1,!1,!0]:"Side"===e&&0===t?[!0,!1,!1]:"Side"===e&&1===t?[!1,!1,!0]:"Side"===e&&2===t?[!1,!0,!1]:void alert("Wrong combination "+e+" "+t)}function d(e,t){for(let n=0;n<3;++n)e[n]=e[n]||t[n]}u.addEventListener("click",(e=>{e.preventDefault(),n||(u.classList.toggle("flipped"),a(3))}));const p=(e,t)=>e.length===t.length&&e.every(((e,n)=>e===t[n]));function v(){const o="You win in "+t+" moves!",c=e.querySelector("#my-popover");c.querySelector("p").innerText=o,c.showPopover(),n=!0}}(document)})();