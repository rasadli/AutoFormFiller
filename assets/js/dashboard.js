// const applicationData = [
//     { company: 'Google', title: 'Software Engineer', date: '2024-11-01', status: 'Applied' },
//     { company: 'Amazon', title: 'Data Analyst', date: '2024-10-15', status: 'Interview Scheduled' },
//     { company: 'Facebook', title: 'Product Manager', date: '2024-10-05', status: 'Rejected' }
// ];

// function loadDashboardData() {
//     const tableBody = document.getElementById('applications-table-body');
//     applicationData.forEach(app => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${app.company}</td>
//             <td>${app.title}</td>
//             <td>${app.date}</td>
//             <td>${app.status}</td>
//         `;
//         tableBody.appendChild(row);
//     });
// }
// loadDashboardData()


function loadDashboardData() {
    const tableBody = document.getElementById("applications-table-body");

    // Fetch applications from Chrome Storage
    chrome.storage.local.get({ applications: [] }, (data) => {
        tableBody.innerHTML = ""; // Clear existing rows
        data.applications.forEach((app) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${app.company || "N/A"}</td>
                <td>${app.title || "N/A"}</td>
                <td>${app.date || "N/A"}</td>
                <td>${app.status || "N/A"}</td>
            `;
            tableBody.appendChild(row);
        });
    });
}

// Load data on page load
document.addEventListener("DOMContentLoaded", loadDashboardData);
