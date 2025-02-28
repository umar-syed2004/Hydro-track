from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_data():
    data = request.json
    with open('Final-Website/data.json', 'w') as f:
        f.write(jsonify(data).get_data(as_text=True))
    return "Data received and stored", 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
