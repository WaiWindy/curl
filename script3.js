(function(){
  // Remove old menu if exists
  let old=document.getElementById("fakeFormMenu"); if(old) old.remove();

  // Menu container
  let menu=document.createElement("div");
  menu.id="fakeFormMenu";
  menu.style.position="fixed";
  menu.style.top="20px";
  menu.style.right="20px";
  menu.style.width="220px";
  menu.style.background="rgba(0,30,0,0.95)";
  menu.style.color="lime";
  menu.style.padding="10px";
  menu.style.border="2px solid lime";
  menu.style.fontFamily="monospace";
  menu.style.zIndex="999999";
  menu.style.borderRadius="8px";
  menu.style.boxShadow="0 0 15px lime";
  menu.innerHTML="<b>📝 Google Form Fake Answers</b><br>";
  document.body.appendChild(menu);

  // State
  let espOn=false;
  let espBoxes=[];
  let formInputs=[];

  // Button helper
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

  // Toggle ESP for inputs
  let espBtn = makeBtn("💀 ESP Inputs: OFF", ()=>{
    espOn=!espOn;
    espBtn.textContent=`💀 ESP Inputs: ${espOn?"ON":"OFF"}`;
    if(!espOn){ espBoxes.forEach(b=>b.remove()); espBoxes=[]; }
  });

  // Fake Answer Button
  makeBtn("🎯 Fill Fake Answers", ()=>{
    formInputs = Array.from(document.querySelectorAll("input,textarea,select"));
    formInputs.forEach(input=>{
      if(menu.contains(input)) return; // ignore menu
      let type = input.type;
      if(type==="radio" || type==="checkbox"){
        // randomly check/uncheck
        input.checked = Math.random()<0.5;
      } else if(input.tagName==="SELECT"){
        let options = Array.from(input.options);
        let r = Math.floor(Math.random()*options.length);
        input.selectedIndex = r;
      } else {
        // text input/textarea
        let fakeTexts = ["PLEN!", "😀", "🚀", "💀", "AURORA", "HACKED"];
        input.value = fakeTexts[Math.floor(Math.random()*fakeTexts.length)];
      }
    });
  });

  // Draw ESP boxes
  function drawESP(){
    espBoxes.forEach(b=>b.remove());
    espBoxes=[];
    if(!espOn) return;

    let inputs = Array.from(document.querySelectorAll("input,textarea,select"));
    inputs.forEach(input=>{
      if(menu.contains(input)) return;
      let rect = input.getBoundingClientRect();
      let cx = rect.left + rect.width/2;
      let cy = rect.top + rect.height/2;

      // Box
      let box = document.createElement("div");
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

      // Dot at center
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

  setInterval(drawESP,50);
})();
