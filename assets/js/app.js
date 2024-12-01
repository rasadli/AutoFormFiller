const defaultFields = [
  { label: "First Name", type: "text", id: "first-name" },
  { label: "Last Name", type: "text", id: "last-name" },
  { label: "Email Address", type: "email", id: "email-address" },
  { label: "Phone Number", type: "tel", id: "phone-number" },
  { label: "Address", type: "textarea", id: "street-address" },
  { label: "Company Name", type: "textarea", id: "company-name" },
  { label: "Job title", type: "textarea", id: "job-title" },
  { label: "City", type: "text", id: "city" },
  { label: "Citizenship Status", type: "select", id: "citizenship-status", options: ["Citizen", "Permanent Resident", "Visa Holder"] },
  { label: "Country", type: "text", id: "country" },
  { label: "Date of Birth", type: "date", id: "date-of-birth" },
  { label: "Languages Spoken", type: "textarea", id: "languages-spoken" },
  { label: "Why Do You Want This Job?", type: "textarea", id: "job-motivation" },
  { label: "Achievements and Awards", type: "textarea", id: "achievements" },
  { label: "Experiences", type: "textarea", id: "experiences" },
  { label: "Education", type: "textarea", id: "education" },
  { label: "Projects", type: "textarea", id: "projects" },
  { label: "Skills", type: "textarea", id: "skills" }
];

const fieldMapping = {
  "first-name": ["firstname", "first_name", "name", "givenname", "first"],
  "last-name": ["lastname", "last_name", "surname", "familyname", "secondname"],
  "email-address": ["email", "email_address", "emailaddress"],
  "phone-number": ["phone", "phone_number", "phonenumber", "contact"],
  "street-address": ["address", "street", "street_address", "streetaddress"],
  "city": ["city", "town", "location"],
  "citizenship-status": ["citizenship", "citizenship_status", "resident_status", "visa_status"],
  "country": ["country", "nation", "region", "location", "province"],
  "date-of-birth": ["dob", "dateofbirth", "birthdate", "birthday"],
  "languages-spoken": ["languages", "languages_spoken", "spoken_languages"],
  "achievements": ["achievements", "accomplishments", "awards", "honors"],
  "experiences": ["experience", "experiences", "work_experience", "job_experience"],
  "education": ["educations", "studies", "academic_experience"],
  "projects": ["projects", "projects_work", "project_experience", "completed_projects"],
  "skills": ["skills", "technical_skills", "soft_skills", "relevant_skills"],
  "job-title": ["job-title", "position", "role", "job_position"],
  "company-name": ["company-name", "company", "workplace", "company_experience"]
};

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

  inputGroupDiv.appendChild(input);

  formGroup.appendChild(label);
  formGroup.appendChild(inputGroupDiv);

  jobApplicationForm.appendChild(formGroup);
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
  clearForm()
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

// Function to delete profile
function deleteProfile(profileName) {
  const confirmDelete = confirm(`Are you sure you want to delete the profile "${profileName}"?`);
  if (confirmDelete) {
    delete profiles[profileName];
    saveProfilesToStorage();
    populateProfileSelect();
    alert(`Profile "${profileName}" has been deleted.`);
  }
}

// Function to update profile name
function updateProfileName(profileName) {
  const newName = prompt("Enter new profile name:", profileName);
  if (newName && newName !== profileName && !profiles[newName]) {
    // Save the profile with the new name
    profiles[newName] = profiles[profileName];
    delete profiles[profileName]; // Delete old profile name
    saveProfilesToStorage();
    populateProfileSelect();
    alert(`Profile name updated to "${newName}"`);
  } else if (newName === profileName) {
    alert("The new name must be different from the current one.");
  } else {
    alert("Profile name already exists or is invalid.");
  }
}

// Event listener to handle profile updates (rename)
document.getElementById('update-profile-btn').addEventListener('click', () => {
  const selectedProfile = profileSelect.value;
  if (selectedProfile !== "0" && profiles[selectedProfile]) {
    updateProfileName(selectedProfile);
  } else {
    alert("Please select a valid profile.");
  }
});

// Event listener to handle profile deletion
document.getElementById('delete-profile-btn').addEventListener('click', () => {
  const selectedProfile = profileSelect.value;
  if (selectedProfile !== "0" && profiles[selectedProfile]) {
    deleteProfile(selectedProfile);
  } else {
    alert("Please select a valid profile.");
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


// Add Auto-Fill button to trigger this functionality
document.getElementById("auto-fill-btn").addEventListener("click", autoFillForm);

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
  console.log(profileData)

  // Send a message to the content script to fill the form
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "fillForm", profileData: profileData, fieldMapping: fieldMapping },
      (response) => {
        console.log(response);

        if (response?.success) {
          console.log("Form successfully auto-filled!");
        } else {
          console.error("Failed to auto-fill the form.");
        }
      }
    );
  });
}

function clearForm() {
  // Get all input elements in the form
  const inputs = document.querySelectorAll('form input, form select, form textarea');

  // Loop through each input and clear its value
  inputs.forEach(input => {
    if (input.type === 'checkbox' || input.type === 'radio') {
      input.checked = false; // For checkboxes and radio buttons
    } else {
      input.value = ''; // Clear text, select, and textarea fields
    }
  });
}

