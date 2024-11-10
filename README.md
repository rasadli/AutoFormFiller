# Chrome Extension for Auto Form Filler

## Project Overview
This project aims to create a Chrome extension that acts as an intelligent auto form filler, specifically designed to streamline job applications and other online forms. The extension will extract relevant data from the user's LinkedIn profile, allowing them to modify and store the extracted information locally. When users encounter a job application or form, the extension will automatically fill in the relevant fields or provide multiple suggestions based on the stored data. The extension also allows users to select specific fields to include or exclude, giving them complete control over the information used.

## Features

- **LinkedIn Data Extraction**: Automatically extract data from the user's LinkedIn profile, including:
  - Name
  - Contact information
  - Experience
  - Education
  - Skills
  - Certifications (optional)
  
- **Customizable Data Modification**: Allow users to edit the extracted data within the extension's interface before it is saved locally.

- **Smart Form Filling**: Automatically recognize and fill fields in job applications or online forms based on stored data, or suggest multiple options if available.

- **Field Inclusion/Exclusion Control**: Enable users to choose which fields to include or exclude during auto-filling, providing control over what information is used.

- **Local Storage**: Store user data locally within the extension to maintain privacy, with no data being sent to external servers.

- **Data Privacy**: Ensure that all personal data is stored securely and is not shared with any external parties.

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/auto-form-filler.git
   ```

2. Open Chrome and go to `chrome://extensions/`.

3. Enable **Developer mode** in the top right corner.

4. Click on **Load unpacked** and select the cloned repository folder.

5. The extension should now appear in your extensions list and is ready to use.

## Usage

1. **LinkedIn Profile Extraction**: 
   - Navigate to LinkedIn, open the extension, and follow the prompts to extract profile information. Users will have the option to review and modify the extracted data.

2. **Data Customization**:
   - Once the data is extracted, open the extension popup to view and edit personal information, experience, education, and skills. Save the changes locally within the extension.

3. **Auto Form Filling**:
   - When filling out a job application or any online form, open the extension and select **Auto Fill**. The extension will automatically populate fields based on the stored data.
   - Users can review suggested fields and modify data if needed. 

4. **Select Fields to Include/Exclude**:
   - Choose specific fields to include or exclude when filling out forms. For instance, users can choose to exclude certain job experiences or skill sets.

5. **Privacy**:
   - All data is stored locally within the extension and is not shared with any external parties.

## Development

To get started with development:

1. **Prerequisites**:
   - Make sure you have the latest version of Chrome and Node.js installed.

2. **Project Structure**:
   - **`manifest.json`**: Defines the extension's metadata and permissions.
   - **`popup.html`**: The main user interface for data viewing and management.
   - **`content.js`**: Handles LinkedIn profile extraction and form filling.
   - **`background.js`**: Manages data storage and settings.
   - **`popup.js`**: Handles user interactions within the popup UI.

3. **Scripts**:
   - **Content Script**: Injects into the LinkedIn page to scrape data and interacts with form fields.
   - **Background Script**: Listens for form fill requests and manages stored data.

## Permissions

This extension requires the following permissions:
- **Active Tab**: To interact with job application forms and LinkedIn profile data.
- **Storage**: To store user data locally on the browser.
  
## Future Enhancements

Potential improvements for future versions include:
- **Multiple Profile Management**: Allow users to store and switch between multiple profiles (e.g., different job application profiles).
- **Enhanced Data Parsing**: Improve data extraction to support more complex LinkedIn profiles and data formats.
- **Support for Additional Platforms**: Expand support for data extraction from other job platforms or social media profiles.
- **Customizable Auto-Fill Suggestions**: Allow users to rank preferred information, such as specific job experiences or skills, for form-filling prioritization.

## Contribution Guidelines

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request. Before contributing, ensure you:
- Write clear and concise code with comments as needed.
- Follow the coding style of the project.
- Test new features thoroughly before submitting.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

For questions or support, please reach out to the project maintainer at [your-email@example.com].

---

Thank you for using the Chrome Extension for Auto Form Filler!