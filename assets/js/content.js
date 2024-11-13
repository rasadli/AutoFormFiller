// const article = document.querySelector("article");

// // `document.querySelector` may return null if the selector doesn't match anything.
// if (article) {
//   const text = article.textContent;
//   const wordMatchRegExp = /[^\s]+/g; // Regular expression
//   const words = text.matchAll(wordMatchRegExp);
//   // matchAll returns an iterator, convert to array to get word count
//   const wordCount = [...words].length;
//   const readingTime = Math.round(wordCount / 200);
//   const badge = document.createElement("p");
//   // Use the same styling as the publish information in an article's header
//   badge.classList.add("color-secondary-text", "type--caption");
//   badge.textContent = `⏱️ ${readingTime} min read`;

//   // Support for API reference docs
//   const heading = article.querySelector("h1");
//   // Support for article docs with date
//   const date = article.querySelector("time")?.parentNode;

//   (date ?? heading).insertAdjacentElement("afterend", badge);
// }

console.log("Content script is running!");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == "fillForm") {
    const data = request.data;
    console.log(data)

    // Target the specific input field on the page, e.g., by its ID or class
    const targetInput = document.querySelector("input[name='username']"); // Adjust this selector to match the webpage's input field
console.log(targetInput)
    if (targetInput) {
      targetInput.value = data;  // Fill the input with the data from the extension
      targetInput.dispatchEvent(new Event('input', { bubbles: true })); // Optional: Trigger an input event if needed
    }
  }
});
