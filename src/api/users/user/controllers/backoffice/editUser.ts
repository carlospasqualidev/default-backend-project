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

export async function editUser(req: Request, _res: Response) {
  const { userId, name, email, image, password } = req.body;

  validator.notNull([
    { label: 'ID de usuário', variable: userId },
    { label: 'nome', variable: name },
    { label: 'email', variable: email },
    { label: 'imagem', variable: image },
  ]);

  const checkUser = await userServices.findByEmailForEdit({
    email,
    userId,
  });

  validator.cannotExists([{ variable: checkUser, label: email }]);

  await userServices.edit({
    userId,
    name,
    email,
    image,
  });

  if (password) {
    await userServices.editPassword({
      userId,
      password,
    });
  }

  throw new ServerMessage({
    statusCode: 200,
    message: `Informações atualizadas com sucesso.`,
  });
}
