from flask import Flask, request, jsonify

app = Flask(__name__)

# Simple dataset
diseases = {
    "Malaria": ["fever", "chills", "headache"],
    "Flu": ["fever", "fatigue", "body pain"],
    "Cold": ["cough", "sneezing", "sore throat"]
}

@app.route('/predict', methods=['POST'])
def predict():
    user_symptoms = request.json['symptoms']

    results = []

    for disease, symptoms in diseases.items():
        match_count = len(set(user_symptoms) & set(symptoms))
        confidence = (match_count / len(symptoms)) * 100

        if match_count > 0:
            results.append({
                "disease": disease,
                "confidence": round(confidence, 2)
            })

    return jsonify(results)

if __name__ == '__main__':
    app.run(port=8000)