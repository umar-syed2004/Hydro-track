/****HydroTrack*****/

HydroTrack is a comprehensive water monitoring system designed to provide insights into household water usage and quality. It was one of the problem, which i faced to monitor and also realized that many other are also facing the same problem, so created a project "HydroTrack, The Smart Water Monitoring System". This project combines IoT technology, a web-based dashboard, and advanced features like notifications and booking systems to manage water resources efficiently. 
You all can access it, just by running the main file, landing page, which asks for the authentication, which can be done by Signing in with Google....

Features

Real-Time Monitoring:

Tracks water level using an ultrasonic sensor.

Simulates water quality (TDS sensor data).

Interactive Dashboard:

Displays water level, quality, and usage trends.

Alerts users when water level is below 30% or when quality is poor.

Booking System:

Allows users to book water tankers directly through the dashboard.

Displays a confirmation pop-up upon booking.

Notifications:

Sends alerts via WhatsApp for critical water levels or poor quality.

Dark Mode:

Option to switch between light and dark themes for user convenience.

Simulated ESP32:

Generates sample data for testing without hardware.

Installation

Prerequisites

Hardware (Optional):

ESP32 with an ultrasonic sensor.

(Optional) TDS sensor for water quality monitoring.

Software:

Python 3.x

Node.js

Arduino IDE (if using ESP32 hardware)

Setup Instructions

Clone this repository:

git clone https://github.com/<your-username>/HydroTrack.git
cd HydroTrack

Install Python dependencies:

pip install flask pyserial requests twilio

Set up the simulated ESP32:

Run the script to simulate sensor data:

python esp32_simulator.py

Start the Flask server:

python app.py

Open the dashboard in your browser:

http://localhost:5000

File Structure

Final-Website/

Contains the web application, including HTML, CSS, and JavaScript files.

data.json

Stores water level and quality data (updated every 15 seconds).

esp32_simulator.py

Simulates ESP32 functionality for testing purposes.

app.py

Flask server for backend functionality.

How to Use

Open the dashboard.

Monitor water levels and quality in real-time.

Receive alerts for low water levels or poor quality.

Use the "Book Now" button to schedule water tanker delivery.

Customize your experience with the dark/light theme toggler.

Contributions

Contributions are welcome! Follow these steps to contribute:

Fork the repository.

Create a new branch:

git checkout -b feature-branch-name

Make your changes and commit them:

git commit -m "Add your message here"

Push to the branch:

git push origin feature-branch-name

Open a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contact

For questions or suggestions, feel free to reach out:

Email: your-email@example.com

Happy Monitoring with HydroTrack!

