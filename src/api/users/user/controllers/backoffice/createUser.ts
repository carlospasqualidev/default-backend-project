/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

// TYPES
import { NextFunction, Request, Response } from 'express';

// CLASS
import { UserServices } from '../../services/userServices';
import { Validator } from '../../../../../utils/validator/validator';
import { ServerMessage } from '../../../../../utils/messages/serverMessage';
import { PermissionServices } from '../../../../permission/services/permissionServices';
import { UserPermissionServices } from '../../../userPermission/services/userPermissionServices';

const validator = new Validator();
const userServices = new UserServices();
const permissionServices = new PermissionServices();
const userPermissionServices = new UserPermissionServices();

export async function createUser(
  req: Request,
  _res: Response,
  _next: NextFunction,
) {
  const { name, email, image, password } = req.body;

  validator.notNull([
    { label: 'nome', variable: name },
    { label: 'email', variable: email },
    { label: 'imagem', variable: image },
    { label: 'senha', variable: password },
  ]);

  const checkUser = await userServices.findByEmail({ email });

  validator.cannotExists([{ variable: checkUser, label: email }]);

  const user = await userServices.create({
    name,
    email,
    image,
    passwordHash: password,
  });

  const permission = await permissionServices.findByName({ name: 'User' });

  userPermissionServices.createUserPermission({
    userId: user.id!,
    permissionId: permission.id!,
  });

  throw new ServerMessage({
    statusCode: 200,
    message: 'Usuário cadastrado com sucesso.',
  });
}
