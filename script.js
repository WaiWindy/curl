javascript:(function(){
  // Remove old menu
  let old=document.getElementById("hackMenu"); if(old) old.remove();

  // Menu container
  let menu=document.createElement("div");
  menu.id="hackMenu";
  menu.style.position="fixed";
  menu.style.top="20px";
  menu.style.right="20px";
  menu.style.background="rgba(0,30,0,0.9)";
  menu.style.color="lime";
  menu.style.padding="12px";
  menu.style.border="2px solid lime";
  menu.style.fontFamily="monospace";
  menu.style.zIndex="999999";
  menu.style.boxShadow="0 0 20px lime";
  menu.style.borderRadius="8px";
  menu.innerHTML="<b>💻 Hack Console v2 💻</b><br>";

  document.body.appendChild(menu);

  // Helper: make button
  function makeBtn(name,fn){
    let b=document.createElement("button");
    b.textContent=name;
    b.style.display="block";
    b.style.margin="6px 0";
    b.style.width="100%";
    b.style.background="black";
    b.style.color="lime";
    b.style.border="1px solid lime";
    b.style.fontFamily="monospace";
    b.onmouseover=()=>{b.style.background="lime";b.style.color="black";};
    b.onmouseout=()=>{b.style.background="black";b.style.color="lime";};
    b.onclick=fn;
    menu.appendChild(b);
  }

  // Hacks
  makeBtn("🌀 Spin Page",()=> {
    document.body.style.transition="all 2s";
    document.body.style.transform="rotate(360deg)";
    setInterval(()=>{document.body.style.transform+=" rotate(360deg)";},2000);
  });

  makeBtn("🌈 Rainbow",()=> {
    setInterval(()=>{document.body.style.backgroundColor=`hsl(${Math.random()*360},100%,70%)`;},300);
  });

  makeBtn("🐱 Cats Everywhere",()=> {
    document.querySelectorAll("img").forEach(img=>{
      img.src="https://placekitten.com/"+(100+Math.floor(Math.random()*200))+"/"+(100+Math.floor(Math.random()*200));
    });
  });

  makeBtn("💣 Gravity Game",()=> {
    var s=document.createElement('script');
    s.src='https://erkie.github.io/asteroids/asteroids.min.js';
    document.body.appendChild(s);
  });

  makeBtn("🎵 Rickroll",()=> {
    window.location="https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  });

  makeBtn("📝 Edit Page",()=> {
    document.body.contentEditable=document.body.contentEditable!=="true";
    alert("Edit mode "+(document.body.contentEditable==="true"?"ENABLED":"DISABLED"));
  });

  makeBtn("🔄 Flip Text",()=> {
    function flip(str){
      var map={'a':'ɐ','b':'q','c':'ɔ','d':'p','e':'ǝ','f':'ɟ','g':'ƃ','h':'ɥ','i':'ᴉ','j':'ɾ','k':'ʞ','l':'ʃ','m':'ɯ','n':'u','o':'o','p':'d','q':'b','r':'ɹ','s':'s','t':'ʇ','u':'n','v':'ʌ','w':'ʍ','x':'x','y':'ʎ','z':'z'};
      return str.split('').map(ch=>map[ch.toLowerCase()]||ch).reverse().join('');
    }
    function walk(n){if(n.nodeType===3){n.nodeValue=flip(n.nodeValue);}else n.childNodes.forEach(walk);}
    walk(document.body);
  });

  makeBtn("🤖 Replace Text",()=> {
    function change(n){
      if(n.nodeType===3){n.nodeValue=n.nodeValue.replace(/\S+/g,"PLEN!");}
      else n.childNodes.forEach(change);
    }
    change(document.body);
  });

  makeBtn("🙈 Hide Images",()=> {
    document.querySelectorAll("img").forEach(img=>img.style.display="none");
  });

  makeBtn("🎉 Party Mode",()=> {
    setInterval(()=>{
      document.body.style.transform=`rotate(${Math.random()*10-5}deg)`;
      document.body.style.backgroundColor=`hsl(${Math.random()*360},100%,70%)`;
    },200);
  });

  // Close button
  makeBtn("❌ Close Menu",()=>menu.remove());
})();
