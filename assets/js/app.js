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
const profiles = {};
const profileSelect = document.getElementById('profile-select');

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
  input.name = field.id;

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

// Function to load profiles from Chrome Storage
function loadProfilesFromStorage() {
  chrome.storage.local.get("profiles", (result) => {
      if (result.profiles) {
          Object.assign(profiles, result.profiles);
          populateProfileSelect();
      }
  });
}

// Function to save profiles to Chrome Storage
function saveProfilesToStorage() {
  chrome.storage.local.set({ profiles });
}

// Function to populate profile dropdown
function populateProfileSelect() {
  profileSelect.innerHTML = `<option value="0" disabled selected>Select a profile</option>`;
  for (const profileName in profiles) {
      const option = document.createElement('option');
      option.value = profileName;
      option.textContent = profileName;
      profileSelect.appendChild(option);
  }
}

// Function to load profile data into form fields
function loadProfileData(profileData) {
  for (const key in profileData) {
      const input = document.querySelector(`[name="${key}"]`);
      if (input) {
          input.value = profileData[key] || "";
      }
  }
}

// Event listener for profile selection change
profileSelect.addEventListener('change', () => {
  const selectedProfile = profileSelect.value;
  if (selectedProfile !== "0" && profiles[selectedProfile]) {
      loadProfileData(profiles[selectedProfile].data);
  }
});

// Add a new profile
document.getElementById('add-profile-btn').addEventListener('click', () => {
  const profileName = prompt("Enter profile name:");
  if (profileName && !profiles[profileName]) {
      profiles[profileName] = { data: {} };
      saveProfilesToStorage();
      populateProfileSelect();
      alert(`Profile "${profileName}" created!`);
  } else {
      alert("Profile name is required or already exists.");
  }
});

// Form submission
document.getElementById("job-application-form").addEventListener("submit", function (event) {
  const selectedProfile = profileSelect.value;
  if (selectedProfile !== "0") {
      event.preventDefault();
      const formData = new FormData(event.target);
      const dataObject = {};
      formData.forEach((value, key) => {
          dataObject[key] = value;
      });
      profiles[selectedProfile].data = dataObject;
      saveProfilesToStorage();
      alert(`Data saved for profile "${selectedProfile}"!`);
  } else {
      alert("Please choose or create a profile.");
  }
});

// Initial render of default fields
defaultFields.forEach(field => renderField(field));

// Load profiles and initialize form on page load
document.addEventListener('DOMContentLoaded', () => {
  loadProfilesFromStorage();
});


// Function to auto-fill the website's form with the selected profile's data
function autoFillForm() {
    // Get the selected profile
    const selectedProfile = profileSelect.value;
  
    if (selectedProfile === "0") {
      alert("Please choose or create a profile before using Auto-Fill.");
      return;
    }
  
    // Retrieve the saved profile data
    const profileData = profiles[selectedProfile]?.data || {};
  
    // Check if profile data exists
    if (Object.keys(profileData).length === 0) {
      alert("No data found in the selected profile. Please save data first.");
      return;
    }
  
    // Use a content script to fill the form on the active website
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: fillWebsiteForm,
        args: [profileData],
      });
    });
  }
  
  // Content script function to fill the form on the current website
  function fillWebsiteForm(profileData) {
    // Find all form fields on the website
    const inputs = document.querySelectorAll("input, textarea, select");
  
    inputs.forEach((input) => {
      const fieldName = input.name || input.id || input.placeholder;
  
      // Match and fill fields with the saved profile data
      if (fieldName && profileData[fieldName]) {
        input.value = profileData[fieldName];
      }
    });
  
    alert("Form auto-filled with your profile data!");
  }
  
  // Add Auto-Fill button to trigger this functionality
  document.getElementById("auto-fill-btn").addEventListener("click", autoFillForm);

  // Function to generate a tailored cover letter
