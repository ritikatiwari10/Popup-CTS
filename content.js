(async () => {
    // Prevent duplicates
    if (document.getElementById("custom-modal-container")) return;
   
    // Load modal HTML
    const html = await fetch(chrome.runtime.getURL("modal.html")).then(res => res.text());
    const container = document.createElement("div");
  container.id = "custom-modal-container";
    container.innerHTML = html;
    document.body.appendChild(container);
   
    // Load modal CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL("modal.css");
    document.head.appendChild(link);
   
    // Load modal JS
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("modal.js");
    script.type = "module";
    document.body.appendChild(script);
  })();