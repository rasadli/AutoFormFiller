const personID = "1062193446&quot"
function test() {
    const url = "https://api.lix-it.com/v1/person?profile_link=https://linkedin.com/in/alfie-lambert";
    const lixApiKey = "7qWq0z7MfPLOfHQCI02ihqrPKg5rhAdL6L3ucm26OFCCgL0PN76EIVCr63cE"
    
    const headers = {
        'Authorization': lixApiKey, // replace lixApiKey with your actual API key variable or value
    };
    
    fetch(url, {
        method: "GET",
        headers: headers
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json(); // if the API returns JSON
        })
        .then(data => console.log(data))
        .catch(error => console.error("There was a problem with the fetch operation:", error));
    
}