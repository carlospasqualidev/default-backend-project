// TYPES
import { Request, Response } from 'express';

// CLASS
import { UserServices } from '../../services/userServices';

const userServices = new UserServices();

export async function listUsers(req: Request, res: Response) {
  const { page, search } = req.query;

  const pagination = page ?? 1;

  const Users = await userServices.list({
    loggedUserId: req.userId,
    page: Number(pagination),
    search: search as string,
  });

  return res.status(200).json(Users);
}
