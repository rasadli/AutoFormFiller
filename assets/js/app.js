// document.getElementById("fillFormButton").addEventListener("click", () => {
//   const inputData = document.getElementById("autoFillInput").value;

//   // Send a message to the content script with the input data
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.tabs.sendMessage(tabs[0].id, { action: "fillForm", data: inputData });
//   });
// });


document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get('autoFilledData', function (result) {
    const storedValue = result.autoFilledData;

    if (storedValue) {
      document.getElementById('autoFillInput').value = storedValue;
    } else {
      console.log('No data found in chrome.storage');
    }
  });
});

