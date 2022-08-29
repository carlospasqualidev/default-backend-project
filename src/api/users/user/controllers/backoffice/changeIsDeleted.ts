/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

// TYPES
import { NextFunction, Request, Response } from 'express';

// CLASS
import { UserServices } from '../../services/userServices';
import { Validator } from '../../../../../utils/validator/validator';
import { ServerMessage } from '../../../../../utils/messages/serverMessage';

const validator = new Validator();
const userServices = new UserServices();

export async function changeIsDeleted(
  req: Request,
  _res: Response,
  _next: NextFunction,
) {
  const { userId } = req.body;

  validator.notNull([{ label: 'ID de usuário', variable: userId }]);

  await userServices.changeIsDeleted({
    userId,
  });

  throw new ServerMessage({
    statusCode: 200,
    message: `Usuário excluido com sucesso.`,
  });
}
