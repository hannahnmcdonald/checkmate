// src/services/auth.service.ts
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user.model';
import { insertUser, findUserByEmail, findUserByUsername } from '../db/repos/userRepo';
import { withTransaction } from '../db/withTransaction';
import { signAccessToken } from './authentication/jwt.service';
import { db } from '../db/knex';
import { DuplicateEmailError, DuplicateUsernameError } from '../errors/register.errors';
// import sgMail from '@sendgrid/mail';

interface RegisterPayload {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  username: string;
}

export async function registerUser(payload: RegisterPayload): Promise<User> {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const id = uuidv4();

  try {
    return withTransaction(async (trx) => {
      // Check if email is already in use
      const existingUser = await findUserByEmail(payload.email, trx);
      if (existingUser) {
        throw new DuplicateEmailError();
      }
    
      // Check if username is already in use
      const existingUsername = await findUserByUsername(payload.username, trx);
      if (existingUsername) {
        throw new DuplicateUsernameError();
      }
  
      const user = await insertUser({
        id,
        email: payload.email,
        password: hashedPassword,
        first_name: payload.firstName,
        last_name: payload.lastName,
        username: payload.username,
      }, trx);
  
      if (!user) {
        throw new Error('User registration failed');
      }

      return user;
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    throw error;
  };

    // TODO: Send a welcome email
    // SendGrid looks best for this
    // URL: https://sendgrid.com/en-us/solutions/email-api
    // TIP: Use domain verification (DKIM, SPF) if going to production
    // TIP: Use a dedicated email domain (noreply@checkmate.app)
    // TIP: Queue emails (e.g., with bullmq or rabbitmq) for scale (Look into SQS from AWS maybe???)
    // sendWelcomeEmail fx Here

    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // export async function sendWelcomeEmail(email: string, username: string) {
    //   const msg = {
    //     to: email,
    //     from: 'your@email.com',
    //     subject: 'Welcome to CheckMate!',
    //     text: `Hi ${username}, thanks for joining CheckMate.`,
    //     html: `<strong>Hi ${username}</strong>,<br/>Thanks for signing up for CheckMate!`,
    //   };

    //   await sgMail.send(msg);
    // }
};



export async function loginUser(email: string, password: string): Promise<{
  email: any;
  id: any; user: User; token: string 
} | null> {
  return withTransaction(async (trx) => {
    const user = await findUserByEmail(email, trx);
    if (!user || !(await bcrypt.compare(password, user.password))) return null;

    const token = signAccessToken({ id: user.id, email: user.email });
    return { user, token, email: user.email, id: user.id };
  });
}

export async function logoutUser(refreshToken: string): Promise<void> {
  await db('refresh_tokens')
    .where({ token: refreshToken })
    .delete()
    .catch((err: any) => {
      console.error('Error deleting refresh token:', err);
      throw new Error('Logout failed');
    }
  );
}