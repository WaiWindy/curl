javascript:(function(){
  // Remove existing UI if already open
  let old = document.getElementById("textReplacerUI");
  if(old){ old.remove(); }

  // Create popup
  let ui = document.createElement("div");
  ui.id = "textReplacerUI";
  ui.style.position = "fixed";
  ui.style.top = "10px";
  ui.style.left = "10px";
  ui.style.background = "white";
  ui.style.padding = "10px";
  ui.style.border = "2px solid black";
  ui.style.zIndex = 999999;
  ui.style.fontFamily = "sans-serif";
  ui.style.maxWidth = "300px";
  ui.style.boxShadow = "3px 3px 10px rgba(0,0,0,0.3)";

  ui.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <h3 style="margin:0;font-size:16px;">🔀 Text Replacer</h3>
      <button id="closeUI" style="background:red;color:white;border:none;font-size:14px;padding:2px 6px;cursor:pointer;">✖</button>
    </div>
    <p style="margin:6px 0;font-size:12px;">Enter replacements (comma-separated):</p>
    <textarea id="replacerList" style="width:100%;height:60px;">Discoveries,Menu,Advertisement,❓,TEXT</textarea>
    <div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;">
      <button id="runReplace">Replace!</button>
      <button id="replaceSpace">Replace with " "</button>
    </div>
  `;

  document.body.appendChild(ui);

  // Replacement function
  function change(node, list) {
    if(node.nodeType === 3) {
      node.nodeValue = node.nodeValue.replace(/\S+/g,()=>list[Math.floor(Math.random()*list.length)]);
    } else {
      node.childNodes.forEach(n => change(n,list));
    }
  }

  // Button events
  ui.querySelector("#runReplace").onclick = function(){
    let items = ui.querySelector("#replacerList").value.split(",").map(s=>s.trim()).filter(Boolean);
    change(document.body, items);
  };

  ui.querySelector("#replaceSpace").onclick = function(){
    change(document.body, [" "]);
  };

  ui.querySelector("#closeUI").onclick = function(){
    ui.remove();
  };
})();
