const storedInput = sessionStorage.getItem("userInput");

if (!storedInput) {
  const modal = document.getElementById("custom-modal");
  modal.style.display = "flex";

  const submitBtn = document.getElementById("submit-btn");
  const closeBtn = document.getElementById("close-btn");

  submitBtn.addEventListener("click", () => {
    // main code logic
    const userInput = document.getElementById("user-input").value;
    let LT = "",
      OAN = "",
      Rid = "",
      PAid = "",
      DeliveryDate = "";
    const Rnum = Math.floor(Math.random() * 10000);
    const env = location.href.includes("15506") //AV=15506 & FRV =15509
      ? console.log("gdydydytr")
      : console.log("2322cgfdcgs"); //const env = location.href.includes("15506") ? "AV" : "FRV";
    const desc =
      env === "AV"
        ? "wf.geschaeftsfall-ausloesen.vbt02"
        : "wf.geschaeftsfall-ausloesen.ctu02"; // Multi-line descriptions //const selectedDesc = prompt(`Select a WrapperText Type for ${env}:\n1 - LeitungsKey(1 AA123456789)\n2 - CancelProductOrder(2 OrderAuftragsnummerActivation)\n3 - CancelReservation(3 ReservierungId)\n4 - OrderPhysicalAccessSuspension(4 DatumAuftragseingang PhysicalAccessId OrderAuftragsnummerActivation)\n5 - SuspendPhysicalAccess(5 PhysicalAccessId OrderAuftragsnummerActivation)\nNOTE : USE SPACE IN BETWEEN WHILE ENTERING DATA\nEXAMPLE: 4 DatumAuftragseingang PhysicalAccessId OrderAuftragsnummerActivation`);
    const parts = userInput.trim().split(" "); //regex
    if (parts[0] == 1 && parts[1].length != 14) {
      alert("key mismatch");
      return;
    }
    if (parts[0] == 2 && parts[1].length != 14) {
      alert("key mismatch");
      return;
    }
    if (parts[0] == 3 && parts[1].length != 14) {
      alert("key mismatch");
      return;
    }
    if (parts[0] == 4 && parts[1].length != 14) {
      alert("key mismatch");
      return;
    }
    if (parts[0] == 5 && parts[1].length != 14) {
      alert("key mismatch");
      return;
    }
    const Num = parts[0];

    let descKey;
    if (Num === "1") {
      LT = parts[1];
      descKey = "LeitungsKey"; //AA5435453867
    } else if (Num === "2") {
      OAN = parts[1];
      descKey = "CancelProductOrder";
    } else if (Num === "3") {
      Rid = parts[1];
      descKey = "CancelReservation";
    } else if (Num === "4") {
      DeliveryDate = parts[1];
      PAid = parts[2];
      OAN = parts[3];
      descKey = "orderPhysicalAccessSuspension";
    } else if (Num === "5") {
      PAid = parts[1];
      OAN = parts[2];
      descKey = "suspendPhysicalAccess";
    } else return;

    const titleField = document.querySelector("input[name='descriptor']");
    const descField = document.querySelector("textarea[name='inputMessage']");
    const timeout = document.querySelector("input[name='timeout']");

    const descOptions = {
      LeitungsKey: `<geschaeftsfall-ausloesen art="request">
<prozessfragment>FK_Free</prozessfragment>
<geschaeftsfall xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="FK_Free">
<LtgKey>${LT}</LtgKey>
</geschaeftsfall>
</geschaeftsfall-ausloesen>`,
      CancelProductOrder: `<?xml version="1.0" encoding="UTF-8"?>
<geschaeftsfall-ausloesen xmlns:flex="http://telekom.de/flexprod/common" xmlns="http://telekom.de/flexprod/workflow" art="request">
<prozessfragment>pa_CancelProductOrder</prozessfragment>
<geschaeftsfall xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="flex:pa_CancelProductOrder">
<flex:OrderAuftragsnummer>${OAN}</flex:OrderAuftragsnummer><!--OrderAuftragsnummerActivation or OrderAuftragsnummerReservation from an AccessLine-->
<flex:MessageCorrelationID>9148658795513197332§1!1§de.telekom.oss.nctomssuite.NC_TOMS_SUITE:ACCESS:PhysicalAccess§1!1§NULL1+1NULL§1!1§9138064870713677833§1!1§9136568432416833943§1!1§cancelOrder§1!1§NULL1+1NULL§1!1§NULL1+1NULL§1!1§NULL1+1NULL§1!1§NULL1+1NULL§1!1§NULL1+1NULL§1!1§</flex:MessageCorrelationID>
</geschaeftsfall>
</geschaeftsfall-ausloesen>`,
      CancelReservation: `<?xml version="1.0" encoding="UTF-8"?>
<geschaeftsfall-ausloesen xmlns:flex="http://telekom.de/flexprod/common" xmlns="http://telekom.de/flexprod/workflow" art="request">
<prozessfragment>pa_CancelReservation</prozessfragment>
<geschaeftsfall xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="flex:pa_CancelReservation">
<flex:ReservationId>${Rid}</flex:ReservationId>
<flex:ServiceConsumer>BL-T</flex:ServiceConsumer>
</geschaeftsfall>
</geschaeftsfall-ausloesen>`,
      orderPhysicalAccessSuspension: `<?xml version="1.0" encoding="UTF-8"?>
<geschaeftsfall-ausloesen xmlns:flex="http://telekom.de/flexprod/common" xmlns="http://telekom.de/flexprod/workflow" art="request">
  <prozessfragment>pa_OrderSuspension</prozessfragment>
  <geschaeftsfall xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="flex:pa_OrderSuspension">
    <flex:DeliveryDate>${DeliveryDate}</flex:DeliveryDate>
    <!--Current date and current or earlier time-->
    <flex:PhysicalAccessId>${PAid}</flex:PhysicalAccessId>
    <!-- <flex:PhysicalAccessId>0000000000000000042620</flex:PhysicalAccessId> -->
    <!-- <flex:PhysicalAccessId>0000000000000000042621</flex:PhysicalAccessId> -->
    <!-- <flex:PhysicalAccessId>0000000000000000042622</flex:PhysicalAccessId> -->
    <flex:OrderAuftragsnummer>${OAN}</flex:OrderAuftragsnummer>
    <!--Come up with something new. It will be OrderAuftragsnummerSuspension-->
    <flex:ProcessId>${Rnum}20190906.001.1</flex:ProcessId>
    <!--Come up with something new. ProzessName = OrderSuspension-->
    <flex:MessageCorrelationID>9149133578013722237#1!1#de.telekom.oss.nctomssuite.NC_TOMS_SUITE:ACCESS:PhysicalAccess#1!1#eyJtZXBUeXBlIjoiQVNZTkMiLCJyb3V0aW5nSW5mbyI6ImRlLnRlbGVrb20ub3NzLm5jdG9tc3N1aXRlLk5DX1RPTVNfU1VJVEU6QUNDRVNTOlBoeXNpY2FsQWNjZXNzIiwiVGFyZ2V0TmFtZXNwYWNlIjoiaHR0cDovL3NlcnZpY2VzLnRkZXUudGVsZWtvbS5uZXQvU2VydkFuZFJlc01nbXQvUHJvdmlzaW9uaW5nL1BoeXNpY2FsQWNjZXNzX3YwMS4wMCIsIlJlc3BvbnNlUXVldWUiOiJOR1NTTVZCVC5kZS50ZWxla29tLkZMRVhQUk9ELkRlZmF1bHQuUGh5c2ljYWxBY2Nlc3MubG9jLnJlc3AiLCJSZXFKbXNNc2dJZCI6IklEOjQxNGQ1MTIwNTQzNDRkNDMzMDM0MjAyMDIwMjAyMDIwZjRjNWE3NTllMjhkNzQyMyIsIkN1c3RvbWVyRW52IjoiTkdTU01WQlQiLCJTZW5kZXIiOiJkZS50ZWxla29tLm9zcy5uY3RvbXNzdWl0ZS5OQ19UT01TX1NVSVRFOkFDQ0VTUyIsIkNvcnJlbGF0aW9uSWQiOiIxMTEzMDAwMTE3NDMuMDAwLjEiLCJsb2dwb2ludElkIjoiMDEyMkJBQzM2MUZCRDRDMzhBODBBNTI0QzMxMTQ2MkQiLCJSZXF1ZXN0SWQiOiI5MTQ4Nzc4NjUwNjEzNzE5NzYwIiwiUHJvdmlkZXJTZW5kZXJOYW1lIjoiZGUudGVsZWtvbS5GTEVYUFJPRDpEZWZhdWx0IiwiUmVxU3RhcnRUaW1lIjoiMTUwNDg2NDEwODI4NCIsIlNpbXBsZVBQTmFtZSI6IlBoeXNpY2FsQWNjZXNzIiwiUmVxdWVzdE9wZXJhdGlvbiI6Im9yZGVyUGh5c2ljYWxBY2Nlc3NTdXNwZW5zaW9uIiwiRGlzYWJsZUFzeW5jU3luY0ZhdWx0Q29udmVyc2lvbiI6InRydWUiLCJTaG9ydGN1dCI6ImZhbHNlIn0=#1!1#9149133578013722237#1!1#111300013709.000.1#1!1#activateService#1!1#NULL1+1NULL#1!1#NULL1+1NULL#1!1#NULL1+1NULL#1!1#2017-09-08T09:48:27.123Z#1!1#3600000#1!1#queue://TMQSOA1/TST1_VBT_FXP_DEF_PHYSICALACCESS_P_I#1!1#</flex:MessageCorrelationID>
    <flex:Weiterversorgung>false</flex:Weiterversorgung>
  </geschaeftsfall>
</geschaeftsfall-ausloesen>`,
      suspendPhysicalAccess: `<?xml version="1.0" encoding="UTF-8"?>
<geschaeftsfall-ausloesen xmlns:flex="http://telekom.de/flexprod/common" xmlns="http://telekom.de/flexprod/workflow" art="request">
  <prozessfragment>pa_OrderSuspensionPostDocumentation</prozessfragment>
  <geschaeftsfall xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="flex:pa_OrderSuspensionPostDocumentation">
    <flex:PhysicalAccessIDList>
      <flex:Laenge>1</flex:Laenge>
      <flex:Wert>${PAid}</flex:Wert>
      <!-- <flex:Wert>0000000000000000042620</flex:Wert> -->
      <!-- <flex:Wert>0000000000000000042621</flex:Wert> -->
      <!-- <flex:Wert>0000000000000000042622</flex:Wert> -->
      <!--PhysicalAccessId from the previous message-->
    </flex:PhysicalAccessIDList>
    <flex:OrderAuftragsnummer>${OAN}</flex:OrderAuftragsnummer>
    <!--From the previous message-->
    <flex:PhysicalAccessStatus>ACTIVE</flex:PhysicalAccessStatus>
    <!-- ACTIVE/INACTIVE -->
    <flex:MessageCorrelationID>9149133578013722237#1!1#de.telekom.oss.nctomssuite.NC_TOMS_SUITE:ACCESS:PhysicalAccess#1!1#eyJtZXBUeXBlIjoiQVNZTkMiLCJyb3V0aW5nSW5mbyI6ImRlLnRlbGVrb20ub3NzLm5jdG9tc3N1aXRlLk5DX1RPTVNfU1VJVEU6QUNDRVNTOlBoeXNpY2FsQWNjZXNzIiwiVGFyZ2V0TmFtZXNwYWNlIjoiaHR0cDovL3NlcnZpY2VzLnRkZXUudGVsZWtvbS5uZXQvU2VydkFuZFJlc01nbXQvUHJvdmlzaW9uaW5nL1BoeXNpY2FsQWNjZXNzX3YwMS4wMCIsIlJlc3BvbnNlUXVldWUiOiJOR1NTTVZCVC5kZS50ZWxla29tLkZMRVhQUk9ELkRlZmF1bHQuUGh5c2ljYWxBY2Nlc3MubG9jLnJlc3AiLCJSZXFKbXNNc2dJZCI6IklEOjQxNGQ1MTIwNTQzNDRkNDMzMDM0MjAyMDIwMjAyMDIwZjRjNWE3NTllMjhkNzQyMyIsIkN1c3RvbWVyRW52IjoiTkdTU01WQlQiLCJTZW5kZXIiOiJkZS50ZWxla29tLm9zcy5uY3RvbXNzdWl0ZS5OQ19UT01TX1NVSVRFOkFDQ0VTUyIsIkNvcnJlbGF0aW9uSWQiOiIxMTEzMDAwMTE3NDMuMDAwLjEiLCJsb2dwb2ludElkIjoiMDEyMkJBQzM2MUZCRDRDMzhBODBBNTI0QzMxMTQ2MkQiLCJSZXF1ZXN0SWQiOiI5MTQ4Nzc4NjUwNjEzNzE5NzYwIiwiUHJvdmlkZXJTZW5kZXJOYW1lIjoiZGUudGVsZWtvbS5GTEVYUFJPRDpEZWZhdWx0IiwiUmVxU3RhcnRUaW1lIjoiMTUwNDg2NDEwODI4NCIsIlNpbXBsZVBQTmFtZSI6IlBoeXNpY2FsQWNjZXNzIiwiUmVxdWVzdE9wZXJhdGlvbiI6Im9yZGVyUGh5c2ljYWxBY2Nlc3NTdXNwZW5zaW9uIiwiRGlzYWJsZUFzeW5jU3luY0ZhdWx0Q29udmVyc2lvbiI6InRydWUiLCJTaG9ydGN1dCI6ImZhbHNlIn0=#1!1#9149133578013722237#1!1#111300013709.000.1#1!1#activateService#1!1#NULL1+1NULL#1!1#NULL1+1NULL#1!1#NULL1+1NULL#1!1#2017-09-08T09:48:27.123Z#1!1#3600000#1!1#queue://TMQSOA1/TST1_VBT_FXP_DEF_PHYSICALACCESS_P_I#1!1#</flex:MessageCorrelationID>
  </geschaeftsfall>
</geschaeftsfall-ausloesen>`,
    };
    if (titleField && descField) {
      titleField.value = desc; // AV Title or FRV Title
      descField.value = descOptions[descKey]; // Multi-line description
      timeout.value = 200000;
      alert("SUCCESS");
    } else {
      console.error("Form fields not found!");
      alert("FAILURE!!");
    }
    if (!userInput) return;

    sessionStorage.setItem("userInput", userInput);

    const callBtn = document.querySelector("input[value='call']");
    callBtn.click(); // modal.remove();
  });

  closeBtn.addEventListener("click", () => {
    modal.remove();
  });
} else {
  const observer = new MutationObserver((muts, obs) => {
    console.log("XML reading...");
    const xmlEl = document.querySelector("textarea[name='result']");
    if (xmlEl && xmlEl.textContent.includes("...done in")) {
      const lines = xmlEl.textContent.trim().split("\n");
      const timeLine = lines.find((line) =>
        line.toLowerCase().includes("...done in")
      );

      if (timeLine) {
        const match = timeLine.match(/...done in\s*\.{3}\s*(\d+)msec/i);
        if (match) {
          const duration = parseInt(match[1]);
          const userInput = sessionStorage.getItem("userInput");

          const isPassed = duration >= 2000;
          const message = `Your test is ${
            isPassed ? "passed" : "failed"
          } for <span class="${
            isPassed ? "result-pass" : "result-fail"
          }">${userInput}</span>`;
          console.log("popup 2");
          showResultPopup(message);
          obs.disconnect();
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function showResultPopup(message) {
  const wrap = document.createElement("div");
  wrap.className = "modal-overlay";
  wrap.innerHTML = `
    <div class="modal-content">
      <h2>Call Result</h2>
      <p>${message}</p>
      <div class="buttons">
        <button id="retry-modal">Retry</button>
        <button id="close-modal-2">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  wrap.querySelector("#retry-modal").addEventListener("click", () => {
    sessionStorage.clear();
    location.reload();
  });

  wrap.querySelector("#close-modal-2").addEventListener("click", () => {
    sessionStorage.clear();
    wrap.remove();
  });
}
