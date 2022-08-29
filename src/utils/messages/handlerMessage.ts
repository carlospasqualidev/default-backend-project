/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

// LIBS
import axios from 'axios';

// TYPES
import { NextFunction, Request, Response } from 'express';

// CLASS
import { ServerMessage } from './serverMessage';

// Functions

export const handlerMessage = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ServerMessage) {
    return res.status(err.statusCode).json({
      ServerMessage: { message: err.message },
    });
  }

  if (
    process.env.DATABASE_URL?.includes('sandbox') ||
    process.env.DATABASE_URL?.includes('production')
  ) {
    // CHANGE HERE
    axios.post('urlParaSalvarLogs', {
      projectName: 'Default Backend Project',
      environment: process.env.DATABASE_URL?.includes('sandbox')
        ? 'Sandbox'
        : 'Production',
      side: 'Server',
      errorStack: err.stack,
    });
  }
  console.log(
    '\n\n\n ❌ Error ❌ \n\n\n',
    'Error Message: ',
    err.stack,
    '\n\n\n',
  );

  return res.status(500).json({
    ServerMessage: {
      message: `Oops! Encontramos um problema e nossa equipe foi notificada.`,
    },
  });
};
