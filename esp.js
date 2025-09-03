(function(){
  // Remove old if exists
  let old=document.getElementById("hiPanel"); if(old) old.remove();

  // Panel
  let panel=document.createElement("div");
  panel.id="hiPanel";
  panel.style.position="fixed";
  panel.style.top="50px";
  panel.style.left="50px";
  panel.style.width="260px";
  panel.style.background="#111";
  panel.style.color="lime";
  panel.style.padding="10px";
  panel.style.border="2px solid lime";
  panel.style.fontFamily="monospace";
  panel.style.zIndex="999999";
  panel.style.borderRadius="8px";
  panel.style.boxShadow="0 0 10px lime";
  panel.style.cursor="move";
  panel.innerHTML="<b>💀 HI Hack Panel 💀</b><br>";
  document.body.appendChild(panel);

  // Dragging
  let isDragging=false, offsetX=0, offsetY=0;
  panel.onmousedown=(e)=>{isDragging=true; offsetX=e.offsetX; offsetY=e.offsetY;}
  document.onmouseup=()=>{isDragging=false;}
  document.onmousemove=(e)=>{
    if(isDragging){
      panel.style.left=e.pageX-offsetX+"px";
      panel.style.top=e.pageY-offsetY+"px";
    }
  }

  // Helper for buttons
  function addButton(name,callback){
    let b=document.createElement("button");
    b.textContent=name;
    b.style.display="block";
    b.style.width="100%";
    b.style.margin="4px 0";
    b.style.background="#222";
    b.style.color="lime";
    b.style.border="1px solid lime";
    b.style.fontFamily="monospace";
    b.onclick=callback;
    panel.appendChild(b);
  }

  // Delete Mode
  let deleteMode=false;
  addButton("🗑️ Toggle Delete",()=>{
    deleteMode=!deleteMode;
    alert("Delete Mode: "+(deleteMode?"ON":"OFF"));
  });

  // ESP Mode (auto)
  let espActive=false, espInterval;
  addButton("👁️ Toggle ESP",()=>{
    espActive=!espActive;
    if(espActive){
      espInterval=setInterval(()=>{
        document.querySelectorAll(".hiESP.auto").forEach(e=>e.remove());
        let elems=document.querySelectorAll("a,button,input[type=button],input[type=submit]");
        elems.forEach(el=>{
          if(panel.contains(el)) return;
          let rect=el.getBoundingClientRect();
          if(rect.width && rect.height){
            let cx=rect.left+rect.width/2;
            let cy=rect.top+rect.height/2;
            let line=document.createElement("div");
            line.className="hiESP auto";
            line.style.position="fixed";
            line.style.left=window.innerWidth/2+"px";
            line.style.top=window.innerHeight/2+"px";
            line.style.width=Math.hypot(cx-window.innerWidth/2,cy-window.innerHeight/2)+"px";
            line.style.height="1px";
            line.style.background="lime";
            line.style.transformOrigin="0 0";
            line.style.transform=`rotate(${Math.atan2(cy-window.innerHeight/2,cx-window.innerWidth/2)}rad)`;
            line.style.zIndex="999998";
            line.style.pointerEvents="none";
            document.body.appendChild(line);
          }
        });
      },100);
    } else {
      clearInterval(espInterval);
      document.querySelectorAll(".hiESP.auto").forEach(e=>e.remove());
    }
  });

  // Click-to-ESP
  let clickESP=false;
  addButton("🎯 Click ESP",()=>{
    clickESP=!clickESP;
    alert("Click ESP: "+(clickESP?"ON":"OFF"));
  });

  // Global click handler
  document.addEventListener("click",function(e){
    if(deleteMode && !panel.contains(e.target)){
      e.preventDefault(); e.stopPropagation();
      e.target.remove();
    }
    if(clickESP && !panel.contains(e.target)){
      e.preventDefault(); e.stopPropagation();
      let rect=e.target.getBoundingClientRect();
      let cx=rect.left+rect.width/2;
      let cy=rect.top+rect.height/2;

      let line=document.createElement("div");
      line.className="hiESP manual";
      line.style.position="fixed";
      line.style.left=window.innerWidth/2+"px";
      line.style.top=window.innerHeight/2+"px";
      line.style.width=Math.hypot(cx-window.innerWidth/2,cy-window.innerHeight/2)+"px";
      line.style.height="2px";
      line.style.background="red";
      line.style.transformOrigin="0 0";
      line.style.transform=`rotate(${Math.atan2(cy-window.innerHeight/2,cx-window.innerWidth/2)}rad)`;
      line.style.zIndex="999998";
      line.style.pointerEvents="none";

      document.body.appendChild(line); // 🔴 stays permanently
    }
  },true);

})();
