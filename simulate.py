import os
import json
import time
import random

# Define the path to the data.json file
DATA_JSON_PATH = "/home/techurai/webapp/Final-Website/data.json"

def generate_simulated_data():
    """Generate simulated data for water level and water quality."""
    water_level_distance = random.randint(10, 100)  # Simulate water level distance (10 to 100 cm)
    water_ppm = random.choice([150, 250, 400])  # Simulate water ppm for demo TDS values
    return {
        "water_level_distance": water_level_distance,
        "water_ppm": water_ppm
    }

def write_data_to_json(data):
    """Write the simulated data to the JSON file in the specified format."""
    try:
        # Write the JSON data to the file with the desired structure
        with open(DATA_JSON_PATH, "w") as json_file:
            json.dump(data, json_file, indent=4)
        print(f"Updated {DATA_JSON_PATH} with: {data}")
    except Exception as e:
        print(f"Error writing to JSON file: {e}")

def simulate_esp32_behavior():
    """Simulate ESP32 sending data continuously."""
    print("Starting ESP32 simulation...")
    try:
        while True:
            simulated_data = generate_simulated_data()  # Generate simulated data
            write_data_to_json(simulated_data)         # Write to JSON file
            time.sleep(15)                             # Wait for 15 seconds
    except KeyboardInterrupt:
        print("Simulation stopped.")

if __name__ == "__main__":
    # Ensure the Final-Website folder exists
    if not os.path.exists("Final-Website"):
        os.makedirs("Final-Website")
        print("Created 'Final-Website' folder.")

    # Ensure the data.json file exists
    if not os.path.exists(DATA_JSON_PATH):
        with open(DATA_JSON_PATH, "w") as json_file:
            json.dump({"water_level_distance": 0, "water_ppm": 0}, json_file, indent=4)
        print("Created initial 'data.json' file with default values.")

    simulate_esp32_behavior()
