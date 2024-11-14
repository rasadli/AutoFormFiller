chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'buttonClicked') {
      const data = message.data;
  
      if (data) {
        chrome.storage.local.set({ autoFilledData: data }, function () {
          if (chrome.runtime.lastError) {
            console.error("Error storing data:", chrome.runtime.lastError);
          } else {
            console.log('Data stored in chrome.storage');
          }
        });
      }
    }
  });
  