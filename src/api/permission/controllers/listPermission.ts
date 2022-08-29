// TYPES
import { Request, Response } from 'express';

// CLASS
import { PermissionServices } from '../services/permissionServices';

const permissionsServices = new PermissionServices();

export const listPermissions = async (_req: Request, res: Response) => {
  const list = await permissionsServices.list();

  return res.status(200).json(list);
};
