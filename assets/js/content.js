console.log("Content script is running!");

if (window.location.href.includes("linkedin.com/in")) {
  console.log("testLinkediun");

  // Create the button
  const grabDataButton = document.createElement("button");
  grabDataButton.textContent = "Grab LinkedIn Data";
  grabDataButton.style.position = "fixed";
  grabDataButton.style.bottom = "50px";
  grabDataButton.style.right = "20px";
  grabDataButton.style.zIndex = "1000";
  grabDataButton.style.padding = "10px 15px";
  grabDataButton.style.backgroundColor = "#0073b1";
  grabDataButton.style.color = "#ffffff";
  grabDataButton.style.border = "none";
  grabDataButton.style.borderRadius = "5px";
  grabDataButton.style.cursor = "pointer";

  document.body.appendChild(grabDataButton);

  // Event listener for button click
  grabDataButton.addEventListener("click", () => {
    // Example of grabbing data from a LinkedIn profile
    let profileData = {};

    // Assume we're on a LinkedIn profile page and start extracting data
    profileData.name = (document.querySelector(".text-heading-xlarge").innerText).split(" ")[0];
    profileData.surname = (document.querySelector(".text-heading-xlarge").innerText).split(" ")[1];
    profileData.headline = document.querySelector(".text-body-medium").innerText;
    profileData.location = document.querySelector(".text-body-small.inline.t-black--light.break-words").innerText;

    // If you need to extract more specific data, add selectors here
    // profileData.experience = ... 
    console.log(profileData)

    try {
      chrome.runtime.sendMessage({ action: "saveLinkedInData", data: profileData }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError.message);
        } else {
          console.log("Data sent to extension:", response);
          alert('Data sent to extension.');
        }
      });
    } catch (error) {
      console.error("Error in sending message:", error);
    }

  });
}


// Auto-Fill Functionality (Added Below)

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fillForm") {
    const { profileData, defaultFields } = message;
    fillWebsiteForm(profileData, defaultFields);
    sendResponse({ success: true });
  }
});

// Function to fill the form
function fillWebsiteForm(profileData, defaultFields) {
  function normalizeFieldName(fieldName) {
    return fieldName?.replace(/[-_]/g, "").toLowerCase() || "";
  }

  const inputs = document.querySelectorAll("input, textarea, select");

  inputs.forEach((input) => {
    const fieldName = normalizeFieldName(input.name || input.id || input.placeholder);

    const matchedKey = Object.keys(profileData).find(
      (key) => normalizeFieldName(key) === fieldName
    );

    const matchedDefaultField = !matchedKey
      ? defaultFields.find((field) => normalizeFieldName(field.id) === fieldName)
      : null;

    const valueToSet = matchedKey
      ? profileData[matchedKey]
      : matchedDefaultField
        ? profileData[matchedDefaultField.id]
        : null;

    if (valueToSet !== null && valueToSet !== undefined) {
      if (input.tagName === "SELECT") {
        input.value = valueToSet;
        input.dispatchEvent(new Event("change"));
      } else {
        input.value = valueToSet;
      }
    }
  });

  alert("Form auto-filled with your profile data!");
}


// Save draft

if (document.querySelector('form') != null) {
  console.log('draftButton')
  // Create the button
  const saveDraftButton = document.createElement("button");
  saveDraftButton.textContent = "Save As Draft";
  saveDraftButton.style.position = "fixed";
  saveDraftButton.style.bottom = "50px";
  saveDraftButton.style.right = "50px";
  saveDraftButton.style.zIndex = "1000";
  saveDraftButton.style.padding = "10px 15px";
  saveDraftButton.style.backgroundColor = "#0073b1";
  saveDraftButton.style.color = "#ffffff";
  saveDraftButton.style.border = "none";
  saveDraftButton.style.borderRadius = "5px";
  saveDraftButton.style.cursor = "pointer";

  document.body.appendChild(saveDraftButton);

  saveDraftButton.addEventListener('click', () => {
    const formElement = document.querySelector('form');
    const currentPageURL = window.location.href;

    if (!formElement) {
      console.error("No form found at the specified index.");
      return;
    }

    const currentForm = new FormData(formElement);
    const currentFormData = {};

    console.log("Form Element:", formElement);

    currentForm.forEach((value, key) => {
      console.log(`Key: ${key}, Value: ${value}`);
      currentFormData[key] = value;
    });

    console.log("Extracted Form Data:", currentFormData);

    // Serialize data and save to localStorage
    localStorage.setItem(`${currentPageURL}`, JSON.stringify(currentFormData));
  });

}

const savedData = localStorage.getItem(window.location.href);
if (savedData) {
  const formData = JSON.parse(savedData);
  console.log("Retrieved Form Data:", formData);

  const useDraftButton = document.createElement("button");
  useDraftButton.textContent = "Use Draft";
  useDraftButton.style.position = "fixed";
  useDraftButton.style.bottom = "50px";
  useDraftButton.style.right = "170px";
  useDraftButton.style.zIndex = "1000";
  useDraftButton.style.padding = "10px 15px";
  useDraftButton.style.backgroundColor = "#0084cc";
  useDraftButton.style.color = "#ffffff";
  useDraftButton.style.border = "none";
  useDraftButton.style.borderRadius = "5px";
  useDraftButton.style.cursor = "pointer";

  document.body.appendChild(useDraftButton);

  useDraftButton.addEventListener('click', () => {
    console.log(formData)
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const formElement = document.querySelector(`[name="${key}"]`);

        if (formElement) {
          if (formElement.type === 'radio' || formElement.type === 'checkbox') {
            formElement.checked = (formElement.value === formData[key]);
          } else {
            formElement.value = formData[key];
          }
        }
      }
    }
  })
}