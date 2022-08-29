import { prisma } from '../../../../utils/prismaClient';
import { ICreateUserPermission } from '../types';

export class UserPermissionServices {
  async createUserPermission({ userId, permissionId }: ICreateUserPermission) {
    await prisma.userPermissions.create({
      data: {
        userId,
        permissionId,
      },
    });
  }
}
