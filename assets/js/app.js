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


const defaultFields = [
  { label: "Full Name", type: "text", id: "full-name" },
  { label: "First Name", type: "text", id: "first-name" },
  { label: "Last Name", type: "text", id: "last-name" },
  { label: "Email Address", type: "email", id: "email-address" },
  { label: "Phone Number", type: "tel", id: "phone-number" },
  { label: "Address", type: "textarea", id: "street-address" },
  { label: "City", type: "text", id: "city" },
  { label: "Citizenship Status", type: "select", id: "citizenship-status", options: ["Citizen", "Permanent Resident", "Visa Holder"] },
  { label: "State/Province", type: "text", id: "state" },
  { label: "Date of Birth", type: "date", id: "date-of-birth" },
  { label: "Resume Upload", type: "file", id: "resume-upload", accept: ".pdf,.doc,.docx" },
  { label: "Languages Spoken", type: "textarea", id: "languages-spoken" },
  { label: "Why Do You Want This Job?", type: "textarea", id: "job-motivation" },
  { label: "Achievements and Awards", type: "textarea", id: "achievements" },
];

const removedFields = [];
const jobApplicationForm = document.getElementById('job-application-form');
const removedFieldsSelect = document.getElementById('removed-fields');

// Function to render a field
function renderField(field) {
  const formGroup = document.createElement('div');
  formGroup.className = 'mb-3 input-group';
  formGroup.id = `form-group-${field.id}`;

  const label = document.createElement('label');
  label.className = 'form-label mr-2';
  label.htmlFor = field.id;
  label.textContent = field.label;

  const inputGroupDiv = document.createElement('div');
  inputGroupDiv.className = 'input-group';

  let input;
  if (field.type === 'textarea') {
      input = document.createElement('textarea');
      input.rows = 2;
  } else if (field.type === 'select') {
      input = document.createElement('select');
      input.className = 'form-control';
      input.innerHTML = field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
  } else {
      input = document.createElement('input');
      input.type = field.type;
      if (field.accept) input.accept = field.accept;
  }
  input.className = 'form-control';
  input.id = field.id;

  // Create remove button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger';
  deleteBtn.textContent = 'Remove';
  deleteBtn.onclick = (e) => {
      e.preventDefault();
      removeField(field, formGroup);
  };

  // Append label, input, and delete button to the input group
  inputGroupDiv.appendChild(input);
  inputGroupDiv.appendChild(deleteBtn);
  formGroup.appendChild(label);
  formGroup.appendChild(inputGroupDiv);
  
  jobApplicationForm.appendChild(formGroup);
}

// Function to remove a field
function removeField(field, formGroup) {
  jobApplicationForm.removeChild(formGroup);
  removedFields.push(field);
  updateRemovedFieldsSelect();
}

// Function to re-add a removed field
function reAddField() {
  const selectedFieldId = removedFieldsSelect.value;
  const fieldIndex = removedFields.findIndex(f => f.id === selectedFieldId);
  if (fieldIndex !== -1) {
      const field = removedFields.splice(fieldIndex, 1)[0];
      renderField(field);
      updateRemovedFieldsSelect();
  }
}

// Function to update the removed fields select
function updateRemovedFieldsSelect() {
  removedFieldsSelect.innerHTML = `<option value="" disabled selected>Select a field to re-add</option>`;
  removedFields.forEach(field => {
      const option = document.createElement('option');
      option.value = field.id;
      option.textContent = field.label;
      removedFieldsSelect.appendChild(option);
  });
}

// Function to add a custom field
function addCustomField() {
  const label = prompt("Enter the field label:");
  if (label) {
      const fieldType = prompt("Enter the field type (text, email, date, etc.):");
      if (fieldType) {
          const fieldId = label.toLowerCase().replace(/ /g, '-');
          const newField = { label, type: fieldType, id: fieldId };
          renderField(newField);
      }
  }
}

// Initial render of default fields
defaultFields.forEach(field => renderField(field));

// Event listeners
document.getElementById('readd-field-btn').addEventListener('click', reAddField);
document.getElementById('add-custom-field-btn').addEventListener('click', addCustomField);


chrome.storage.local.get("LinkedInData", (result) => {
  console.log(result.Link)
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  console.log('yesss')
  // Check if LinkedInData has changed in the local storage
  if (areaName === "local" && changes.LinkedInData) {
    const updatedData = changes.LinkedInData.newValue;
    if (updatedData) {
      // Update the DOM with the new data
      document.getElementById("first-name").value = updatedData.name || "N/A";
      document.getElementById("last-name").value = updatedData.surname || "N/A";
      document.getElementById("city").value = updatedData.location || "N/A";
      // If needed, you can also update other elements
      // document.getElementById("profile-headline").innerText = updatedData.headline || "N/A";
      // document.getElementById("profile-location").innerText = updatedData.location || "N/A";
    }
  }
});



