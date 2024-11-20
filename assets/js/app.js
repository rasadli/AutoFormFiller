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

// Generate Cover Letter 
async function run() {

  const genAI = new window.GoogleGenerativeAI("AIzaSyASGdeh-E1vHPAe22-HztjHPViuHT1kEuI");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const prompt = "Explain how AI works";

  let retries = 3; // Number of retries
  let delay = 5000; // Delay between retries in milliseconds

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt}...`);
      const result = await model.generateContent(prompt);
      console.log("Generated Response:", result.response.text());
      document.getElementById('cover-letter-output').value = result.response.text();
      return; // Exit after a successful response
    } catch (error) {
      if (attempt < retries) {
        console.error(`Error during API call (Attempt ${attempt}):`, error.message);
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.error("All retry attempts failed. Please try again later.");
        return;
      }
    }
  }
}

document.getElementById('generate-cover-letter-btn').addEventListener('click', run)