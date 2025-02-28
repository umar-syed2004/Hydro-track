document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu");
    const aside = document.querySelector("aside");
    const storedTankName = localStorage.getItem("tank_name");
    const tankNameSection = document.getElementById("tankNameSection");
    const profilePhoto = document.querySelector('.profile-photo img');
    const dropdownMenu = document.createElement('div');
    const themeToggler = document.querySelector('.theme-toggler')

    if (storedTankName && tankNameSection) {
        tankNameSection.textContent = storedTankName; // Update the tank name
    } else {
        console.warn("Tank name not found in localStorage.");
    }

    // (Optional) Log for debugging purposes
    console.log("Loaded Tank Name:", storedTankName);

    // Add event listener to the menu button
    menuButton.addEventListener("click", () => {
        aside.classList.toggle("collapsed"); // Toggle the collapsed class
    });

    // Fetch and update dashboard data
    function fetchDashboardData() {
        fetch('results.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Update water level
                updateWaterLevel(parseFloat(data.water_level));

                // Update water quality
                updateWaterQuality(data.water_quality);

                // Update water volume
                updateWaterVolume(parseFloat(data.water_volume));

                // Update alerts dynamically
                updateAlerts(data);
            })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
                displayErrorMessage('Unable to fetch data. Please try again later.');
            });
    }

    // Call fetch function on page load
    fetchDashboardData();

    dropdownMenu.classList.add('profile-dropdown');
    dropdownMenu.innerHTML = `
        <div class="dropdown-content">
            <div class="user-details">
                <h3>User Profile</h3>
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Age:</strong> 28</p>
                <p><strong>Contact:</strong> +1 (555) 123-4567</p>
            </div>
            <button id="edit-profile-btn">Edit Profile</button>
        </div>
    `;

    // Initially hide the dropdown
    dropdownMenu.style.display = 'none';

    // Add dropdown to the DOM
    profilePhoto.parentElement.appendChild(dropdownMenu);

    // Toggle dropdown on profile photo click
    profilePhoto.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        dropdownMenu.style.display = 'none';
    });

    // Prevent dropdown from closing when clicking inside it
    dropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Edit profile button click handler
    const editProfileBtn = dropdownMenu.querySelector('#edit-profile-btn');
    editProfileBtn.addEventListener('click', () => {
        window.location.href = 'pro.html'; // Redirect to profile settings page
    });

    // Function to toggle the theme
    function toggleTheme() {
        // Check current theme
        const currentTheme = document.body.classList.contains('dark-theme-variables') ? 'dark' : 'light';

        // Switch theme
        if (currentTheme === 'light') {
            document.body.classList.add('dark-theme-variables');
            localStorage.setItem('theme', 'dark'); // Save to localStorage
            themeToggler.querySelector('span:nth-child(1)').classList.remove('active');
            themeToggler.querySelector('span:nth-child(2)').classList.add('active');
        } else {
            document.body.classList.remove('dark-theme-variables');
            localStorage.setItem('theme', 'light'); // Save to localStorage
            themeToggler.querySelector('span:nth-child(1)').classList.add('active');
            themeToggler.querySelector('span:nth-child(2)').classList.remove('active');
        }
    }

    // Apply the stored theme on page load
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light theme
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme-variables');
        themeToggler.querySelector('span:nth-child(1)').classList.remove('active');
        themeToggler.querySelector('span:nth-child(2)').classList.add('active');
    } else {
        document.body.classList.remove('dark-theme-variables');
        themeToggler.querySelector('span:nth-child(1)').classList.add('active');
        themeToggler.querySelector('span:nth-child(2)').classList.remove('active');
    }

    themeToggler.addEventListener('click', () => {

        document.body.classList.toggle('dark-theme-variables')

        themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
        themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
    })

    // Optional: Refresh data periodically
    setInterval(fetchDashboardData, 60000); // Refresh every minute
});


// Update Water Level with Animation
function updateWaterLevel(level) {
    const waterLevelCard = document.querySelector('.card-water-level');
    const waterLevelHeader = document.querySelector('.card-water-level .left h1');
    const waterLevelText = document.getElementById('waterLevelText');
    const waterFill = document.getElementById('waterFill');
    const circleNumber = document.getElementById('circleNumber');
    const progressCircle = document.getElementById('progressCircle');
    const alertBanner = document.querySelector('.alert-banner');


    // Ensure level is within 0-100 range
    level = Math.min(Math.max(level, 0), 100);

    // Update text
    circleNumber.textContent = `${level.toFixed(1)}%`;
    waterLevelHeader.textContent = `${level.toFixed(1)}%`;
    waterLevelText.textContent = `${level.toFixed(1)}%`;

    // Calculate height for the virtual tank
    const tankHeight = 100; // 100% height corresponds to the virtual tank height
    const fillHeight = (level / 100) * tankHeight;

    // Update the water fill height
    waterFill.style.height = `${fillHeight}%`;

    // Animate circular progress
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (level / 100) * circumference;

    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = offset;

    if (level < 30) {
        waterLevelCard.classList.add('alert-danger');
        // Show the alert banner
        alertBanner.textContent = '⚠️ Low water level detected! Immediate action required.';
        alertBanner.style.display = 'block';
    } else {
        waterLevelCard.classList.remove('danger');
        // Hide the alert banner
        alertBanner.style.display = 'none';
    }
}

