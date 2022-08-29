// LIBS
import { sign } from 'jsonwebtoken';
import 'dotenv/config';

// TYPES
import { Itoken } from './@types';

export class HandlerToken {
  generateToken({ tokenData }: { tokenData: Itoken }) {
    const secret: any = process.env.JWT_SECRET;

    return sign(tokenData, secret, { expiresIn: '8h' });
  }
}
