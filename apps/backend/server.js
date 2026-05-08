const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

const AI_SERVICE = 'http://localhost:8000';

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend' });
});

app.get('/diseases', async (req, res) => {
  try {
    const response = await axios.get(`${AI_SERVICE}/diseases`);
    res.json(response.data);
  } catch {
    res.status(500).json({ error: 'AI service unavailable.' });
  }
});

app.post('/check', async (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
    return res.status(400).json({ error: "Provide a non-empty 'symptoms' array." });
  }

  try {
    const response = await axios.post(`${AI_SERVICE}/predict`, {
      symptoms: symptoms.map(s => s.trim().toLowerCase()).filter(Boolean)
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'AI service unavailable.' });
  }
});

app.listen(5001, () => console.log('Backend running on http://localhost:5001'));
