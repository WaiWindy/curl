(function(){
  // Remove old menu if exists
  let old=document.getElementById("fakeFormESP"); if(old) old.remove();

  // Menu container
  let menu=document.createElement("div");
  menu.id="fakeFormESP";
  menu.style.position="fixed";
  menu.style.top="20px";
  menu.style.right="20px";
  menu.style.width="200px";
  menu.style.background="rgba(0,30,0,0.95)";
  menu.style.color="lime";
  menu.style.padding="10px";
  menu.style.border="2px solid lime";
  menu.style.fontFamily="monospace";
  menu.style.zIndex="999999";
  menu.style.borderRadius="8px";
  menu.style.boxShadow="0 0 15px lime";
  menu.innerHTML="<b>💀 ESP Checkboxes</b><br>";
  document.body.appendChild(menu);

  let espOn=false;
  let espBoxes=[];

  // Button
  let espBtn=document.createElement("button");
  espBtn.textContent="💀 ESP: OFF";
  espBtn.style.display="block";
  espBtn.style.width="100%";
  espBtn.style.margin="4px 0";
  espBtn.style.background="black";
  espBtn.style.color="lime";
  espBtn.style.border="1px solid lime";
  espBtn.style.fontFamily="monospace";
  espBtn.onclick=()=>{espOn=!espOn; espBtn.textContent=`💀 ESP: ${espOn?"ON":"OFF"}`; if(!espOn){espBoxes.forEach(b=>b.remove()); espBoxes=[];}};
  menu.appendChild(espBtn);

  function drawESP(){
    espBoxes.forEach(b=>b.remove());
    espBoxes=[];
    if(!espOn) return;

    // For Google Forms: each question container
    let questions = document.querySelectorAll("[role='listitem']"); // works for forms
    questions.forEach(q=>{
      // find all checkboxes inside
      let checkboxes = q.querySelectorAll("input[type='checkbox']");
      if(checkboxes.length==0) return;
      // pick a random one
      let choice = checkboxes[Math.floor(Math.random()*checkboxes.length)];
      let rect = choice.getBoundingClientRect();
      let cx = rect.left + rect.width/2;
      let cy = rect.top + rect.height/2;

      // Box
      let box=document.createElement("div");
      box.style.position="fixed";
      box.style.left=rect.left+"px";
      box.style.top=rect.top+"px";
      box.style.width=rect.width+"px";
      box.style.height=rect.height+"px";
      box.style.border="2px solid lime";
      box.style.pointerEvents="none";
      box.style.zIndex="999998";

      // Line to screen center
      let line=document.createElement("div");
      line.style.position="fixed";
      line.style.left=cx+"px";
      line.style.top=cy+"px";
      line.style.width=Math.hypot(window.innerWidth/2-cx, window.innerHeight/2-cy)+"px";
      line.style.height="3px";
      line.style.background="lime";
      line.style.transformOrigin="0 0";
      let angle=Math.atan2(window.innerHeight/2-cy, window.innerWidth/2-cx)*180/Math.PI;
      line.style.transform=`rotate(${angle}deg)`;
      line.style.pointerEvents="none";
      line.style.zIndex="999998";
      line.style.boxShadow="0 0 6px lime";

      // Dot
      let dot=document.createElement("div");
      dot.style.position="fixed";
      dot.style.left=cx-4+"px";
      dot.style.top=cy-4+"px";
      dot.style.width="8px";
      dot.style.height="8px";
      dot.style.background="lime";
      dot.style.borderRadius="50%";
      dot.style.pointerEvents="none";
      dot.style.zIndex="999998";

      document.body.appendChild(box);
      document.body.appendChild(line);
      document.body.appendChild(dot);
      espBoxes.push(box,line,dot);
    });
  }

  setInterval(drawESP,100);
})();
