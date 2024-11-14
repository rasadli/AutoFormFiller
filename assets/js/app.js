// // document.getElementById("fillFormButton").addEventListener("click", () => {
// //   const inputData = document.getElementById("autoFillInput").value;

// //   // Send a message to the content script with the input data
// //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
// //     chrome.tabs.sendMessage(tabs[0].id, { action: "fillForm", data: inputData });
// //   });
// // });

// document.addEventListener('DOMContentLoaded', function () {
//   chrome.storage.local.get('autoFilledData', function (result) {
//     const storedValue = result.autoFilledData;

//     if (storedValue) {
//       document.getElementById('autoFillInput').value = storedValue;
//     } else {
//       console.log('No data found in chrome.storage');
//     }
//   });
// });






document.getElementById("fillFormButton").addEventListener("click", () => {
  const inputData = {
    fullName: document.getElementById("fullNameInput").value,
    email: document.getElementById("emailInput").value,
    phone: document.getElementById("phoneInput").value
    // Add other fields as needed
  };

    // Profile Switching Code (Newly Added)
    const selectedProfile = document.getElementById("profileSelect").value; // Get selected profile
    if (selectedProfile) {
      chrome.storage.local.get("profiles", (result) => {
        const profiles = result.profiles || {};
        profiles[selectedProfile] = inputData; // Save data to the selected profile
        chrome.storage.local.set({ profiles }, () => {
          console.log("Data saved for profile:", selectedProfile);
        });
      });
    }

  // Save data to Chrome storage
  chrome.storage.local.set({ autoFilledData: inputData }, () => {
    console.log("Data saved:", inputData);
  });

  // Send a message to the content script with the input data
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "fillForm", data: inputData });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get('autoFilledData', function (result) {
    const storedData = result.autoFilledData;

    if (storedData) {
      document.getElementById('fullNameInput').value = storedData.fullName || "";
      document.getElementById('emailInput').value = storedData.email || "";
      document.getElementById('phoneInput').value = storedData.phone || "";
      // Populate other fields as needed
    } else {
      console.log('No data found in chrome.storage');
    }
  });

  // Profile Switching Code (Newly Added)
  loadProfileOptions();
  loadCurrentProfileData();
});

// Profile Switching Functions (Newly Added)

// Elements for profile management
const profileSelect = document.getElementById("profileSelect");
const newProfileNameInput = document.getElementById("newProfileName");

// Load profile options into dropdown
function loadProfileOptions() {
  chrome.storage.local.get("profiles", (result) => {
    const profiles = result.profiles || {};
    profileSelect.innerHTML = `
      <option>Default Profile</option>
      <option>Software Engineer</option>
      <option>Project Manager</option>
    `; // Predefined options
    for (const profileName in profiles) {
      const option = document.createElement("option");
      option.value = profileName;
      option.textContent = profileName;
      profileSelect.appendChild(option);
    }
  });
}

// Load data for the selected profile
function loadCurrentProfileData() {
  const selectedProfile = profileSelect.value;
  if (!selectedProfile) return;

  chrome.storage.local.get("profiles", (result) => {
    const profiles = result.profiles || {};
    const profileData = profiles[selectedProfile] || {};

    // Populate form fields with the selected profile’s data
    document.getElementById("fullNameInput").value = profileData.fullName || "";
    document.getElementById("emailInput").value = profileData.email || "";
    document.getElementById("phoneInput").value = profileData.phone || "";
  });
}

// Add a new profile
document.getElementById("addProfileButton").addEventListener("click", () => {
  const profileName = newProfileNameInput.value.trim();
  if (!profileName) return;

  chrome.storage.local.get("profiles", (result) => {
    const profiles = result.profiles || {};
    if (!profiles[profileName]) {
      profiles[profileName] = {}; // Initialize empty profile
      chrome.storage.local.set({ profiles }, loadProfileOptions);
      newProfileNameInput.value = ""; // Clear input
    } else {
      alert("Profile name already exists.");
    }
  });
});

// Delete the selected profile
document.getElementById("deleteProfileButton").addEventListener("click", () => {
  const selectedProfile = profileSelect.value;
  chrome.storage.local.get("profiles", (result) => {
    const profiles = result.profiles || {};
    if (profiles[selectedProfile]) {
      delete profiles[selectedProfile];
      chrome.storage.local.set({ profiles }, loadProfileOptions);

      // Clear form fields after deleting profile
      document.getElementById("fullNameInput").value = "";
      document.getElementById("emailInput").value = "";
      document.getElementById("phoneInput").value = "";
    }
  });
});
