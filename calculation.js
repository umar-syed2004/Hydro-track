// Import required modules (Node.js environment for file operations)
const fs = require('fs');

// Function to read data.json, perform calculations, and save results in result.json
function processData() {
  // Read the tank details from tank_details.json
  fs.readFile('tank_details.json', 'utf8', (err, tankData) => {
    if (err) {
      console.error('Error reading tank_details.json:', err);
      return;
    }

    try {
      const tankDetails = JSON.parse(tankData); // Parse the tank details from the JSON file
      const { tank_height, tank_radius } = tankDetails; // Extract the tank height and radius from the tank details

      // Read the data from data.json (water level distance and water ppm)
      fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading data.json:', err);
          return;
        }

        try {
          const jsonData = JSON.parse(data); // Parse the JSON data from data.json
          const { water_level_distance, water_ppm } = jsonData; // Extract water level distance and ppm from the data

          // Perform calculations
          const waterLevel = ((tank_height - water_level_distance) / tank_height) * 100; // Water level in %
          const waterVolume = (Math.PI * Math.pow(tank_radius, 2) * (tank_height - water_level_distance)) / 1000; // Volume in liters (cylinder tank)

          // Determine water quality based on ppm value
          let waterQuality = '';
          if (water_ppm < 300) {
            waterQuality = 'Good';
          } else if (water_ppm >= 300 && water_ppm <= 600) {
            waterQuality = 'Moderate';
          } else {
            waterQuality = 'Poor';
          }

          // Prepare the result data to be saved in result.json
          const resultData = {
            water_level: waterLevel.toFixed(2), // Water level in percentage (2 decimal places)
            water_ppm: water_ppm.toString(),    // Water ppm value as a string
            water_quality: waterQuality,       // Water quality (Good, Moderate, Poor)
            water_volume: waterVolume.toFixed(2) // Water volume in liters (2 decimal places)
          };

          // Save the results to result.json
          fs.writeFile('results.json', JSON.stringify(resultData, null, 2), (err) => {
            if (err) {
              console.error('Error writing to result.json:', err);
            } else {
              console.log('Result successfully written to result.json');
            }
          });

          // Optionally send the ppm value to the dashboard (via localStorage or other method)
          // If you need to update a global variable or update the page directly, you can do that here
          // For example, you can use localStorage to store the ppm value or directly update the UI.
          localStorage.setItem('water_ppm', water_ppm.toString());

        } catch (parseErr) {
          console.error('Error parsing data.json:', parseErr);
        }
      });

    } catch (parseErr) {
      console.error('Error parsing tank_details.json:', parseErr);
    }
  });
}

// Run the function every 30 seconds
setInterval(processData, 30000); // 30000 milliseconds = 30 seconds

// Run the function
processData();
