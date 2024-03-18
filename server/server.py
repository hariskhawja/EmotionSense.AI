from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from generate_data import run

app = Flask(__name__)
CORS(app, support_credentials=True)
@app.route('/', methods=['POST'])
@cross_origin(supports_credentials=True)

def hello_world():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'})
    
    final = run(data)
    return jsonify(final)

if __name__ == "__main__":
    app.run(debug=True)