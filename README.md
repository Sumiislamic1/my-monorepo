# AI Symptom Checker

A monorepo web application that predicts possible diseases based on user-entered symptoms using a rule-based AI service. The user selects or types symptoms in the browser, the backend forwards them to the AI service, and results are returned with confidence scores, matched symptoms, and severity indicators.

---

## Architecture

```
Frontend (React + Vite)  →  Backend (Node.js/Express)  →  AI Service (Python/Flask)
     localhost:5173              localhost:5001                 localhost:8000
```

---

## Project Structure

```
my-monorepo1/
├── apps/
│   ├── frontend/        # React app (Vite)
│   │   ├── src/
│   │   │   ├── components/Card.js
│   │   │   ├── App.js
│   │   │   ├── App.css
│   │   │   └── index.js
│   │   └── vite.config.js
│   ├── backend/         # Express API server
│   │   └── server.js
│   └── ai-service/      # Flask prediction service
│       ├── app.py
│       └── requirements.txt
└── docs/
    └── system-design.md
```

---

## Services

### AI Service — `apps/ai-service`
- **Runtime:** Python / Flask
- **Port:** `8000`

| Method | Endpoint    | Description                          |
|--------|-------------|--------------------------------------|
| GET    | `/health`   | Health check                         |
| GET    | `/diseases` | List all diseases and symptoms       |
| POST   | `/predict`  | Predict diseases from symptoms       |

**POST `/predict` Request:**
```json
{ "symptoms": ["fever", "chills", "headache"] }
```

**Response:**
```json
{
  "results": [
    {
      "disease": "Malaria",
      "confidence": 60.0,
      "matched_symptoms": ["fever", "chills", "headache"],
      "total_symptoms": 5
    }
  ],
  "symptoms_checked": ["fever", "chills", "headache"]
}
```

---

### Backend — `apps/backend`
- **Runtime:** Node.js / Express
- **Port:** `5001`

| Method | Endpoint    | Description                          |
|--------|-------------|--------------------------------------|
| GET    | `/health`   | Health check                         |
| GET    | `/diseases` | Proxy to AI service disease list     |
| POST   | `/check`    | Validate and proxy symptom check     |

---

### Frontend — `apps/frontend`
- **Runtime:** React 18 / Vite
- **Port:** `5173`
- Type symptoms or click from the suggestion list
- Symptom chips with add/remove support
- Confidence progress bars with color-coded severity
- Matched symptoms highlighted per result

---

## Getting Started

> Start services in this order: AI Service → Backend → Frontend

### Prerequisites

- Node.js v18+
- Python 3.8+
- pip

---

### 1. AI Service

```bash
cd apps/ai-service
pip install -r requirements.txt
python app.py
```

Runs on `http://localhost:8000`

---

### 2. Backend

```bash
cd apps/backend
npm install
npm start
```

Runs on `http://localhost:5001`

---

### 3. Frontend

```bash
cd apps/frontend
npm install
npm start
```

Runs on `http://localhost:5173`

---

## Supported Diseases

| Disease          | Symptoms                                                        |
|------------------|-----------------------------------------------------------------|
| Malaria          | fever, chills, headache, sweating, nausea                       |
| Flu              | fever, fatigue, body pain, headache, chills, sore throat        |
| Common Cold      | cough, sneezing, sore throat, runny nose, congestion            |
| COVID-19         | fever, cough, fatigue, loss of taste, loss of smell, shortness of breath |
| Dengue           | fever, headache, joint pain, rash, nausea, fatigue              |
| Typhoid          | fever, weakness, stomach pain, headache, loss of appetite       |
| Pneumonia        | cough, fever, shortness of breath, chest pain, fatigue          |
| Migraine         | headache, nausea, sensitivity to light, sensitivity to sound, dizziness |
| Gastroenteritis  | nausea, vomiting, diarrhea, stomach pain, fever                 |
| Sinusitis        | congestion, headache, facial pain, runny nose, cough            |

Confidence is calculated as `(matched symptoms / total disease symptoms) × 100`.

---

## Confidence Severity

| Confidence | Severity       |
|------------|----------------|
| ≥ 70%      | 🔴 High Match   |
| 40–69%     | 🟠 Moderate Match |
| < 40%      | 🟢 Low Match    |

---

> ⚠️ This tool is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional.
