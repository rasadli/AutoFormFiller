// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "sendData") {
//     console.log("Received data in background:", message.data);

//     // Save data to chrome storage
//     chrome.storage.local.set({ LinkedInData: message.data }, () => {
//       sendResponse({ status: "success", message: "Data saved successfully" });
//     });

//     // Make sure to return true so the message remains open until sendResponse is called
//     return true;
//   }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveLinkedInData") {
        // Save LinkedIn data to Chrome Storage
        chrome.storage.local.set({ LinkedInData: message.data }, () => {
            sendResponse({ status: "success", message: "LinkedIn data saved successfully!" });
        });
    } else if (message.action === "saveApplication") {
        // Save job application data to Chrome Storage
        chrome.storage.local.get({ applications: [] }, (data) => {
            const applications = data.applications;
            applications.push(message.data);
            chrome.storage.local.set({ applications }, () => {
                sendResponse({ status: "success", message: "Application data saved successfully!" });
            });
        });
    }
    return true; // Keep the message channel open for async response
});


// const APIFY_API_URL = 'https://api.apify.com/v2/acts';
// const API_TOKEN = 'apify_api_g7kP9l7xjf7XsJHqPtuTTuIjrKnctQ0ENAl2';

// // Function to run an actor
// async function runApifyActor(username) {
//     const actorId = 'apimaestro~linkedin-profile-detail'; // Replace with your actual actor ID
//     const input = { username };

//     try {
//         // Make the API call to start the actor
//         const response = await fetch(`${APIFY_API_URL}/${actorId}/runs?token=${API_TOKEN}`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(input),
//         });

//         if (!response.ok) {
//             throw new Error(`Failed to run actor: ${response.statusText}`);
//         }

//         const run = await response.json();
//         console.log('Actor started:', run);

//         // Fetch results when the run finishes
//         await pollForResults(run.data.id);
//     } catch (error) {
//         console.error('Error running actor:', error);
//     }
// }

// // Poll for actor results
// async function pollForResults(runId) {
//     try {
//         while (true) {
//             const response = await fetch(
//                 `https://api.apify.com/v2/actor-runs/${runId}?token=${API_TOKEN}`
//             );
//             const run = await response.json();

//             if (run.data.status === 'SUCCEEDED') {
//                 console.log('Actor succeeded, fetching results...');

//                 const datasetResponse = await fetch(
//                     `https://api.apify.com/v2/datasets/${run.data.defaultDatasetId}/items?token=${API_TOKEN}`
//                 );
//                 const items = await datasetResponse.json();
//                 console.log('Results:', items);
//                 break;
//             } else if (run.data.status === 'FAILED') {
//                 throw new Error('Actor run failed.');
//             }

//             console.log('Actor still running, waiting...');
//             await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
//         }
//     } catch (error) {
//         console.error('Error fetching results:', error);
//     }
// }

// // Example usage
// runApifyActor('rashadasadli');



// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//     if (message.action === 'fetchApifyData') {
//         try {
//             console.log('Received fetchApifyData message:', message);
//             console.log('Actor API URL:', 'https://api.apify.com/v2/actors/VhxlqQXRwhW8H5hNV/runs');
//             console.log('Username:', message.username);

//             // Step 1: Trigger the Apify Actor with the username input
//             const actorResponse = await fetch('https://api.apify.com/v2/actor/VhxlqQXRwhW8H5hNV/runs', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer apify_api_g7kP9l7xjf7XsJHqPtuTTuIjrKnctQ0ENAl2',
//                 },
//                 body: JSON.stringify({ username: message.username }),
//             });

//             if (!actorResponse.ok) {
//                 const errorDetails = await actorResponse.text();
//                 console.error('Actor API Error:', errorDetails);
//                 throw new Error(`Actor API call failed: ${errorDetails}`);
//             }

//             const runData = await actorResponse.json();
//             console.log('Actor Run Data:', runData);

//             // Step 2: Fetch the dataset items
//             const datasetId = runData.defaultDatasetId;
//             const datasetResponse = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': 'Bearer apify_api_g7kP9l7xjf7XsJHqPtuTTuIjrKnctQ0ENAl2',
//                 },
//             });

//             if (!datasetResponse.ok) {
//                 const errorDetails = await datasetResponse.text();
//                 console.error('Dataset API Error:', errorDetails);
//                 throw new Error(`Dataset API call failed: ${errorDetails}`);
//             }

//             const items = await datasetResponse.json();
//             console.log('Dataset Items:', items);

//             // Respond with the fetched data
//             sendResponse({ success: true, data: items });
//         } catch (error) {
//             console.error('Error during API call:', error.message);
//             sendResponse({ success: false, error: error.message });
//         }
//     }

//     return true; // Keeps the message channel open for async responses
// });



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fetchLinkedinData') {
        const apiUrl = "http://localhost:3000/scrape"; // API URL
        const profileUrl = message.profileUrl; // URL sent from app.js
        console.log(profileUrl)
        // Fetch data from the API
        fetch(`${apiUrl}?url=${encodeURIComponent(profileUrl)}`, {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse JSON response
            })
            .then((data) => {
                console.log("Scraped Data:", data);
                sendResponse({ success: true, data: data });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                sendResponse({ success: false, error: error.message });
            });

        // Indicate that we will send a response asynchronously
        return true;
    }
});