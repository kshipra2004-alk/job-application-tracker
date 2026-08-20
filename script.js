let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");
const search = document.getElementById("search");

function saveJobs() {
    localStorage.setItem("jobs", JSON.stringify(jobs));
}

function displayJobs(filter = "") {
    jobList.innerHTML = "";

    const filteredJobs = jobs.filter(job =>
        job.company.toLowerCase().includes(filter.toLowerCase()) ||
        job.role.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredJobs.length === 0) {
        jobList.innerHTML = "<p>No applications found.</p>";
        updateDashboard();
        return;
    }

    filteredJobs.forEach((job, index) => {
        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
            <h3>${job.company}</h3>
            <p><strong>Role:</strong> ${job.role}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Applied Date:</strong> ${job.date}</p>
            <span class="status">${job.status}</span>
            <br>
            <button class="delete-btn" onclick="deleteJob(${index})">
                Delete
            </button>
        `;

        jobList.appendChild(card);
    });

    updateDashboard();
}

jobForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const job = {
        company: document.getElementById("company").value,
        role: document.getElementById("role").value,
        location: document.getElementById("location").value,
        date: document.getElementById("date").value,
        status: document.getElementById("status").value
    };

    jobs.push(job);

    saveJobs();
    displayJobs();

    jobForm.reset();
});

function deleteJob(index) {
    jobs.splice(index, 1);

    saveJobs();
    displayJobs(search.value);
}

function updateDashboard() {
    document.getElementById("totalJobs").textContent = jobs.length;

    document.getElementById("interviews").textContent =
        jobs.filter(job => job.status === "Interview").length;

    document.getElementById("selected").textContent =
        jobs.filter(job => job.status === "Selected").length;

    document.getElementById("rejected").textContent =
        jobs.filter(job => job.status === "Rejected").length;
}

search.addEventListener("input", function() {
    displayJobs(search.value);
});

displayJobs();