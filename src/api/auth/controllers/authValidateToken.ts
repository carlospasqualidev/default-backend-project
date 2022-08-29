// TYPES
import { Request, Response } from 'express';

// CLASS
import { AuthServices } from '../services/authServices';
import { Validator } from '../../../utils/validator/validator';

const authServices = new AuthServices();
const validator = new Validator();

export const authValidateToken = async (req: Request, res: Response) => {
  const user = await authServices.validateToken({ userId: req.userId });

  validator.notNull([{ variable: user, label: 'Usuário não encontrado' }]);

  return res.status(200).json({
    User: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
    },
  });
};
