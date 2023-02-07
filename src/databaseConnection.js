import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const MONGODB_URI = `mongodb://127.0.0.1/baseDePrueba`;

export const connection = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.log(error);
  }
};

