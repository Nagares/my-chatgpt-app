

import express from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';  

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY
});

const app = express();
app.use(express.json());

app.use(cors());

app.post('/generate-response', async  (req, res) => {
  const { prompt, transcription, systemPrompt } = req.body;

  console.log('API Key:', openai);
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.2,
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: transcription },
        { role: 'system', content: systemPrompt },
      ],
    });
    
    res.json({ 
      response: response.choices[0].message.content });
  } 
  catch (error) {
    console.error('Error generating response:', error);
   res.status(500).json({ error: 'Failed to generate response' });
  }
});


const port = process.env.PORT;

app.listen(port, () => {

  console.log(`Server is running on http://localhost:${port}`);

});
