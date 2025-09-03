(function(){
  // Remove old menu if exists
  let old=document.getElementById("fakeRobloxMenu"); if(old) old.remove();

  // Panel container
  let panel=document.createElement("div");
  panel.id="fakeRobloxMenu";
  panel.style.position="fixed";
  panel.style.top="50px";
  panel.style.left="50px";
  panel.style.width="300px";
  panel.style.background="#111";
  panel.style.color="lime";
  panel.style.padding="10px";
  panel.style.border="2px solid lime";
  panel.style.fontFamily="monospace";
  panel.style.zIndex="999999";
  panel.style.borderRadius="8px";
  panel.style.boxShadow="0 0 10px lime";
  panel.style.cursor="move";
  panel.innerHTML="<b>💀 Fake Roblox Hack Panel 💀</b><br>";
  document.body.appendChild(panel);

  // Drag functionality
  let isDragging=false, offsetX=0, offsetY=0;
  panel.onmousedown=(e)=>{isDragging=true; offsetX=e.offsetX; offsetY=e.offsetY;}
  document.onmouseup=()=>{isDragging=false;}
  document.onmousemove=(e)=>{if(isDragging){panel.style.left=e.pageX-offsetX+"px"; panel.style.top=e.pageY-offsetY+"px";}}

  // Button creator
  function makeBtn(name,fn){
    let b=document.createElement("button");
    b.textContent=name;
    b.style.display="block";
    b.style.width="100%";
    b.style.margin="4px 0";
    b.style.background="#222";
    b.style.color="lime";
    b.style.border="1px solid lime";
    b.style.fontFamily="monospace";
    b.onclick=fn;
    panel.appendChild(b);
    return b;
  }

  // Fake Script Executed
  makeBtn("Execute Script",()=>{
    alert("✅ Script executed successfully!");
  });

  // Fake Robux Generator
  let robux=0;
  let robuxDisplay=document.createElement("div");
  robuxDisplay.textContent="💰 Robux: 0";
  robuxDisplay.style.margin="4px 0";
  panel.appendChild(robuxDisplay);
  makeBtn("Generate Robux",()=>{
    let add=Math.floor(Math.random()*5000+1000);
    robux+=add;
    robuxDisplay.textContent="💰 Robux: "+robux;
    alert(`Generated ${add} Robux!`);
  });

  // Fake Verified Badge
  makeBtn("Become Verified",()=>{
    alert("✅ You are now a Verified User!");
  });

  // Fake tools
  let tools=["Aimbot","Dupe Item","Bring Player","Fly","Speed","TP"];
  tools.forEach(t=>{
    makeBtn(t,()=>{
      alert(`✅ ${t} executed! (Fake)`);
    });
  });

  // ESP for buttons
  let espLines=[];
  function drawESP(){
    espLines.forEach(l=>l.remove());
    espLines=[];
    let buttons=document.querySelectorAll("button");
    buttons.forEach(btn=>{
      if(panel.contains(btn)) return; // ignore menu buttons
      let rect=btn.getBoundingClientRect();
      let cx=rect.left+rect.width/2;
      let cy=rect.top+rect.height/2;

      let line=document.createElement("div");
      line.style.position="fixed";
      line.style.left=window.innerWidth/2+"px";
      line.style.top=window.innerHeight/2+"px";
      line.style.width=Math.hypot(cx-window.innerWidth/2, cy-window.innerHeight/2)+"px";
      line.style.height="2px";
      line.style.background="lime";
      line.style.transformOrigin="0 0";
      let angle=Math.atan2(cy-window.innerHeight/2, cx-window.innerWidth/2)*180/Math.PI;
      line.style.transform=`rotate(${angle}deg)`;
      line.style.pointerEvents="none";
      line.style.zIndex="999998";
      document.body.appendChild(line);
      espLines.push(line);
    });
  }

  setInterval(drawESP,100);

})();
