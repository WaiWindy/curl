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
  }

  // ESP Toggle
  makeBtn("💀 ESP: OFF",()=>{
    espOn=!espOn;
    document.querySelector("button:contains('💀 ESP')").textContent=`💀 ESP: ${espOn?"ON":"OFF"}`;
    if(!espOn){ // remove old boxes
      espBoxes.forEach(b=>b.remove());
      espBoxes=[];
    }
  });

  // Delete Toggle
  makeBtn("🗑️ Delete: OFF",()=>{
    deleteOn=!deleteOn;
    document.querySelector("button:contains('🗑️ Delete')").textContent=`🗑️ Delete: ${deleteOn?"ON":"OFF"}`;
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
    // remove old boxes
    espBoxes.forEach(b=>b.remove());
    espBoxes=[];
    if(!espOn) return;
    // find clickable elements
    let clickable=document.querySelectorAll("button,a,input,select,textarea,[onclick]");
    clickable.forEach(el=>{
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

      // Line to top-left corner
      let line=document.createElement("div");
      line.style.position="fixed";
      line.style.left="0px";
      line.style.top="0px";
      line.style.width=Math.hypot(rect.left,rect.top)+"px";
      line.style.height="2px";
      line.style.background="lime";
      line.style.transformOrigin="0 0";
      let angle=Math.atan2(rect.top,rect.left)*180/Math.PI;
      line.style.transform=`rotate(${angle}deg)`;
      line.style.pointerEvents="none";
      line.style.zIndex="999998";

      document.body.appendChild(box);
      document.body.appendChild(line);
      espBoxes.push(box);
      espBoxes.push(line);
    });
  }

  setInterval(drawESP,200);

  // Delete click handler
  document.addEventListener("mousedown",e=>{
    if(deleteOn){
      e.preventDefault();
      e.stopPropagation();
      deletedElements.push(e.target);
      e.target.remove();
    }
  },true);

})();
