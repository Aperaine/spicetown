function initialize() {
  const topCollabDiv = document.querySelector(".top-collab img");
  if (topCollabDiv) {
    const spicetownIcon = document.createElement("img");
    spicetownIcon.src = chrome.runtime.getURL("/images/hc-gh&st-collab.png");
    spicetownIcon.style.height = "45px";
    spicetownIcon.style.width = "auto";

    topCollabDiv.insertAdjacentElement("afterend", spicetownIcon);
  }

  const settingsForm = document.querySelector(".settings-form");
  const modalActions = settingsForm.querySelector(".modal__actions");
  const saveBtn = modalActions.querySelector(".modal__actions-close");
  if (settingsForm && modalActions && saveBtn) {
    const screenshareModeDiv = document.createElement("div");
    screenshareModeDiv.classList.add("settings-form__field");

    const screenshareModeCheckbox = document.createElement("label");
    screenshareModeCheckbox.classList.add("settings-form__checkbox");
    screenshareModeDiv.appendChild(screenshareModeCheckbox);

    const screenshareModeBoxInput = document.createElement("input");
    screenshareModeBoxInput.type = "checkbox";
    screenshareModeBoxInput.name = "screenshare_mode";
    screenshareModeBoxInput.id = "screenshare_mode";
    screenshareModeBoxInput.value = 1;
    screenshareModeCheckbox.appendChild(screenshareModeBoxInput);

    const screenshareModeTitle = document.createElement("span");
    screenshareModeTitle.textContent = "Screenshare Mode"
    screenshareModeCheckbox.appendChild(screenshareModeTitle);

    const screenshareModeHint = document.createElement("small");
    screenshareModeHint.classList.add("settings-form__hint");
    screenshareModeHint.textContent = "Replace sensitive information blurring with secure, black boxes"
    screenshareModeDiv.appendChild(screenshareModeHint);

    settingsForm.insertBefore(screenshareModeDiv, modalActions);

    saveBtn.addEventListener("click", function() {
      saveSetting(screenshareModeBoxInput.checked);
    });
  }
}

function saveSetting(value) {
  chrome.storage.local.set({'screenshareMode': value});
}

function applySettingsSync() {
  chrome.storage.local.get(['screenshareMode'], function(result) {
    let value = result.screenshareMode;
    if (value !== undefined) {
      const screenshareModeCheckbox = document.getElementById('screenshare_mode');
      if (!screenshareModeCheckbox) return;
      screenshareModeCheckbox.checked = value;
      console.log(value);
      if (value) {
        const apiKeyDisplay = document.querySelector(".api-key-display");
        if (!apiKeyDisplay) {
          return;
        }
        apiKeyDisplay.style.transition = "none";
        apiKeyDisplay.style.filter = "blur(0px)";
        apiKeyDisplay.addEventListener('mouseleave', (e) => {
          e.stopImmediatePropagation();
        }, true);
      }
    }
  })
}

initialize();
applySettingsSync();