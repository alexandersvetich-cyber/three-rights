require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// ── Serve the Google Maps API key to the frontend (embedded in the maps script URL) ──
// This is safe because the key is restricted to your domain in Google Cloud Console
app.get('/api/maps-config', (req, res) => {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    return res.status(500).json({ error: 'Google Maps API key not configured. Set GOOGLE_MAPS_API_KEY in .env' });
  }
  res.json({ key: API_KEY });
});

// ── Proxy route for Directions API (keeps key server-side for extra security) ──
app.post('/api/directions', async (req, res) => {
  const { origin, destination } = req.body;
  if (!origin || !destination) {
    return res.status(400).json({ error: 'Missing origin or destination' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&alternatives=true&departure_time=now&traffic_model=best_guess&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Directions API failed', details: err.message });
  }
});

// ── Fallback: serve index.html for all other routes ──
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`↱↱↱ Three Rights running on http://localhost:${PORT}`);
});
