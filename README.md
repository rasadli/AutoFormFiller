
---

# AutoFormFiller Chrome Extension

## Overview

**AutoFormFiller** is a Chrome extension designed to automate form-filling tasks on specified websites by fetching and utilizing user-specific data from a Node.js server. This extension communicates with the backend server to retrieve necessary data and fill out forms seamlessly.

---

## Features
- Automatically fills out forms on specified web pages.
- Fetches LinkedIn profile data or other relevant data from a Node.js server.
- Communicates with backend servers using fetch API for real-time data retrieval.
- Lightweight and customizable for different form structures.

---

## Installation

### 1. Clone or Download the Repository
- Download the repository or extract the provided `AutoFormFiller.zip` file to a directory on your local machine.

### 2. Install Node.js Dependencies
- Navigate to the Node.js server directory. For example:
  ```bash
  cd /path/to/your/server.js
  ```
- Run the following command to install the required Node.js dependencies:
  ```bash
  npm install
  ```

### 3. Start the Node.js Server
- Start the Node.js server manually by running:
  ```bash
  node index.js
  ```
  > Note: This server must be running for the extension to fetch and process data.

### 4. Load the Extension in Chrome
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer Mode** using the toggle switch in the top-right corner.
3. Click **Load unpacked** and select the directory containing the extracted files of the `AutoFormFiller` extension.
4. The extension will be loaded and activated.

---

## Usage

1. **Open any supported web page** where the form-filling functionality is required (e.g., LinkedIn profile pages).
2. The extension will automatically send the profile URL to the Node.js server and fetch relevant data.
3. The form fields will be filled automatically based on the fetched data.

---

## Troubleshooting

### **Server Not Starting**
- Ensure Node.js is installed and properly configured on your system.
- Check the console where the Node.js server is started for any errors.
- Verify that the server is running by visiting `http://localhost:3000` in your browser.

### **Extension Not Working**
- Make sure the Node.js server is running before using the extension.
- Verify the required permissions are set correctly in the `manifest.json` file.
- Reload the extension in `chrome://extensions/` if it stops working.

### **Common Issues**
- **Permission Error:** Ensure that the `host_permissions` section in `manifest.json` allows communication with `http://localhost:3000/`.
- **Service Worker Registration Error:** Ensure the `background.js` script is valid for Manifest V3 and follows Chrome extension guidelines.

---

## File Structure

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
│   └── importmap.json           # Import map for the JS modules
├── .gitignore                   # Git ignore file to exclude unwanted files from version control
├── index.html                   # Popup HTML page for the extension
├── manifest.json                # Chrome Extension manifest file that defines the extension's properties and permissions
└── README.md                    # Documentation for installation, usage, and troubleshooting

```

---

## Customization

You can customize the extension by:
- Modifying `content.js` to target different forms or websites.
- Updating `background.js` to handle additional actions or data processing.
- Editing `manifest.json` to change permissions or extend functionality.

---

This `README.md` file is designed to provide detailed instructions on setting up, using, and troubleshooting the **AutoFormFiller** Chrome extension.

