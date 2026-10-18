var EX=[
"Paket anda gagal dikirim karena alamat tidak lengkap. Segera konfirmasi ulang di https://cek-resi-jnt.top/id dalam 24 jam atau paket dikembalikan.",
"Kepada Yth. Bapak/Ibu, terlampir undangan pernikahan digital kami. Silakan unduh dan instal undangan_digital.apk untuk melihat detail acara.",
"SELAMAT! Nomor Anda terpilih sebagai pemenang undian BRI hadiah Rp50.000.000. Klaim hadiah di bit.ly/hadiah-bri dan kirim kode OTP yang masuk untuk verifikasi.",
"Hai ini nomor baru aku ya, hp lama rusak. Tolong transfer dulu Rp1.500.000 ke rekening BCA 1234567890 a.n. Budi, segera ya soalnya penting banget.",
"S3LAMAT! Anda t3rpilih mendapat h4diah. Kirim k0de 0TP ke admin untuk kl4im."
];
var LINK=/\b(?:https?:\/\/|www\.)\S+|\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|id|co\.id|net|org|xyz|top|click|icu|site|online|cc|vip|link|me|ly|gl|app|info|biz|shop|store|buzz|cfd|sbs)\b(?:\/\S*)?/gi;
var RULES=[];
function muatPola(){return fetch("pola.json").then(function(r){return r.json()}).then(function(d){RULES=d.aturan.map(function(r){r.re=new RegExp(r.pola,r.flags);return r})})}
var $=function(i){return document.getElementById(i)};
var DISG=/[\u200B-\u200D\uFEFF\u2060\u0430\u0435\u043E\u0440\u0441\u0445\u0456\u0443\u0455\u0501\uFF21-\uFF5A]|[\u{1D400}-\u{1D7FF}]/u;
function fold(s){var m={"\u0430":"a","\u0435":"e","\u043E":"o","\u0440":"p","\u0441":"c","\u0445":"x","\u0456":"i","\u0443":"y","\u0455":"s","\u0501":"d"};return s.replace(/[\u200B-\u200D\uFEFF\u2060]/g,"").normalize("NFKC").replace(/[\u0430\u0435\u043E\u0440\u0441\u0445\u0456\u0443\u0455\u0501]/g,function(c){return m[c]})}
function leet(s){var m={"0":"o","1":"i","3":"e","4":"a","5":"s","7":"t","@":"a","$":"s"},L=/[a-z]/i,o="";for(var i=0;i<s.length;i++){var c=s.charAt(i);o+=(m[c]&&(L.test(s.charAt(i-1))||L.test(s.charAt(i+1))))?m[c]:c}return o}
function esc(s){return s.replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function find(re,text){var r=[],m;re.lastIndex=0;while((m=re.exec(text))){if(m[0].length===0){re.lastIndex++;continue}r.push([m.index,m.index+m[0].length])}return r}
function merge(rs){rs.sort(function(a,b){return a[0]-b[0]});var o=[];rs.forEach(function(r){var l=o[o.length-1];if(l&&r[0]<=l[1]){l[1]=Math.max(l[1],r[1])}else{o.push([r[0],r[1]])}});return o}
function analyze(text,disg){
  var hits=[],ranges=[],score=0,lt=leet(text);
  RULES.forEach(function(r){var f=find(r.re,text).concat(find(r.re,lt));if(f.length){hits.push(r);score+=r.w;ranges=ranges.concat(f)}});
  if(disg){score+=10;hits.push({k:"disg",w:10,t:"Memakai huruf atau karakter yang disamarkan",y:"Pesan memuat huruf kembar dari alfabet lain atau karakter tak terlihat, biasanya untuk mengelabui filter spam.",a:"Perlakukan pesan ini dengan ekstra hati-hati."})}
  var links=(text.match(LINK)||[]);var PH=/(?:\+62|\b62|\b0)8\d[\d\s-]{7,12}\d/g;var phones=(text.match(PH)||[]).map(function(s){return s.replace(/[\s-]+/g,"")});var t2=text.replace(PH," "),accts=(t2.match(/\b\d{10,16}\b/g)||[]).concat((t2.match(/\b\d{3,5}(?:[ -]\d{3,5}){1,4}\b/g)||[]).filter(function(s){var n=s.replace(/\D/g,"").length;return n>=10&&n<=16}));
  var keys=hits.map(function(h){return h.k});
  var hasLink=links.length>0||keys.indexOf("apk")>-1;
  var bait=["urg","gift","pkg","org","otp"].some(function(k){return keys.indexOf(k)>-1});
  if(hasLink&&bait)score+=15;
  if(links.length&&!hits.length)score+=5;
  if(accts.length&&keys.indexOf("ask")>-1)score+=10;
  return{score:Math.min(100,score),hits:hits,ranges:merge(ranges),links:links.map(function(l){return l.replace(/[.,;)]+$/,"")}),hasLink:hasLink,phones:phones,accts:accts};
}
function level(s){
  if(s>=50)return{c:"bad",t:"Sangat mencurigakan, kemungkinan besar penipuan",d:"Pesan ini memuat beberapa ciri penipuan sekaligus. Jangan klik, jangan balas, dan jangan memberikan data apa pun."};
  if(s>=20)return{c:"warn",t:"Ada tanda penipuan, jangan diklik dulu",d:"Beberapa ciri mirip modus penipuan. Verifikasi lewat jalur resmi sebelum melakukan apa pun."};
  if(s>0)return{c:"warn",t:"Ada sedikit tanda yang perlu diperhatikan",d:"Belum cukup untuk menyebutnya penipuan, tapi tetap hati-hati dan pastikan pengirimnya."};
  return{c:"ok",t:"Tidak ada pola penipuan yang dikenali",d:"Ini bukan jaminan aman. Kalau pesan meminta uang, data, atau memasang sesuatu, tetap verifikasi ke pengirimnya."};
}
function highlight(text,rs){var o="",p=0;rs.forEach(function(r){o+=esc(text.slice(p,r[0]))+"<mark>"+esc(text.slice(r[0],r[1]))+"</mark>";p=r[1]});return o+esc(text.slice(p))}
var last="";
function run(){
  if(!RULES.length){muatPola().then(run).catch(function(){$("out").innerHTML='<p class="small">Daftar pola gagal dimuat. Buka situs lewat hosting atau server lokal, bukan langsung dari file.</p>'});return}
  var raw=$("in").value.trim(),text=fold(raw),out=$("out");
  if(!text){out.innerHTML='<p class="small">Tempel pesan dulu, lalu tekan Periksa pesan.</p>';return}
  var a=analyze(text,DISG.test(raw)),L=level(a.score),h="";
  h+='<div class="verdict '+L.c+'"><h2>'+L.t+'</h2><p>'+L.d+'</p><div class="meter" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+a.score+'" aria-label="Tingkat kecurigaan"><span style="width:0%" data-w="'+a.score+'"></span></div><div class="small" style="color:inherit">Tingkat kecurigaan: '+a.score+' dari 100</div></div>';
  h+='<h2>Pesan yang kamu tempel</h2><div class="msg">'+highlight(text,a.ranges)+'</div>';
  if(a.ranges.length)h+='<p class="small">Bagian yang diberi warna kuning adalah yang memicu peringatan.</p>';
  if(a.links.length){h+='<h2>Tautan di dalam pesan</h2><p class="links">'+a.links.map(function(l){return"<code>"+esc(l)+"</code>"}).join(" ")+'</p><p class="small">Tautan ini tidak dibuka oleh Cek Pesan. Periksa alamatnya sebelum memutuskan apa pun.</p>'}
  if(a.phones.length||a.accts.length){h+='<h2>Nomor di dalam pesan</h2><p class="links">'+a.phones.concat(a.accts).map(function(n){return"<code>"+esc(n)+"</code>"}).join(" ")+'</p><p class="small">Cek nomor rekening tujuan di <a href="https://cekrekening.id" target="_blank" rel="noopener">cekrekening.id</a> sebelum mentransfer, dan laporkan nomor penipu lewat Indonesia Anti-Scam Centre (IASC) milik OJK. Cek Pesan tidak mengecek otomatis supaya nomor ini tidak keluar dari browsermu.</p>'}
  if(a.hits.length){h+='<h2>Alasannya</h2><ul class="reasons">'+a.hits.map(function(r){return"<li><b>"+r.t+"</b>"+r.y+"</li>"}).join("")+"</ul>"}
  var acts=a.hits.map(function(r){return r.a});
  acts.push("Blokir dan laporkan pengirim. Kalau sudah terlanjur transfer, hubungi bank dan cek rekening tujuan di cekrekening.id.");
  h+='<h2>Sebaiknya kamu</h2><ul>'+acts.map(function(x){return"<li>"+esc(x)+"</li>"}).join("")+"</ul>";
  h+='<div class="row"><button class="primary" id="cp">Salin ringkasan untuk dibagikan</button></div>';
  out.innerHTML=h;
  last="Hasil Cek Pesan: "+L.t+" (kecurigaan "+a.score+"/100).\n"+(a.hits.length?"Alasan: "+a.hits.map(function(r){return r.t}).join("; ")+".\n":"")+"Jangan klik tautan atau memasang file dari pesan itu sebelum diverifikasi.";
  $("cp").onclick=copy;
  requestAnimationFrame(function(){var s=out.querySelector(".meter span");if(s)s.style.width=s.getAttribute("data-w")+"%"});
  out.scrollIntoView({block:"start"});
}
function copy(){
  var b=$("cp");
  function done(){b.textContent="Tersalin"}
  function fb(){try{var t=document.createElement("textarea");t.value=last;document.body.appendChild(t);t.select();document.execCommand("copy");document.body.removeChild(t);done()}catch(e){b.textContent="Gagal menyalin, salin manual"}}
  try{navigator.clipboard.writeText(last).then(done,fb)}catch(e){fb()}
}
$("go").onclick=run;
$("clr").onclick=function(){$("in").value="";$("out").innerHTML="";$("in").focus()};
Array.prototype.forEach.call(document.querySelectorAll(".ex"),function(b){b.onclick=function(){$("in").value=EX[+b.getAttribute("data-ex")];run()}});
