/*
===========================================================
1. Train To Code. (2023, Aug 18). Full Tutorial | Building a Chrome Extension in Typescript and Vite [Video]. https://www.youtube.com/watch?v=GGi7Brsf7js
2. Chrome Developers. (n.d.). Extensions documentation [Online documentation]. https://developer.chrome.com/docs/extensions
3. freeCodeCamp.org (2022, May 27). Build a Chrome Extension – Course for Beginners [Video]. https://youtu.be/0n809nd4Zu4?si=bbF3gS95lsXbVtLA

ChatGPT-Generated Snippets:
- https://chatgpt.com/share/674c29ab-e4dc-8003-a123-e1549c3427c1
- https://chatgpt.com/share/674c2932-1f80-8003-bddc-84f404776f6a
- https://chatgpt.com/share/674c2a21-1cc8-8003-9479-c79269cb24cf
===========================================================
*/

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

        return true;
    }
});