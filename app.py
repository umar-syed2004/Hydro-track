from flask import Flask, request, jsonify
from flask_cors import CORS     #import CORS
import json

app = Flask(__name__)

#Enable CORS for all routes
CORS(app)       # THis will allow all origins

# Or, if you want to restrict it to a specific origin:
# CORS(app, resources={r"/save-tank-details": {"origins": "http://127.0.0.1:5500"}})

# Route to save tank details
@app.route('/save-tank-details', methods=['POST'])
def save_tank_details():
    try:
        data = request.get_json()  # Parse incoming JSON
        print("Received data:", data)  # Debug print

        # Extract only tank_height and tank_radius
        tank_height = data.get('tank_height')
        tank_radius = data.get('tank_radius')

        # Save the tank details (without the tank_name) into a file
        tank_details = {
            "tank_height": tank_height,
            "tank_radius": tank_radius
        }

        with open('tank_details.json', 'w') as f:
            json.dump(tank_details, f, indent=4)  # Write the required data into the file

        return jsonify({"message": "Tank details saved successfully"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
