document.getElementById("fillFormButton").addEventListener("click", () => {
    const inputData = document.getElementById("autoFillInput").value;
    
    // Send a message to the content script with the input data
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "fillForm", data: inputData });
    });
  });