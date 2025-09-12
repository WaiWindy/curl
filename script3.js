javascript:(function(){
  // Create popup
  let ui = document.createElement("div");
  ui.style.position = "fixed";
  ui.style.top = "10px";
  ui.style.left = "10px";
  ui.style.background = "white";
  ui.style.padding = "10px";
  ui.style.border = "2px solid black";
  ui.style.zIndex = 999999;
  ui.style.fontFamily = "sans-serif";
  ui.style.maxWidth = "300px";

  ui.innerHTML = `
    <h3 style="margin:0 0 8px 0;">🔀 Text Replacer</h3>
    <textarea id="replacerList" style="width:100%;height:60px;">TEXT,Discoveries,😊,Menu,Advertisement</textarea>
    <button id="runReplace">Replace!</button>
    <button id="replaceSpace">Replace with " "</button>
    <button id="closeUI">✖</button>
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