document.getElementById("save_data").addEventListener("submit", function(event) {
  event.preventDefault();

  const formData = new FormData(event.target); 
  const dataObject = {};


  formData.forEach((value, key) => {
    dataObject[key] = value;
  });

  console.log("Form Data:", dataObject);

});





























// document.getElementById("fillFormButton").addEventListener("click", () => {
//   const inputData = {
//     fullName: document.getElementById("fullNameInput").value,
//     email: document.getElementById("emailInput").value,
//     phone: document.getElementById("phoneInput").value
//     // Add other fields as needed
//   };
  

//     // Profile Switching Code (Newly Added)
//     const selectedProfile = document.getElementById("profileSelect").value; // Get selected profile
//     if (selectedProfile) {
//       chrome.storage.local.get("profiles", (result) => {
//         const profiles = result.profiles || {};
//         profiles[selectedProfile] = inputData; // Save data to the selected profile
//         chrome.storage.local.set({ profiles }, () => {
//           console.log("Data saved for profile:", selectedProfile);
//         });
//       });
//     }

//   // Save data to Chrome storage
//   chrome.storage.local.set({ autoFilledData: inputData }, () => {
//     console.log("Data saved:", inputData);
//   });

//   // Send a message to the content script with the input data
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.tabs.sendMessage(tabs[0].id, { action: "fillForm", data: inputData });
//   });
// });

// document.addEventListener('DOMContentLoaded', function () {
//   chrome.storage.local.get('autoFilledData', function (result) {
//     const storedData = result.autoFilledData;

//     if (storedData) {
//       document.getElementById('fullNameInput').value = storedData.fullName || "";
//       document.getElementById('emailInput').value = storedData.email || "";
//       document.getElementById('phoneInput').value = storedData.phone || "";
//       // Populate other fields as needed
//     } else {
//       console.log('No data found in chrome.storage');
//     }
//   });

//   // Profile Switching Code (Newly Added)
//   loadProfileOptions();
//   loadCurrentProfileData();
// });

// // Profile Switching Functions (Newly Added)

// // Elements for profile management
// const profileSelect = document.getElementById("profileSelect");
// const newProfileNameInput = document.getElementById("newProfileName");

// // Load profile options into dropdown
// function loadProfileOptions() {
//   chrome.storage.local.get("profiles", (result) => {
//     const profiles = result.profiles || {};
//     profileSelect.innerHTML = `
//       <option>Default Profile</option>
//       <option>Software Engineer</option>
//       <option>Project Manager</option>
//     `; // Predefined options
//     for (const profileName in profiles) {
//       const option = document.createElement("option");
//       option.value = profileName;
//       option.textContent = profileName;
//       profileSelect.appendChild(option);
//     }
//   });
// }

// // Load data for the selected profile
// function loadCurrentProfileData() {
//   const selectedProfile = profileSelect.value;
//   if (!selectedProfile) return;

//   chrome.storage.local.get("profiles", (result) => {
//     const profiles = result.profiles || {};
//     const profileData = profiles[selectedProfile] || {};

//     // Populate form fields with the selected profile’s data
//     document.getElementById("fullNameInput").value = profileData.fullName || "";
//     document.getElementById("emailInput").value = profileData.email || "";
//     document.getElementById("phoneInput").value = profileData.phone || "";
//   });
// }

// // Add a new profile
// document.getElementById("addProfileButton").addEventListener("click", () => {
//   const profileName = newProfileNameInput.value.trim();
//   if (!profileName) return;

//   chrome.storage.local.get("profiles", (result) => {
//     const profiles = result.profiles || {};
//     if (!profiles[profileName]) {
//       profiles[profileName] = {}; // Initialize empty profile
//       chrome.storage.local.set({ profiles }, loadProfileOptions);
//       newProfileNameInput.value = ""; // Clear input
//     } else {
//       alert("Profile name already exists.");
//     }
//   });
// });

// // Delete the selected profile
// document.getElementById("deleteProfileButton").addEventListener("click", () => {
//   const selectedProfile = profileSelect.value;
//   chrome.storage.local.get("profiles", (result) => {
//     const profiles = result.profiles || {};
//     if (profiles[selectedProfile]) {
//       delete profiles[selectedProfile];
//       chrome.storage.local.set({ profiles }, loadProfileOptions);

//       // Clear form fields after deleting profile
//       document.getElementById("fullNameInput").value = "";
//       document.getElementById("emailInput").value = "";
//       document.getElementById("phoneInput").value = "";
//     }
//   });
// });
