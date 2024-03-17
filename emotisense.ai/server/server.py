from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)
@app.route('/', methods=['POST'])
@cross_origin(supports_credentials=True)

def hello_world():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'})
    # print(data['participants'])
    messages = data['messages']
    for message in messages:
        print(message)
        
        # content = message['content']
        # print(content)
    return jsonify({'message': "Hello, World!"})

if __name__ == "__main__":
    app.run(debug=True)