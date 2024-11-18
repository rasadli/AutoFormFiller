console.log("Content script is running!");

if (window.location.href.includes("linkedin.com/in")) {
  console.log("testLinkediun");

  // Create the button
  const grabDataButton = document.createElement("button");
  grabDataButton.textContent = "Grab LinkedIn Data";
  grabDataButton.style.position = "fixed";
  grabDataButton.style.bottom = "100px";
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
      chrome.runtime.sendMessage({ action: "sendData", data: profileData }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError.message);
        } else {
          console.log("Data sent to extension:", response);
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
