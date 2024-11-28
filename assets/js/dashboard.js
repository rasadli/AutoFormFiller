document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the job data from Chrome local storage
    chrome.storage.local.get(['jobs'], function (result) {
        const jobs = result.jobs || []; // Get the jobs array, or an empty array if no data exists

        // Get the table body element where rows will be inserted
        const tableBody = document.getElementById('applications-table-body');

        // Clear existing rows before adding new ones
        tableBody.innerHTML = '';

        // If there are no jobs, show a message
        if (jobs.length === 0) {
            const noDataRow = document.createElement('tr');
            const noDataCell = document.createElement('td');
            noDataCell.setAttribute('colspan', '5');
            noDataCell.textContent = 'No applications found.';
            noDataRow.appendChild(noDataCell);
            tableBody.appendChild(noDataRow);
            return;
        }

        // Loop through each job and create a table row
        jobs.forEach((job, index) => {
            const row = document.createElement('tr');

            // Create a cell for the company/job title
            const titleCell = document.createElement('td');
            titleCell.textContent = job.title;
            row.appendChild(titleCell);

            // Create a cell for the website URL
            const urlCell = document.createElement('td');
            const urlLink = document.createElement('a');
            urlLink.href = job.url;
            urlLink.textContent = job.url;
            urlCell.appendChild(urlLink);
            row.appendChild(urlCell);

            // Create a cell for the date applied
            const dateCell = document.createElement('td');
            dateCell.textContent = job.date;
            row.appendChild(dateCell);

            // Create a cell for the job status
            const statusCell = document.createElement('td');
            statusCell.textContent = job.status;
            row.appendChild(statusCell);

            // Create a cell for the operations (Update/Delete)
            const operationsCell = document.createElement('td');

            // Create an Update button
            const updateBtn = document.createElement('button');
            updateBtn.classList.add('update-btn');
            updateBtn.textContent = 'Update';
            updateBtn.addEventListener('click', () => updateJobStatus(index));

            // Create a Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteJob(index));

            // Append buttons to the operations cell
            operationsCell.appendChild(updateBtn);
            operationsCell.appendChild(deleteBtn);
            row.appendChild(operationsCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    });
});

// Update the job status
function updateJobStatus(index) {
    // Prompt user for the new status
    const newStatus = prompt('Enter new status for this job:', 'Pending..');

    if (newStatus) {
        // Get jobs from local storage
        chrome.storage.local.get(['jobs'], function (result) {
            const jobs = result.jobs || [];

            // Update the status of the selected job
            jobs[index].status = newStatus;

            // Save updated jobs back to local storage
            chrome.storage.local.set({ jobs: jobs }, function () {
                alert('Job status updated successfully!');
                // Reload the table after update
                location.reload();
            });
        });
    }
}

// Delete a job
function deleteJob(index) {
    // Confirm if the user wants to delete the job
    const confirmation = confirm('Are you sure you want to delete this job?');
    if (confirmation) {
        // Get jobs from local storage
        chrome.storage.local.get(['jobs'], function (result) {
            const jobs = result.jobs || [];

            // Remove the selected job
            jobs.splice(index, 1);

            // Save updated jobs back to local storage
            chrome.storage.local.set({ jobs: jobs }, function () {
                alert('Job deleted successfully!');
                // Reload the table after deletion
                location.reload();
            });
        });
    }
}
