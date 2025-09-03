(function(){
  // Remove old menu
  let old=document.getElementById("hackMenu"); if(old) old.remove();

  // Hack Menu container
  let menu=document.createElement("div");
  menu.id="hackMenu";
  menu.style.position="fixed";
  menu.style.top="20px";
  menu.style.right="20px";
  menu.style.width="250px";
  menu.style.maxHeight="90vh";
  menu.style.overflowY="auto";
  menu.style.background="rgba(0,30,0,0.95)";
  menu.style.color="lime";
  menu.style.padding="12px";
  menu.style.border="2px solid lime";
  menu.style.fontFamily="monospace";
  menu.style.zIndex="999999";
  menu.style.boxShadow="0 0 20px lime";
  menu.style.borderRadius="8px";
  menu.style.animation="hackFade 0.5s";
  menu.innerHTML="<b>Hack Menu v3 By WaiWindy</b><br>";

  // Tabs
  let tabs=document.createElement("div");
  tabs.style.display="flex";
  tabs.style.justifyContent="space-between";
  tabs.style.margin="5px 0";
  ["Text","Visual","Media","Easter"].forEach((t,i)=>{
    let b=document.createElement("button");
    b.textContent=t;
    b.style.flex="1";
    b.style.margin="0 2px";
    b.style.background="black";
    b.style.color="lime";
    b.style.border="1px solid lime";
    b.style.fontFamily="monospace";
    b.onmouseover=()=>{b.style.background="lime";b.style.color="black";};
    b.onmouseout=()=>{b.style.background="black";b.style.color="lime";};
    b.onclick=()=>showTab(t);
    tabs.appendChild(b);
  });
  menu.appendChild(tabs);

  // Content area
  let content=document.createElement("div");
  menu.appendChild(content);

  document.body.appendChild(menu);

  function clearContent(){ content.innerHTML=""; }

  function makeBtn(name,fn){
    let b=document.createElement("button");
    b.textContent=name;
    b.style.display="block";
    b.style.margin="4px 0";
    b.style.width="100%";
    b.style.background="black";
    b.style.color="lime";
    b.style.border="1px solid lime";
    b.style.fontFamily="monospace";
    b.onmouseover=()=>{b.style.background="lime";b.style.color="black";};
    b.onmouseout=()=>{b.style.background="black";b.style.color="lime";};
    b.onclick=fn;
    content.appendChild(b);
  }

  function showTab(tab){
    clearContent();
    if(tab==="Text"){
      makeBtn("📝 Edit Page",()=>{ document.body.contentEditable=document.body.contentEditable!=="true"; alert("Edit mode "+(document.body.contentEditable==="true"?"ENABLED":"DISABLED")); });
      makeBtn("🔄 Flip Text",()=>{ function flip(str){var map={'a':'ɐ','b':'q','c':'ɔ','d':'p','e':'ǝ','f':'ɟ','g':'ƃ','h':'ɥ','i':'ᴉ','j':'ɾ','k':'ʞ','l':'ʃ','m':'ɯ','n':'u','o':'o','p':'d','q':'b','r':'ɹ','s':'s','t':'ʇ','u':'n','v':'ʌ','w':'ʍ','x':'x','y':'ʎ','z':'z'};return str.split('').map(ch=>map[ch.toLowerCase()]||ch).reverse().join('')} function walk(n){if(n.nodeType===3){n.nodeValue=flip(n.nodeValue);}else n.childNodes.forEach(walk);} walk(document.body); });
      makeBtn("🤖 Replace Text",()=>{ function change(n){ if(n.nodeType===3){ n.nodeValue=n.nodeValue.replace(/\S+/g,"HACKED!"); } else n.childNodes.forEach(change);} change(document.body); });
      makeBtn("😀 Random Emoji",()=>{ let emojis=["😀","🚀","🔥","🤓","🥀","😂","💀","😎"]; function change(n){ if(n.nodeType===3){ n.nodeValue=n.nodeValue.replace(/\S+/g,()=>emojis[Math.floor(Math.random()*emojis.length)]); } else n.childNodes.forEach(change);} change(document.body); });
      makeBtn("✨ Blink Text",()=>{ let s=document.createElement("style"); s.id="blinkStyle"; s.innerHTML="*{animation:blink 1s infinite;}@keyframes blink{0%,50%,100%{opacity:1;}25%,75%{opacity:0;}}"; document.head.appendChild(s); });
    } else if(tab==="Visual"){
      makeBtn("🌀 Spin Page",()=>{ document.body.style.transition="all 2s"; document.body.style.transform="rotate(360deg)"; setInterval(()=>{document.body.style.transform+=" rotate(360deg)";},2000); });
      makeBtn("🌈 Rainbow Background",()=>{ setInterval(()=>{document.body.style.backgroundColor=`hsl(${Math.random()*360},100%,70%)`; },300); });
      makeBtn("🎉 Party Mode",()=>{ setInterval(()=>{ document.body.style.transform=`rotate(${Math.random()*10-5}deg)`; document.body.style.backgroundColor=`hsl(${Math.random()*360},100%,70%)`; },200); });
      makeBtn("🖤 Invert Colors",()=>{ document.body.style.filter="invert(1)"; });
      makeBtn("💻 Matrix Overlay",()=>{ if(!document.getElementById("matrixCanvas")){ let c=document.createElement("canvas"); c.id="matrixCanvas"; c.style.position="fixed"; c.style.top=0; c.style.left=0; c.width=window.innerWidth; c.height=window.innerHeight; c.style.zIndex=999998; c.style.pointerEvents="none"; document.body.appendChild(c); let ctx=c.getContext("2d"); let cols=c.width/20; let y=[]; for(let i=0;i<cols;i++){y[i]=Math.random()*c.height;} setInterval(()=>{ctx.fillStyle="rgba(0,0,0,0.05)"; ctx.fillRect(0,0,c.width,c.height); ctx.fillStyle="lime"; ctx.font="20px monospace"; for(let i=0;i<y.length;i++){let text=String.fromCharCode(33+Math.random()*94); ctx.fillText(text,i*20,y[i]); y[i]+=20; if(y[i]>c.height)y[i]=0;} },50); } });
      makeBtn("🤪 Shake Page",()=>{ setInterval(()=>{ document.body.style.transform=`translate(${Math.random()*10-5}px,${Math.random()*10-5}px)`; },100); });
      makeBtn("🔄 Mirror Page",()=>{ document.body.style.transform="scaleX(-1)"; });
    } else if(tab==="Media"){
      makeBtn("🐱 Cats Everywhere",()=>{ document.querySelectorAll("img").forEach(img=>{ img.src="https://placekitten.com/"+(100+Math.floor(Math.random()*200))+"/"+(100+Math.floor(Math.random()*200)); }); });
      makeBtn("🙈 Hide Images",()=>{ document.querySelectorAll("img").forEach(img=>img.style.display="none"); });
      makeBtn("🎵 Rickroll",()=>{ window.location="https://www.youtube.com/watch?v=dQw4w9WgXcQ"; });
      makeBtn("🎬 Swap GIFs",()=>{ document.querySelectorAll("img").forEach(img=>{ if(img.src.endsWith(".gif")) img.src="https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif"; }); });
      makeBtn("🔍 Image Zoom",()=>{ document.querySelectorAll("img").forEach(img=>img.style.transform="scale(1.5)"); });
    } else if(tab==="Easter"){
      makeBtn("🎲 Random Word Storm",()=>{ let words=["ATTACK","HAHA","EZ","HACK","LOL","OMG"]; function change(n){ if(n.nodeType===3){ n.nodeValue=n.nodeValue.replace(/\S+/g,()=>words[Math.floor(Math.random()*words.length)]);} else n.childNodes.forEach(change);} change(document.body); });
      makeBtn("🕹️ Floating Elements",()=>{ document.querySelectorAll("div,p,img,span").forEach(el=>{ el.style.position="relative"; setInterval(()=>{ el.style.top=(Math.random()*20-10)+"px"; el.style.left=(Math.random()*20-10)+"px"; },300); }); });
      makeBtn("💨 Disappearing Page",()=>{ setInterval(()=>{ document.body.style.opacity=Math.random(); },500); });
      makeBtn("👻 Invisible Cursor",()=>{ document.body.style.cursor="none"; });
      makeBtn("❌ Close Menu",()=>menu.remove());
    }
  }

  // Show default tab
  showTab("Text");
})();
