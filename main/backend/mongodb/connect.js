import mongoose from 'mongoose';

const connectDB = (url) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(url)
    .then(() => console.log('CONNECTED TO MONOGODB !'))
    .catch((err) => {
      console.error('FAILED TO CONNECT TO MONOGODB !');
      console.error(err);
    });
};

export default connectDB;
