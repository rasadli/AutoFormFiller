
---

# **AutoFormFiller Chrome Extension**

## **Overview**

**AutoFormFiller** is a Chrome extension designed to automate form-filling tasks on supported websites, such as LinkedIn profiles and job application forms. The extension scrapes relevant data from the user's LinkedIn profile, fills out forms automatically, and allows the user to save, update, and manage profiles. This tool helps streamline the job application process and ensures consistent, accurate data entry.

---

### Key Features

- **Create, Update, Delete Profiles**: Users can create new profiles, update existing profiles, and delete profiles completely.
- **Auto-Fill Forms**: Fill out forms automatically by selecting a profile from the dropdown list.
- **Profile Information Management**: Each profile can store personal data, which can be updated or removed at any time.
- **Save Data as Drafts**: Form data, whether filled by the user or the extension, can be saved as drafts for future use.
- **Import and Export Profiles**: Users can import or export profile data, allowing easy sharing and backup of form-filling data.

--- 

## **Installation**

### **1. Clone or Download the Repository**
- Download the repository or extract the provided `AutoFormFiller.zip` file to a directory on your local machine.

### **2. Install Node.js Dependencies**
- Navigate to the `server` folder, which contains the backend files.
  ```bash
  cd /path/to/your/server
  ```
- Run the following command to install the required Node.js dependencies:
  ```bash
  npm install
  ```

### **3. Start the Node.js Server**
- To start the backend server, run:
  ```bash
  node index.js
  ```
  > Note: This server must be running for the extension to fetch and process data.

### **4. Load the Extension in Chrome**
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer Mode** using the toggle switch in the top-right corner.
3. Click **Load unpacked** and select the directory containing the extracted files of the `AutoFormFiller` extension.
4. The extension will be loaded and activated.

---

## **Usage**

1. **Scrape LinkedIn Profile Data**:
   - Open the LinkedIn profile page of the user you want to scrape.
   - Provide the LinkedIn page URL to the extension.
   - The extension will scrape the profile data (name, experience, education, etc.) and store it.

2. **Create, Update, or Select a Profile**:
   - Users can create new profiles by adding relevant information.
   - Existing profiles can be updated with new or modified data, allowing for profile adjustments based on changing information.
   - Users can select from previously saved profiles to fill out forms automatically.

3. **Filling Forms Automatically**:
   - Open any supported web page (e.g., job application forms).
   - The extension will automatically fill in the form fields based on the selected profile's data.

4. **Save Forms as Drafts**:
   - Data filled in forms by either the extension or the user can be saved as a draft for future use. Drafts are saved within the extension and can be accessed later.

5. **Profile Import/Export**:
   - Profiles can be imported and exported using buttons within the extension, allowing users to back up their profile data or transfer it to another device.

---

## **Customization**

You can customize the extension by:
- Modifying `content.js` to target different forms or websites.
- Updating `background.js` to handle additional actions or data processing.
- Editing `manifest.json` to change permissions or extend functionality.

---

## **File Structure**

```
AutoFormFiller/
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css    # Minified Bootstrap CSS for responsive layout and basic styling
│   │   └── style.css            # Custom CSS for additional styling specific to the extension
│   ├── images/
│   │   └── main_logo.png        # Extension's logo image
│   ├── js/
│   │   ├── app.js               # Main JavaScript file for extension's background tasks
│   │   ├── background.js        # Service worker script for handling background processes
│   │   ├── bootstrap.min.js     # Bootstrap JS file for popup and UI interactions
│   │   ├── content.js           # Content script for interacting with web pages
│   │   ├── dashboard.js         # JS for dashboard page (if applicable)
│   │   ├── generative-ai.js     # JS for integrating with generative AI features (if applicable)
│   │   └── jquery-3.7.1.min.js  # jQuery for content script functionality
├── pages/
│   └── dashboard.html           # HTML for the dashboard page
├── server/
│   ├── index.js                 # Server-side Node.js script for backend functionality
│   ├── package-lock.json        # Locked versions of server-side dependencies
│   └── package.json             # Server-side dependencies and script configurations
├── .gitignore                   # Git ignore file to exclude unwanted files from version control
├── index.html                   # Popup HTML page for the extension
├── manifest.json                # Chrome Extension manifest file that defines the extension's properties and permissions
├── README.md                    # Documentation for installation, usage, and troubleshooting
```

---

This `README.md` file provides detailed instructions on setting up, using, and troubleshooting the **AutoFormFiller** Chrome extension.