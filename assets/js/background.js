// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "sendData") {
//     console.log("Received data in background:", message.data);

//     // Save data to chrome storage
//     chrome.storage.local.set({ LinkedInData: message.data }, () => {
//       sendResponse({ status: "success", message: "Data saved successfully" });
//     });

//     // Make sure to return true so the message remains open until sendResponse is called
//     return true;
//   }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveLinkedInData") {
      // Save LinkedIn data to Chrome Storage
      chrome.storage.local.set({ LinkedInData: message.data }, () => {
          sendResponse({ status: "success", message: "LinkedIn data saved successfully!" });
      });
  } else if (message.action === "saveApplication") {
      // Save job application data to Chrome Storage
      chrome.storage.local.get({ applications: [] }, (data) => {
          const applications = data.applications;
          applications.push(message.data);
          chrome.storage.local.set({ applications }, () => {
              sendResponse({ status: "success", message: "Application data saved successfully!" });
          });
      });
  }
  return true; // Keep the message channel open for async response
});