async function generateCoverLetter() {
  // Step 1: Get the selected profile data
  const selectedProfile = profileSelect.value;
  if (selectedProfile === "0") {
      alert("Please choose or create a profile before generating a cover letter.");
      return;
  }

  const profileData = profiles[selectedProfile]?.data || {};

  if (!profileData || Object.keys(profileData).length === 0) {
      alert("No profile data found. Please fill out your profile first.");
      return;
  }

  // Step 2: Detect job title and company name from the webpage
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getJobDetails" }, async (response) => {
          if (!response || !response.jobTitle || !response.companyName) {
              alert("Unable to detect job title or company name on this webpage.");
              return;
          }

          const { jobTitle, companyName } = response;

          // Step 3: Generate the cover letter using a mock API
          const apiEndpoint = "https://api.example.com/generate-cover-letter"; // Replace with an actual API
          const requestBody = {
              userProfile: profileData,
              jobTitle,
              companyName,
          };

          try {
              const apiResponse = await fetch(apiEndpoint, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(requestBody),
              });

              if (!apiResponse.ok) {
                  throw new Error(`API Error: ${apiResponse.statusText}`);
              }

              const responseData = await apiResponse.json();
              const coverLetter = responseData.coverLetter;

              // Step 4: Display the generated cover letter
              document.getElementById("cover-letter-output").value = coverLetter || "No cover letter generated.";
          } catch (error) {
              console.error("Error generating cover letter:", error);
              alert("Failed to generate the cover letter. Please try again.");
          }
      });
  });
}

// Attach event listener to Generate Cover Letter button
document.getElementById("generate-cover-letter-btn").addEventListener("click", generateCoverLetter);


  /*
// Elements for field mapping
const formFieldNameInput = document.getElementById("formFieldName");
const mappedDataFieldSelect = document.getElementById("mappedDataField");
const saveMappingButton = document.getElementById("saveMappingButton");
const mappingList = document.getElementById("mappingList");

// Load existing mappings on page load
document.addEventListener("DOMContentLoaded", function () {
    loadMappings();
});

// Save a new mapping
saveMappingButton.addEventListener("click", () => {
    const formFieldName = formFieldNameInput.value.trim();
    const mappedDataField = mappedDataFieldSelect.value;

    if (!formFieldName) {
        alert("Please enter a form field name.");
        return;
    }

    chrome.storage.local.get("fieldMappings", (result) => {
        const mappings = result.fieldMappings || {};
        mappings[formFieldName] = mappedDataField; // Save mapping
        chrome.storage.local.set({ fieldMappings: mappings }, () => {
            console.log("Mapping saved:", mappings);
            loadMappings(); // Reload mapping list
        });
    });

    formFieldNameInput.value = ""; // Clear inputs
    mappedDataFieldSelect.value = "fullName";
});

// Load and display saved mappings
function loadMappings() {
    chrome.storage.local.get("fieldMappings", (result) => {
        const mappings = result.fieldMappings || {};
        mappingList.innerHTML = ""; // Clear existing list
        for (const [formFieldName, mappedDataField] of Object.entries(mappings)) {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center";
            listItem.textContent = `${formFieldName} → ${mappedDataField}`;
            const deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-danger btn-sm";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteMapping(formFieldName));
            listItem.appendChild(deleteButton);
            mappingList.appendChild(listItem);
        }
    });
}

// Delete a mapping
function deleteMapping(formFieldName) {
    chrome.storage.local.get("fieldMappings", (result) => {
        const mappings = result.fieldMappings || {};
        delete mappings[formFieldName];
        chrome.storage.local.set({ fieldMappings: mappings }, loadMappings); // Reload mapping list
    });
}

// Use saved mappings to fill forms
function fillFormWithMappings(inputData) {
    chrome.storage.local.get("fieldMappings", (result) => {
        const mappings = result.fieldMappings || {};

        for (const [formFieldName, mappedDataField] of Object.entries(mappings)) {
            const inputElement = document.querySelector(`[name="${formFieldName}"]`);
            if (inputElement && inputData[mappedDataField]) {
                inputElement.value = inputData[mappedDataField]; // Fill form field
            }
        }
    });
}*/