/* CASA ESCOBEDO — sitio.js · Idioma + menú + lightbox + contacto + fallbacks
   Para páginas interiores. NUNCA en index.html. */
(function(){
  var WA='https://wa.me/527443557005?text='+encodeURIComponent('Hola, me gustaría recibir información sobre Casa Escobedo.');
  var EM='mailto:reservas@casaescobedo.com';
  document.querySelectorAll('.waLink').forEach(function(a){a.href=WA;});
  document.querySelectorAll('.mailLink').forEach(function(a){a.href=EM;a.textContent=EM.replace('mailto:','');});
  document.querySelectorAll('img[data-fb]').forEach(function(im){
    im.addEventListener('error',function(){im.src='https://picsum.photos/seed/'+im.dataset.fb;},{once:true});
  });
  function set(l){
    document.documentElement.lang=l;
    try{localStorage.setItem('ce-lang',l);}catch(e){}
    document.querySelectorAll('.langsw button').forEach(function(b){b.classList.toggle('on',b.dataset.l===l);});
    document.querySelectorAll('.lang').forEach(function(el){
      var s=(el.tagName.toLowerCase()==='span')?'inline':'block';
      el.style.setProperty('display',el.classList.contains(l)?s:'none','important');
    });
  }
  var sv=null;try{sv=localStorage.getItem('ce-lang');}catch(e){}
  set(sv||((navigator.language||'es').toLowerCase().indexOf('en')===0?'en':'es'));
  document.querySelectorAll('.langsw button').forEach(function(b){b.addEventListener('click',function(){set(b.dataset.l);});});
  /* menú */
  var mm=document.getElementById('mm'),bg=document.getElementById('burger');
  if(mm&&bg){
    function co(){mm.classList.remove('open');document.body.classList.remove('lock');bg.setAttribute('aria-expanded','false');}
    bg.addEventListener('click',function(){mm.classList.add('open');document.body.classList.add('lock');bg.setAttribute('aria-expanded','true');});
    var x=document.getElementById('mmX');if(x)x.addEventListener('click',co);
    mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',co);});
  }
  window.addEventListener('scroll',function(){var h=document.getElementById('hd');if(h)h.classList.toggle('sc',scrollY>40);},{passive:true});
  /* lightbox */
  var list=[].slice.call(document.querySelectorAll('.hero img,.gal img,.zrow img'));
  if(!list.length)return;
  var lb=document.createElement('div');lb.id='lb';
  lb.innerHTML='<button class="lb-x" type="button">Cerrar · Close</button>'+
    '<button class="lb-nav lb-prev" type="button" aria-label="Anterior">‹</button>'+
    '<img alt=""><button class="lb-nav lb-next" type="button" aria-label="Siguiente">›</button>'+
    '<span class="lb-count"></span>';
  document.body.appendChild(lb);
  var big=lb.querySelector('img'),cnt=lb.querySelector('.lb-count'),cur=0;
  function show(){var im=list[cur];big.src=im.currentSrc||im.src;big.alt=im.alt||'';cnt.textContent=(cur+1)+' / '+list.length;}
  function cl(){lb.classList.remove('open');document.body.classList.remove('lock');}
  list.forEach(function(im){im.classList.add('z');im.addEventListener('click',function(){cur=list.indexOf(im);show();lb.classList.add('open');document.body.classList.add('lock');});});
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lb-x'))cl();});
  lb.querySelector('.lb-prev').addEventListener('click',function(){cur=(cur-1+list.length)%list.length;show();});
  lb.querySelector('.lb-next').addEventListener('click',function(){cur=(cur+1)%list.length;show();});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')cl();
    if(e.key==='ArrowLeft'){cur=(cur-1+list.length)%list.length;show();}
    if(e.key==='ArrowRight'){cur=(cur+1)%list.length;show();}
  });
})();
