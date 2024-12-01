document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['jobs'], function (result) {
        const jobs = result.jobs || []; 
        const tableBody = document.getElementById('applications-table-body');
        tableBody.innerHTML = '';

        if (jobs.length === 0) {
            const noDataRow = document.createElement('tr');
            const noDataCell = document.createElement('td');
            noDataCell.setAttribute('colspan', '5');
            noDataCell.textContent = 'No applications found.';
            noDataRow.appendChild(noDataCell);
            tableBody.appendChild(noDataRow);
            return;
        }

        jobs.forEach((job, index) => {
            const row = document.createElement('tr');

            const titleCell = document.createElement('td');
            titleCell.textContent = job.title;
            row.appendChild(titleCell);

            const urlCell = document.createElement('td');
            const urlLink = document.createElement('a');
            urlLink.href = job.url;
            urlLink.textContent = job.url;
            urlCell.appendChild(urlLink);
            row.appendChild(urlCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = job.date;
            row.appendChild(dateCell);

            const statusCell = document.createElement('td');
            statusCell.textContent = job.status;
            row.appendChild(statusCell);

            const operationsCell = document.createElement('td');

            const updateBtn = document.createElement('button');
            updateBtn.classList.add('update-btn');
            updateBtn.textContent = 'Update';
            updateBtn.addEventListener('click', () => updateJobStatus(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteJob(index));

            operationsCell.appendChild(updateBtn);
            operationsCell.appendChild(deleteBtn);
            row.appendChild(operationsCell);

            tableBody.appendChild(row);
        });
    });
});

function updateJobStatus(index) {
    const newStatus = prompt('Enter new status for this job:', 'Pending..');

    if (newStatus) {
        chrome.storage.local.get(['jobs'], function (result) {
            const jobs = result.jobs || [];

            jobs[index].status = newStatus;

            chrome.storage.local.set({ jobs: jobs }, function () {
                alert('Job status updated successfully!');
                location.reload();
            });
        }); 
    }
}

function deleteJob(index) {
    const confirmation = confirm('Are you sure you want to delete this job?');
    if (confirmation) {
        chrome.storage.local.get(['jobs'], function (result) {
            const jobs = result.jobs || [];

            jobs.splice(index, 1);

            chrome.storage.local.set({ jobs: jobs }, function () {
                alert('Job deleted successfully!');
                location.reload();
            });
        });
    }
}
