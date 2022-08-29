/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

// TYPES
import { Request, Response } from 'express';
import { ServerMessage } from '../../../../../utils/messages/serverMessage';

// CLASS
import { UserServices } from '../../services/userServices';
import { Validator } from '../../../../../utils/validator/validator';

const userServices = new UserServices();
const validator = new Validator();

export async function editPersonalInfo(req: Request, _res: Response) {
  const { name, image } = req.body;

  validator.notNull([
    { label: 'nome', variable: name },
    { label: 'imagem', variable: image },
  ]);

  await userServices.editClient({
    userId: req.userId,
    name,
    image,
  });

  throw new ServerMessage({
    statusCode: 200,
    message: `Informações atualizadas com sucesso.`,
  });
}
