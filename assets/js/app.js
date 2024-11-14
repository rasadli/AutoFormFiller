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
});
