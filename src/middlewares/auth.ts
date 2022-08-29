// LIBS
import 'dotenv/config';
import { verify } from 'jsonwebtoken';
// CLASS
import { NextFunction, Request, Response } from 'express';
import { ServerMessage } from '../utils/messages/serverMessage';
import { Itoken } from './types';
// TYPES

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ServerMessage({
      statusCode: 401,
      message: 'Você precisa de um token válido.',
    });
  }

  try {
    const [, token] = authorization.split(' ');
    const secret: any = process.env.JWT_SECRET;

    const decoded = verify(token, secret);
    const { userId, Permissions } = decoded as Itoken;

    req.userId = userId;
    req.Permissions = Permissions;

    next();
  } catch (error) {
    throw new ServerMessage({
      statusCode: 401,
      message: 'Você precisa de um token válido.',
    });
  }
};
