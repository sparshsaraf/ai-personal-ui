import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = 3000;

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API route
app.post('/api/summarize', async (req, res) => {
  try {
    const { subtopic } = req.body;

    const hfResponse = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      {
        inputs: `Summarize the latest insights about "${subtopic}" in 4-5 sentences. Keep it clear and useful.`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const summary = hfResponse.data[0]?.summary_text || "Summary unavailable.";
    res.json({ summary });
  } catch (err) {
    console.error(err?.response?.data || err);
    res.status(500).json({ error: 'AI failed to generate summary.' });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
