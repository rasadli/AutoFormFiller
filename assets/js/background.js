chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendData") {
    console.log("Received data in background:", message.data);

    // Save data to chrome storage
    chrome.storage.local.set({ LinkedInData: message.data }, () => {
      sendResponse({ status: "success", message: "Data saved successfully" });
    });

    // Make sure to return true so the message remains open until sendResponse is called
    return true;
  }
});