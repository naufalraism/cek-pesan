(function(){var h=document.documentElement,b=document.getElementById("ukuran"),on=false;
function set(v){h.setAttribute("data-huruf",v?"besar":"");if(b){b.setAttribute("aria-pressed",v?"true":"false");b.textContent=v?"Huruf normal":"Huruf besar"}}
try{on=localStorage.getItem("huruf")==="besar"}catch(e){}
set(on);
if(b)b.onclick=function(){on=!on;set(on);try{localStorage.setItem("huruf",on?"besar":"")}catch(e){}};
})();
