import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,

  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  jwt: {
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },

  smtp: {
    smtp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT,
    smtp_auth_email: process.env.SMTP_AUTH_EMAIL,
    smtp_auth_password: process.env.SMTP_AUTH_PASSWORD,
  },

  // Define the default super admin user
  admin_credential: {
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASSWORD,
  },

  // links
  client_url: process.env.CLIENT_URL,
};
