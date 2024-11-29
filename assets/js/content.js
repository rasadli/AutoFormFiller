console.log("Content script is running!");

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  if (message.action === "fillForm") {
    const { profileData, fieldMapping } = message;
    console.log(fieldMapping)
    fillWebsiteForm(profileData, fieldMapping);
    sendResponse({ success: true });
  }
});

// Function to fill the form
function fillWebsiteForm(profileData, fieldMapping) {
  const inputs = document.querySelectorAll("input, textarea, select");
  console.log(profileData)
  inputs.forEach((input) => {
    const fieldName = (input.name || input.id || input.placeholder).toLowerCase().replace(/\s+/g, '');
    console.log('fieldName', fieldName)
    // Ensure fieldMapping[key] is defined
    const mappedKey = Object.keys(fieldMapping).find(
      (key) => (fieldMapping[key] || []).includes(fieldName)
    );

    const valueToSet = mappedKey ? profileData[mappedKey] : null;

    console.log('valueToSet', valueToSet)

    if (valueToSet !== null && valueToSet !== undefined) {
      if (input.tagName === "SELECT") {
        input.value = valueToSet;
        input.dispatchEvent(new Event("change", { bubbles: true }));
      } else {
        input.value = valueToSet;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    } else {
      console.log(`No matching value found for input:`, input);
    }
  });

  alert("Form auto-filled with your profile data!");
}


// Save draft
if (document.querySelector('form') != null) {
  // Create the button
  const saveDraftButton = document.createElement("button");
  saveDraftButton.textContent = "Save As Draft";
  saveDraftButton.style.height = "auto";
  saveDraftButton.style.position = "fixed";
  saveDraftButton.style.bottom = "50px";
  saveDraftButton.style.right = "50px";
  saveDraftButton.style.zIndex = "1000";
  saveDraftButton.style.padding = "10px 15px";
  saveDraftButton.style.backgroundColor = "#0073b1";
  saveDraftButton.style.color = "#ffffff";
  saveDraftButton.style.border = "none";
  saveDraftButton.style.borderRadius = "5px";
  saveDraftButton.style.cursor = "pointer";

  document.body.appendChild(saveDraftButton);

  saveDraftButton.addEventListener('click', () => {
    const formElement = document.querySelector('form');
    const currentPageURL = window.location.href;

    if (!formElement) {
      console.error("No form found at the specified index.");
      return;
    }

    const currentForm = new FormData(formElement);
    const currentFormData = {};

    console.log("Form Element:", formElement);

    currentForm.forEach((value, key) => {
      console.log(`Key: ${key}, Value: ${value}`);
      currentFormData[key] = value;
    });

    console.log("Extracted Form Data:", currentFormData);
    alert("Data saved to storage successfully!");

    // Serialize data and save to localStorage
    localStorage.setItem(`${currentPageURL}`, JSON.stringify(currentFormData));
  });

}

const savedData = localStorage.getItem(window.location.href);
if (savedData) {
  const formData = JSON.parse(savedData);
  console.log("Retrieved Form Data:", formData);

  const useDraftButton = document.createElement("button");
  useDraftButton.textContent = "Use Draft";
  useDraftButton.style.height = "auto";
  useDraftButton.style.position = "fixed";
  useDraftButton.style.bottom = "50px";
  useDraftButton.style.right = "200px";
  useDraftButton.style.zIndex = "1000";
  useDraftButton.style.padding = "10px 15px";
  useDraftButton.style.backgroundColor = "#0084cc";
  useDraftButton.style.color = "#ffffff";
  useDraftButton.style.border = "none";
  useDraftButton.style.borderRadius = "5px";
  useDraftButton.style.cursor = "pointer";

  document.body.appendChild(useDraftButton);

  useDraftButton.addEventListener('click', () => {
    console.log(formData)
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const formElement = document.querySelector(`[name="${key}"]`);

        if (formElement) {
          if (formElement.type === 'radio' || formElement.type === 'checkbox') {
            formElement.checked = (formElement.value === formData[key]);
            formElement.dispatchEvent(new Event("change", { bubbles: true }));
          } else {
            formElement.value = formData[key];
            formElement.dispatchEvent(new Event("input", { bubbles: true }));
            formElement.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }
      }
    }
  })
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');   // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

const applyBtn = document.querySelector('button[type="submit"]');
if (applyBtn) {
  applyBtn.addEventListener('click', function (event) {
    event.preventDefault();  // Ensure the form doesn't actually submit

    console.log("Application submitted");

    const title = document.querySelector('title').textContent;
    const date = formatDate(new Date());
    const url = window.location.href;

    const jobData = {
      title: title,
      url: url,
      date: date,
      status: "Pending.."
    };

    // Log the new job data to the console
    console.log(jobData);

    // Retrieve existing job data from local storage
    chrome.storage.local.get(['jobs'], function (result) {
      let jobs = result.jobs || []; // Default to an empty array if no jobs exist

      // Add the new job to the jobs array
      jobs.push(jobData);

      // Save the updated jobs array back to local storage
      chrome.storage.local.set({ jobs: jobs }, function () {
        console.log("Job data saved to local storage");
      });
    });

  });
}