// Generate Cover Letter 
async function runAI() {
  // Disable the button to prevent multiple clicks
  const generateButton = document.getElementById('generate-cover-letter-btn');

  document.getElementById('generate-cover-letter-btn')
  const genAI = new window.GoogleGenerativeAI(
    "AIzaSyAyHdRl-zfLxZjhjnSsq7p9TnEbPF_obdE"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
  console.log(profileData)
  document.getElementById('cover-letter-log').textContent = 'Generating cover letter...';

  const prompt = `
 *Create a professional and engaging cover letter tailored for [Job Title] at [Company Name]. Use the following details to craft the content:*

Header:

Include my personal details (name, address, phone, email) at the top.
Add the recipient details (hiring manager name, title, company name, address).
Insert the current date.
Introduction:

Address the hiring manager by name (or use “Dear Hiring Manager” if the name is unknown).
Introduce me as a [Your Degree/Current Job Title] and mention the job I’m applying for.
Share why I’m excited about this opportunity and how I discovered the role.
Body:

Highlight my educational background (e.g., [Degree, Institution]) and how it prepares me for this role.
Discuss relevant experiences ([Internship/Work Experience Details]) and specific achievements that align with the job description.
Showcase key technical and soft skills ([e.g., programming, communication, leadership]) and their relevance to the position.
Mention any significant projects, awards, or activities that demonstrate my qualifications.
Conclusion:

Reaffirm my enthusiasm for the role and the company.
Mention my eagerness to contribute and grow with the team.
Request an opportunity for an interview to discuss how my skills align with the company’s needs.
Closing:

Use a professional sign-off (e.g., “Sincerely”).
Include my full name below the closing.
Formatting Instructions:

Keep the cover letter concise and limited to one page.
Use a professional tone with clear and engaging language.
Ensure smooth transitions between sections for readability.

Note: No need to include :  [Platform where job posting is found]

Data will be used:
    [Name] - ${profileData["first-name"] || 'Not Given'}
    [Surname] - ${profileData["last-name"] || 'Not Given'}
    [Address] - ${profileData["street-address"] || 'Not Given'}
    [Phone Number] - ${profileData["phone-number"] || 'Not Given'}
    [Email Address] - ${profileData["email-address"] || 'Not Given'}
    [Date] - ${new Date().toLocaleDateString()}
    [Hiring Manager Name] - ${profileData.hiringManager?.name || 'Not Given'}
    [Hiring Manager Title] - ${profileData.hiringManager?.title || 'Not Given'}
    [Company Name] - ${profileData["company-name"] || 'Not Given'}
    [Job Title] - ${profileData["job-title"] || 'Not Given'}
    [Education] - ${profileData.education || 'Not Given'}
    [Industry/Field] - ${profileData.industry || 'Not Given'}
    [Internship/Work Experience] - ${profileData.experiences || 'Not Given'}
    [Specific Achievement] - ${profileData.achievements || 'Not Given'}
    [Relevant Projects] - ${profileData.projects || 'Not Given'}
    [Skill] - ${profileData.skills || 'Not Given'}
`;
  console.log(prompt)
  document.getElementById('cover-letter-log').textContent += '\nPreparing to generate...';

  let retries = 3; // Number of retries
  let delay = 5000; // Delay between retries in milliseconds

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt}...`);
      const result = await model.generateContent(prompt);
      generateButton.disabled = true;
      console.log("Generated Response:", result.response.text());
      document.getElementById("cover-letter-output").value =
        result.response.text();
      document.getElementById('cover-letter-log').textContent += '\nCover letter generated successfully!';

      return; // Exit after a successful response
    } catch (error) {
      if (attempt < retries) {
        console.error(
          `Error during API call (Attempt ${attempt}):`,
          error.message
        );
        document.getElementById('cover-letter-log').textContent += `\nError during attempt ${attempt}: ${error.message}. Retrying...`;

        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error("All retry attempts failed. Please try again later.");
        document.getElementById('cover-letter-log').textContent += `\nAll retry attempts failed. Please try again later.`;

        return;
      }
    } finally {
      generateButton.disabled = false;
    }
  }
}

document.getElementById('generate-cover-letter-btn').addEventListener('click', runAI)


document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('linkedinProfile', (result) => {
    if (result.linkedinProfile) {
      // If data exists, perform some action
      console.log('LinkedIn profile data found:', result.linkedinProfile);
      // document.getElementById('useFetchedData').classList.remove('d-none')
      // document.getElementById('useFetchedData').addEventListener('click', populateFields(result.linkedinProfile))
    } else {
      console.log('No LinkedIn profile data found in local storage.');
    }
  });


  const fetchButton = document.getElementById('fetchButton');
  const profileUrlInput = document.getElementById('userProfileURL');
  const resultContainer = document.getElementById('results');

  fetchButton.addEventListener('click', () => {
    const profileUrl = profileUrlInput.value.trim();

    if (!profileUrl) {
      resultContainer.textContent = 'Please enter a profile URL.';
      return;
    }

    resultContainer.textContent = 'Fetching data...';

    // Send a message to the background script
    chrome.runtime.sendMessage(
      {
        action: 'fetchLinkedinData',
        profileUrl: profileUrl,
      },
      (response) => {
        if (response.success) {
          console.log('Data received:', response.data);
          resultContainer.textContent = JSON.stringify(response.data, null, 2);

          // Populate fields
          populateFields(response.data.data);

          chrome.storage.local.set({ linkedinProfile: response.data.data }, () => {
            console.log('LinkedIn profile data saved to Chrome local storage.');
          });

        } else {
          console.error('Error:', response.error);
          resultContainer.textContent = `Error: ${response.error}`;
        }
      }
    );
  });

  // Helper function to populate a single field
  function populateField(id, value) {
    const field = document.querySelector(` [name="${id}"]`);
    if (!field) return;

    if (field.tagName === 'TEXTAREA' || field.tagName === 'INPUT') {
      field.value = value;
    } else if (field.tagName === 'SELECT') {
      field.value = value;
    }
  }

  // Function to populate all fields based on the received JSON data
  function populateFields(data) {
    clearForm()
    // Mapping JSON data to the default fields
    populateField('first-name', data.name || '');
    populateField('last-name', data.surname || '');
    populateField('email-address', data.email || '');
    // populateField('phone-number', data.phoneNumber || '');
    populateField('street-address', data.location || '');
    // populateField('city', data.city || '');
    // populateField('citizenship-status', data.citizenshipStatus || '');
    // populateField('country', data.country || '');
    // populateField('date-of-birth', data.dateOfBirth || '');

    // Populate languages spoken
    const languagesSpoken = (data.languages || [])
      .map(
        (lang) =>
          `${lang.languageName} - ${lang.languageDesccription}`
      )
      .join('\n');
    populateField('languages-spoken', languagesSpoken);

    // Populate achievements and awards
    const achievements = (data.projects || [])
      .map(
        (project) =>
          `Project: ${project.projectName}\nDescription: ${project.projectDescription}\nDuration: ${project.projectStartDate} - ${project.projectEndDate}\n`
      )
      .join('\n');
    populateField('achievements', achievements);

    // Populate education details
    const educationDetails = (data.educations || [])
      .map(
        (education) =>
          `Education: ${education.educationName}\nDescription: ${education.educationDescription}\nDuration: ${education.educationStartDate} - ${education.educationEndDate}\n`
      )
      .join('\n');
    populateField('education', educationDetails);

    // Map each project entry to its corresponding formatted string
    const projects = (data.projects || [])
      .map(
        (project) =>
          `Project: ${project.projectName}\nDescription: ${project.projectDescription}\nDuration: ${project.projectStartDate} - ${project.projectEndDate}\n`
      )
      .join('\n');
    populateField('projects', projects);

    // Populate experiences
    const experiences = (data.experiences || [])
      .map(
        (experience) =>
          `Company: ${experience.companyName} (${experience.companyDuration})\n` +
          experience.positions
            .map(
              (position) =>
                `Position: ${position.positionName}\nLocation: ${position.positionLocation}\nStart: ${position.positionStartTime}\nEnd: ${position.positionEndTime}`
            )
            .join('\n')
      )
      .join('\n');
    populateField('experiences', experiences);

    alert('All possible data have been placed.')
  }
});

$('#export-btn').click(function () {
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

  const jsonData = JSON.stringify(profileData, null, 2);  // Converts to formatted JSON string

  // Create a Blob with JSON data and trigger download
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'profileData.json';  // Set the file name for download
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);  // Release the URL object
});

// Import function
$('#import-btn').click(function () {
  $('#file-input').trigger('click');  // Trigger file input click
});

function populateFormFields(data) {
  clearForm()
  defaultFields.forEach(field => {
    const element = document.querySelector(` [name="${field.id}"]`);

    if (element) {
      // Check if field is a textarea or a normal input field
      if (field.type === "textarea") {
        element.value = data[field.id] || '';
      } else if (field.type === "select") {
        const selectElement = element;
        Array.from(selectElement.options).forEach(option => {
          if (option.value === data[field.id]) {
            option.selected = true;
          }
        });
      } else {
        element.value = data[field.id] || '';
      }
    }
  });
}

// Handle file input change (when file is selected)
$('#file-input').change(function (event) {
  const file = event.target.files[0];
  if (file && file.name.endsWith('.json')) {
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        // Log the raw content of the file for debugging
        console.log('File content:', e.target.result);

        // Parse the uploaded JSON file
        const importedData = JSON.parse(e.target.result);
        populateFormFields(importedData);

        // Here you can update the profileData with the imported JSON
        // profileData = { ...profileData, ...importedData };
        console.log('Imported Data:', importedData);
        alert('Profile data imported successfully!');
      } catch (err) {
        console.error('Error reading or parsing JSON file:', err);
        alert('Error reading or parsing JSON file. Please ensure the file is a valid JSON file.');
      }
    };

    reader.readAsText(file);  // Read the file as text
  } else {
    alert('Please select a valid JSON file.');
  }
});
