from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

diseases = {
    "Malaria":        ["fever", "chills", "headache", "sweating", "nausea"],
    "Flu":            ["fever", "fatigue", "body pain", "headache", "chills", "sore throat"],
    "Common Cold":    ["cough", "sneezing", "sore throat", "runny nose", "congestion"],
    "COVID-19":       ["fever", "cough", "fatigue", "loss of taste", "loss of smell", "shortness of breath"],
    "Dengue":         ["fever", "headache", "joint pain", "rash", "nausea", "fatigue"],
    "Typhoid":        ["fever", "weakness", "stomach pain", "headache", "loss of appetite"],
    "Pneumonia":      ["cough", "fever", "shortness of breath", "chest pain", "fatigue"],
    "Migraine":       ["headache", "nausea", "sensitivity to light", "sensitivity to sound", "dizziness"],
    "Gastroenteritis":["nausea", "vomiting", "diarrhea", "stomach pain", "fever"],
    "Sinusitis":      ["congestion", "headache", "facial pain", "runny nose", "cough"]
}

all_symptoms = sorted(set(s for symptoms in diseases.values() for s in symptoms))

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "service": "ai-service"})

@app.route('/diseases', methods=['GET'])
def get_diseases():
    return jsonify({
        "diseases": [
            {"name": name, "symptoms": symptoms}
            for name, symptoms in diseases.items()
        ],
        "all_symptoms": all_symptoms
    })

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data or 'symptoms' not in data or not isinstance(data['symptoms'], list):
        return jsonify({"error": "Invalid input. Provide a 'symptoms' list."}), 400

    user_symptoms = [s.strip().lower() for s in data['symptoms'] if s.strip()]
    if not user_symptoms:
        return jsonify({"error": "Symptoms list is empty."}), 400

    results = []
    for disease, symptoms in diseases.items():
        matched = list(set(user_symptoms) & set(symptoms))
        if matched:
            confidence = round((len(matched) / len(symptoms)) * 100, 2)
            results.append({
                "disease": disease,
                "confidence": confidence,
                "matched_symptoms": matched,
                "total_symptoms": len(symptoms)
            })

    results.sort(key=lambda x: x["confidence"], reverse=True)

    if not results:
        return jsonify({"message": "No matching diseases found.", "results": []})

    return jsonify({"results": results, "symptoms_checked": user_symptoms})

if __name__ == '__main__':
    app.run(port=8000, debug=True)
