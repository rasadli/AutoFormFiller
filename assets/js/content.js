//console.log("Content script is running!");
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action == "fillForm") {
//     const data = request.data;
//     console.log(data)

//     // Target the specific input field on the page, e.g., by its ID or class
//     const targetInput = document.querySelector("input[name='username']"); // Adjust this selector to match the webpage's input field
//     console.log(targetInput)
//     if (targetInput) {
//       targetInput.value = data;  // Fill the input with the data from the extension
//       targetInput.dispatchEvent(new Event('input', { bubbles: true })); // Optional: Trigger an input event if needed
//     }
//   }
// });

//const button = document.querySelector('button[type="submit"]');

// if (button) {
//   button.addEventListener('click', function (event) {
//     event.preventDefault(); // Prevent default button behavior

//     // Get the data (replace with your actual data)
//     const autoFilledData = 'Some value you want to store';

//     // Send message to background script with the data
//     chrome.runtime.sendMessage({ type: 'buttonClicked', data: autoFilledData });
//   });
// }

console.log("Content script is running!");


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == "fillForm") {
    const data = request.data;
    console.log("Data received for form filling:", data);

    // Define selectors based on the Excel file's data
    const fieldSelectors = {
      fullName: ["input[name='fullName']", "input[id='name']"],
      email: ["input[name='email']", "input[id='email']"],
      phone: ["input[name='phone']", "input[id='phone']"]
      // Add other fields as needed
    };

    // Fill form fields based on selectors
    Object.keys(fieldSelectors).forEach(field => {
      fieldSelectors[field].forEach(selector => {
        const input = document.querySelector(selector);
        if (input && data[field]) {
          input.value = data[field];
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
    });
  }
});
