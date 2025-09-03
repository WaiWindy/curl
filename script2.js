(function(){
  // Remove old ESP/Delete menu if exists
  let old=document.getElementById("espMenu"); if(old) old.remove();

  // Menu container
  let menu=document.createElement("div");
  menu.id="espMenu";
  menu.style.position="fixed";
  menu.style.top="20px";
  menu.style.right="20px";
  menu.style.width="200px";
  menu.style.background="rgba(0,30,0,0.9)";
  menu.style.color="lime";
  menu.style.padding="10px";
  menu.style.border="2px solid lime";
  menu.style.fontFamily="monospace";
  menu.style.zIndex="999999";
  menu.style.borderRadius="8px";
  menu.style.boxShadow="0 0 15px lime";
  menu.innerHTML="<b>💀 ESP & 🗑️ Delete</b><br>";

  document.body.appendChild(menu);

  // State
  let espOn=false;
  let deleteOn=false;
  let espBoxes=[];
  let deletedElements=[];

  // Buttons
  function makeBtn(name,fn){
    let b=document.createElement("button");
    b.textContent=name;
    b.style.display="block";
    b.style.width="100%";
    b.style.margin="4px 0";
    b.style.background="black";
    b.style.color="lime";
    b.style.border="1px solid lime";
    b.style.fontFamily="monospace";
    b.onmouseover=()=>{b.style.background="lime";b.style.color="black";};
    b.onmouseout=()=>{b.style.background="black";b.style.color="lime";};
    b.onclick=fn;
    menu.appendChild(b);
    return b;
  }

  // ESP Toggle
  let espBtn = makeBtn("💀 ESP: OFF",()=>{
    espOn=!espOn;
    espBtn.textContent=`💀 ESP: ${espOn?"ON":"OFF"}`;
    if(!espOn){ // remove old boxes
      espBoxes.forEach(b=>b.remove());
      espBoxes=[];
    }
  });

  // Delete Toggle
  let delBtn = makeBtn("🗑️ Delete: OFF",()=>{
    deleteOn=!deleteOn;
    delBtn.textContent=`🗑️ Delete: ${deleteOn?"ON":"OFF"}`;
  });

  // Undo last deleted
  makeBtn("↩ Undo Delete",()=>{
    if(deletedElements.length>0){
      let el=deletedElements.pop();
      document.body.appendChild(el);
    }
  });

  // Draw ESP boxes
  function drawESP(){
    espBoxes.forEach(b=>b.remove());
    espBoxes=[];
    if(!espOn) return;
    // find clickable elements, ignore menu itself
    let clickable=document.querySelectorAll("button,a,input,select,textarea,[onclick]");
    clickable.forEach(el=>{
      if(menu.contains(el)) return; // ignore menu
      let rect=el.getBoundingClientRect();
      let box=document.createElement("div");
      box.style.position="fixed";
      box.style.left=rect.left+"px";
      box.style.top=rect.top+"px";
      box.style.width=rect.width+"px";
      box.style.height=rect.height+"px";
      box.style.border="2px solid lime";
      box.style.pointerEvents="none";
      box.style.zIndex="999998";

      // Line from center
      let cx = rect.left + rect.width/2;
      let cy = rect.top + rect.height/2;
      let line=document.createElement("div");
      line.style.position="fixed";
      line.style.left="0px";
      line.style.top="0px";
      let dx = cx - 0;
      let dy = cy - 0;
      line.style.width=Math.hypot(dx,dy)+"px";
      line.style.height="2px";
      line.style.background="lime";
      line.style.transformOrigin="0 0";
      let angle=Math.atan2(dy,dx)*180/Math.PI;
      line.style.transform=`rotate(${angle}deg)`;
      line.style.pointerEvents="none";
      line.style.zIndex="999998";

      document.body.appendChild(box);
      document.body.appendChild(line);
      espBoxes.push(box);
      espBoxes.push(line);
    });
  }

  setInterval(drawESP,50); // faster refresh

  // Delete click handler
  document.addEventListener("mousedown",e=>{
    if(deleteOn){
      if(menu.contains(e.target)) return; // ignore menu
      e.preventDefault();
      e.stopPropagation();
      deletedElements.push(e.target);
      e.target.remove();
    }
  },true);
})();
