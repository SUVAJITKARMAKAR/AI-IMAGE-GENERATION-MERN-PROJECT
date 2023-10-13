import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// MIDDLE-WARE-CONNECTION 
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async(req,res) => {
  res.send('HELLO FROM DALL-E');
})

// MONODB-SERVER-CONNECTION 
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log("SERVER HAS BEEN STARTED AT PORT http://localhost:8080")
    })
  } catch (error) {
    console.log(error)
  }
}

startServer();