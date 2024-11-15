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




































// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action == "fillForm") {
//     const data = request.data;
//     console.log("Data received for form filling:", data);

//     // Define selectors based on the Excel file's data
//     const fieldSelectors = {
//       fullName: ["input[name='fullName']", "input[id='name']"],
//       email: ["input[name='email']", "input[id='email']"],
//       phone: ["input[name='phone']", "input[id='phone']"]
//       // Add other fields as needed
//     };

//     // Fill form fields based on selectors
//     Object.keys(fieldSelectors).forEach(field => {
//       fieldSelectors[field].forEach(selector => {
//         const input = document.querySelector(selector);
//         if (input && data[field]) {
//           input.value = data[field];
//           input.dispatchEvent(new Event('input', { bubbles: true }));
//         }
//       });
//     });
//   }
// });
