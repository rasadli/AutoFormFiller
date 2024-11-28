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