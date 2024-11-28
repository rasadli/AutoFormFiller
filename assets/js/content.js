console.log("Content script is running!");

// if (chrome.extension.isIncognitoContext) {
//   console.log("Running in incognito mode");
// } else {
//   console.log("Running in regular mode");
// }



// if (window.location.href.includes("linkedin.com/in")) {
//   console.log("testLinkediun");

//   // Create the button
//   const grabDataButton = document.createElement("button");
//   grabDataButton.textContent = "Grab LinkedIn Data";
//   grabDataButton.style.position = "fixed";
//   grabDataButton.style.bottom = "50px";
//   grabDataButton.style.right = "20px";
//   grabDataButton.style.zIndex = "1000";
//   grabDataButton.style.padding = "10px 15px";
//   grabDataButton.style.backgroundColor = "#0073b1";
//   grabDataButton.style.color = "#ffffff";
//   grabDataButton.style.border = "none";
//   grabDataButton.style.borderRadius = "5px";
//   grabDataButton.style.cursor = "pointer";

//   document.body.appendChild(grabDataButton);

//   // Event listener for button click
//   grabDataButton.addEventListener("click", async () => {
//     // console.log((document.querySelector(".text-heading-xlarge").innerText).split(" ")[0])

//     const courses = Array.from(document.querySelectorAll(".courses li")).map(course => {
//       const courseName = course.querySelector("h3") ? course.querySelector("h3").textContent.trim() : '';
//       const courseCode = course.querySelector("h4") ? course.querySelector("h4").textContent.trim() : '';
//       return { courseName, courseCode };
//     });

//     const languages = Array.from(document.querySelectorAll('.languages ul > li')).map(language => {
//       const languageName = language.querySelector('h3') ? language.querySelector('h3').textContent.trim() : '';
//       const languageDesccription = language.querySelector('h4') ? language.querySelector('h4').textContent.trim() : '';
//       return { languageName, languageDesccription };
//     });

//     const educations = Array.from(document.querySelectorAll('.education ul > li')).map(education => {
//       const educationName = education.querySelector('h3 a')
//         ? education.querySelector('h3 a').textContent.trim()
//         : education.querySelector('h3')
//           ? education.querySelector('h3').textContent.trim()
//           : '';
//       const educationDescription = Array.from(education.querySelectorAll('h4 span')).map(span => span.textContent.trim()).join(' ');

//       const educationStartDate = education.querySelector('p time:first-child') ? education.querySelector('p time:first-child').textContent : '';
//       const educationEndDate = education.querySelector('p time:last-child') ? education.querySelector('p time:last-child').textContent : '';

//       return { educationName, educationDescription, educationStartDate, educationEndDate };
//     });

//     const projects = Array.from(document.querySelectorAll('.projects ul > li')).map(project => {
//       const projectName = project.querySelector('h3') ? project.querySelector('h3').textContent.trim() : '';
//       const projectStartDate = project.querySelector('h4 time:first-child') ? project.querySelector('h4 time:first-child').textContent : '';
//       const projectEndDate = project.querySelector('h4 time:last-child') ? project.querySelector('h4 time:last-child').textContent : '';
//       const projectDescription = project.querySelector('p') ? project.querySelector('p').textContent.trim() : '';
//       return { projectName, projectStartDate, projectEndDate, projectDescription };
//     });

//     const experiences = Array.from(document.querySelectorAll('.experience ul.experience__list > li')).map(experience => {
//       // Check if the experience has grouped positions (experience-group)
//       if (experience.classList.contains('experience-group')) {
//         const companyName = experience.querySelector('.experience-group-header h4') ? experience.querySelector('.experience-group-header h4').textContent.trim() : '';
//         const companyDuration = experience.querySelector('.experience-group-header p span.date-range span') ? experience.querySelector('.experience-group-header p span.date-range span').textContent.trim() : '';

//         // Loop through the positions inside the experience group
//         const positions = Array.from(experience.querySelectorAll('.experience-group__positions li')).map(position => {
//           const positionName = position.querySelector('h3 span.experience-item_title') ? position.querySelector('h3 span.experience-item_title').textContent.trim() : '';
//           const positionStartTime = position.querySelector('p.experience-item_meta-item:first-child span.date-range time:first-child') ? position.querySelector('p.experience-item_meta-item:first-child span.date-range time:first-child').textContent.trim() : '';
//           const positionEndTime = position.querySelector('p.experience-item_meta-item:first-child span.date-range time:nth-child(2)') ? position.querySelector('p.experience-item_meta-item:first-child span.date-range time:nth-child(2)').textContent.trim() : 'Today';
//           const positionTimeDuration = position.querySelector('p.experience-item_meta-item:first-child span span') ? position.querySelector('p.experience-item_meta-item:first-child span span').textContent.trim() : '';
//           const positionLocation = position.querySelector('p.experience-item_meta-item:last-child') ? position.querySelector('p.experience-item_meta-item:last-child').textContent.trim() : '';

