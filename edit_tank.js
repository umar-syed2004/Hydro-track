// Open the modal
function openEditTankModal() {
    const modal = document.getElementById("editTankModal");
    modal.style.display = "flex"; // Show modal
    document.body.classList.add("modal-open"); // Prevent scrolling
}

// Close the modal
function closeEditTankModal() {
    const modal = document.getElementById("editTankModal");
    modal.style.display = "none"; // Hide modal
    document.body.classList.remove("modal-open"); // Enable scrolling
}

// Close modal if clicked outside the modal content
window.onclick = function (event) {
    const modal = document.getElementById("editTankModal");
    if (event.target === modal) {
        closeEditTankModal();
    }
};

function saveTankDetails() {
    const tankNameInput = document.getElementById("tankNameInput").value;
    const tankHeightInput = parseFloat(document.getElementById("tankHeightInput").value);
    const tankRadiusInput = parseFloat(document.getElementById("tankRadiusInput").value);

    if (!tankNameInput || isNaN(tankHeightInput) || isNaN(tankRadiusInput)) {
        alert("Please fill in all fields with valid values.");
        return;
    }

    // Create a tank details object
    const tankDetails = {
        tank_name: tankNameInput,
        tank_height: tankHeightInput,
        tank_radius: tankRadiusInput
    };

    fetch('http://127.0.0.1:5000/save-tank-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tankDetails), // Send tank details from modal
    })
        .then((response) => {
            if (response.ok) {
                alert("Tank details saved successfully!");
                closeEditTankModal();
            } else {
                alert("Error saving tank details.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Error saving tank details.");
        });


    // // Save tank details to a JSON file
    // const tankDetailsJSON = JSON.stringify(tankDetails, null, 2);

    // // Use the File System API to save the JSON file
    // const blob = new Blob([tankDetailsJSON], { type: "application/json" });
    // const link = document.createElement("a");
    // link.href = URL.createObjectURL(blob);
    // link.download = "tank_details.json";
    // link.click();

    // alert("Tank details saved successfully!");
    // closeEditTankModal();
}