// Update Water Quality with Icons
function updateWaterQuality(quality) {
    const waterQualityCard = document.querySelector('.card-water-quality .left h1');
    const waterQualityIcon = document.querySelector('.card-water-quality span.material-symbols-outlined');
    const waterQualityDetails = document.querySelector('.card-water-quality .details');

    // Ensure quality is a string and standardize it
    quality = quality.toString().trim().toLowerCase();

    // Update text
    waterQualityCard.textContent = quality.charAt(0).toUpperCase() + quality.slice(1);

    // Assign icon and color based on quality
    switch (quality) {
        case 'good':
            waterQualityIcon.textContent = "sentiment_satisfied";
            waterQualityIcon.style.color = "#4caf50"; // Green
            waterQualityDetails.innerHTML = `<p>TDS: 150 ppm</p><p>pH: 7.2</p>`;
            break;
        case 'moderate':
            waterQualityIcon.textContent = "thumb_up";
            waterQualityIcon.style.color = "#ff9800"; // Orange
            waterQualityDetails.innerHTML = `<p>TDS: 250 ppm</p><p>pH: 7.0</p>`;
            break;
        case 'poor':
            waterQualityIcon.textContent = "block";
            waterQualityIcon.style.color = "#f44336"; // Red
            waterQualityDetails.innerHTML = `<p>TDS: 350 ppm</p><p>pH: 6.8</p>`;
            break;
        default:
            waterQualityIcon.textContent = "help";
            waterQualityIcon.style.color = "#607d8b"; // Neutral gray
            waterQualityDetails.innerHTML = `<p>Unknown Quality</p>`;
    }
}
// Update Water Volume
function updateWaterVolume(volume) {
    const waterVolumeCard = document.querySelector('.card-water-volume .left h1');

    // Ensure volume is a number and format
    volume = Number(volume).toFixed(2);

    // Update text with larger font size
    waterVolumeCard.textContent = `${volume}L`;
}

// Update Alerts
function updateAlerts(data) {
    const alertsList = document.querySelector('.alerts ul');
    const dashboard = document.querySelector('main');
    alertsList.innerHTML = ''; // Clear existing alerts

    let hasCriticalAlert = false;

    // Add alerts based on data conditions
    if (parseFloat(data.water_level) < 30) {
        const lowLevelAlert = document.createElement('li');
        lowLevelAlert.textContent = 'Low water level detected!';
        lowLevelAlert.classList.add('danger');
        alertsList.appendChild(lowLevelAlert);
        hasCriticalAlert = true;

        // Send notification for low water level
        sendNotification('Low Water Level', 'The water level is below 30%. Immediate action required.');
    }

    if (data.water_quality.toLowerCase() === 'poor') {
        const qualityAlert = document.createElement('li');
        qualityAlert.textContent = 'Poor water quality detected!';
        qualityAlert.classList.add('danger');
        alertsList.appendChild(qualityAlert);
        hasCriticalAlert = true;
    }

    if (alertsList.children.length === 0) {
        const noAlertItem = document.createElement('li');
        noAlertItem.textContent = 'No active alerts';
        noAlertItem.classList.add('success');
        alertsList.appendChild(noAlertItem);
    }

    if (!hasCriticalAlert) {
        const noAlertItem = document.createElement('li');
        noAlertItem.textContent = 'No active alerts';
        noAlertItem.classList.add('success');
        alertsList.appendChild(noAlertItem);
    }

    if(hasCriticalAlert){
        dashboard.classList.add('alerful');
    }else{
        dashboard.classList.remove('alertful');
    }
}

// Function to request notification permission and send notifications
function sendNotification(title, body) {
    // Check if notifications are supported
    if (!("Notification" in window)) {
        console.warn("This browser does not support desktop notifications.");
        return;
    }

    // Request permission if not already granted
    if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(title, { body });
            }
        });
    } else if (Notification.permission === "granted") {
        // Show notification
        new Notification(title, { body });
    } else {
        console.warn("Notifications are blocked by the user.");
    }
}


// // Display error message
// function displayErrorMessage(message) {
//     const alertsList = document.querySelector('.alerts ul');
//     alertsList.innerHTML = ''; // Clear existing alerts

//     const errorAlert = document.createElement('li');
//     errorAlert.textContent = message;
//     errorAlert.classList.add('danger');
//     alertsList.appendChild(errorAlert);
// }

// // Retrieve and display the tank name
// function displayTankName() {
//     const tankNameSection = document.getElementById("tankNameSection");
//     const storedTankName = localStorage.getItem("tank_name");

//     if (storedTankName) {
//         tankNameSection.textContent = storedTankName; // Update the tank name on the dashboard
//     }
// }

// // Call the function to update the tank name when the page loads
// document.addEventListener("DOMContentLoaded", displayTankName);