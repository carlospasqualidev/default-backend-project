// TYPES
import { Response, Request, NextFunction } from 'express';

// CLASS
import { PermissionServices } from '../../api/permission/services/permissionServices';

const permissionServices = new PermissionServices();

export const isUser = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const permissions = req.Permissions;

  await permissionServices.checkPermission({
    userPermissions: permissions,
    permission: 'User',
  });

  next();
};
