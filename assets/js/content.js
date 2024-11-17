console.log("Content script is running!");
console.log(window.location.href);

if (window.location.href.includes("linkedin.com/in")) {
  console.log("testLinkediun");

  // Create the button
  const grabDataButton = document.createElement("button");
  grabDataButton.textContent = "Grab LinkedIn Data";
  grabDataButton.style.position = "fixed";
  grabDataButton.style.bottom = "20px";
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

// Function to fill the form on the current webpage
function fillWebsiteForm(profileData) {
  const fieldMapping = {
    "name": "fullName",
    "email": "email",
    "phone": "phoneNumber",
    "city": "city",
    "citizenship_status": "citizenshipStatus",
    "state_province": "state",
    "date_of_birth": "dateOfBirth"
  };

  const inputs = document.querySelectorAll("input, textarea, select");

  inputs.forEach((input) => {
    const fieldName = input.name || input.id || input.placeholder;
    const mappedKey = fieldMapping[fieldName.toLowerCase()] || fieldName.toLowerCase();

    if (mappedKey && profileData[mappedKey]) {
      input.removeAttribute("readonly");
      input.value = profileData[mappedKey];
    }
  });

  alert("Form auto-filled with your profile data!");
}

// Listen for messages from the extension popup or background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fillForm" && request.data) {
    fillWebsiteForm(request.data);
    sendResponse({ status: "Form auto-filled" });
  }
});

