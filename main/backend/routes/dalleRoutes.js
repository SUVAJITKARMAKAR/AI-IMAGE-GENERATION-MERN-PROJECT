import express from 'express';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  key: process.env.OPENAI_API_KEY,
 
});

// console.log(process.env.OPENAI_API_KEY)

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    // const aiResponse = await openai.Image.create({
    //   prompt,
    //   n: 1,
    //   size: '1024x1024',
    //   // response_format: 'url',
    // });

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      // response_format: 'url',
    });

    const imageUrl = aiResponse.data.url;
    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response?.data?.error?.message);
  }
});



export default router;