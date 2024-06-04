import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.port,
  mongoURL: process.env.mongoURL,
  bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
  NODE_ENV: process.env.NODE_ENV,
};
