import app from './app';
import mongoose from 'mongoose';
import config from './config';

async function main() {
  try {
    await mongoose.connect(config.mongoURL as string);
    app.listen(config.port, () => {
      console.log(`ass-3 listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