//           // Returning the position data
//           return {
//             positionName,
//             positionStartTime,
//             positionEndTime,
//             positionTimeDuration,
//             positionLocation
//           };
//         });

//         // Returning the company data along with positions
//         return {
//           companyName,
//           companyDuration,
//           positions
//         };
//       } else {
//         // Handling the case where it's a single experience without a group
//         const positionName = experience.querySelector('h3 > span.experience-item_title') ? experience.querySelector('h3 > span.experience-item_title').textContent.trim() : '';
//         const companyName = experience.querySelector('h4 span.experience-item_subtitle') ? experience.querySelector('h4 span.experience-item_subtitle').textContent.trim() : '';
//         const positionStartTime = experience.querySelector('p.experience-item_meta-item:first-child span.date-range time:first-child') ? experience.querySelector('p.experience-item_meta-item:first-child span.date-range time:first-child').textContent.trim() : '';
//         const positionEndTime = experience.querySelector('p.experience-item_meta-item:first-child span.date-range time:nth-child(2)') ? experience.querySelector('p.experience-item_meta-item:first-child span.date-range time:nth-child(2)').textContent.trim() : 'Today';
//         const positionTimeDuration = experience.querySelector('p.experience-item_meta-item:first-child span span') ? experience.querySelector('p.experience-item_meta-item:first-child span span').textContent.trim() : '';
//         const positionLocation = experience.querySelector('p.experience-item_meta-item:last-child') ? experience.querySelector('p.experience-item_meta-item:last-child').textContent.trim() : '';

//         // Returning the single position data within the same structure
//         return {
//           companyName,
//           positionTimeDuration,
//           positions: [{
//             positionName,
//             positionStartTime,
//             positionEndTime,
//             positionTimeDuration,
//             positionLocation
//           }]
//         };
//       }
//     });

//     const data = { courses, languages, projects, educations, experiences };

//     console.log(data)

//     //TODO API CALL
//     // const apiUrl = "http://localhost:3000/scrape";
//     // const profileUrl = window.location.href;

//     // try {
//     //   const response = await fetch(`${apiUrl}?url=${encodeURIComponent(profileUrl)}`, {
//     //     method: "GET",
//     //   });

//     //   if (!response.ok) {
//     //     throw new Error(`HTTP error! status: ${response.status}`);
//     //   }

//     //   const { data } = await response.json();
//     //   console.log("Scraped Data:", data);

//     //   alert(`Name: ${data.name}\nHeadline: ${data.headline}`);
//     // } catch (error) {
//     //   console.error("Error fetching data:", error);
//     // }


//     //TODO Web scrap from here
//     // Example of grabbing data from a LinkedIn profile
//     //   let profileData = {};

//     //   // Assume we're on a LinkedIn profile page and start extracting data
//     //   profileData.name = (document.querySelector(".text-heading-xlarge").innerText).split(" ")[0];
//     //   profileData.surname = (document.querySelector(".text-heading-xlarge").innerText).split(" ")[1];
//     //   profileData.headline = document.querySelector(".text-body-medium").innerText;
//     //   profileData.location = document.querySelector(".text-body-small.inline.t-black--light.break-words").innerText;

//     //   // If you need to extract more specific data, add selectors here
//     //   // profileData.experience = ... 
//     //   console.log(profileData)

//     //   try {
//     //     chrome.runtime.sendMessage({ action: "saveLinkedInData", data: profileData }, (response) => {
//     //       if (chrome.runtime.lastError) {
//     //         console.error("Error sending message:", chrome.runtime.lastError.message);
//     //       } else {
//     //         console.log("Data sent to extension:", response);
//     //         alert('Data sent to extension.');
//     //       }
//     //     });
//     //   } catch (error) {
//     //     console.error("Error in sending message:", error);
//     //   }

//   });
// }


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
        input.dispatchEvent(new Event("change"));
      } else {
        input.value = valueToSet;
      }
    } else {
      console.warn(`No matching value found for input:`, input);
    }
  });

  alert("Form auto-filled with your profile data!");
}


// Save draft

if (document.querySelector('form') != null) {
  console.log('draftButton')
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
          } else {
            formElement.value = formData[key];
          }
        }
      }
    }
  })
}

