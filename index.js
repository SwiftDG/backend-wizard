import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/me', async (req, res) => {
  try {
    const catFactResponse = await axios.get('https://catfact.ninja/fact');
    const catFact = catFactResponse.data.fact;

    const response = {
      status: "success",
      user: {
        email: process.env.EMAIL,
        name: process.env.NAME,
        stack: process.env.STACK
      },
      timestamp: new Date().toISOString(),
      fact: catFact
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch cat fact"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});