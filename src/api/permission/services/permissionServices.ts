// PRISMA
import { Prisma } from '@prisma/client';
import { ServerMessage } from '../../../utils/messages/serverMessage';
import { prisma } from '../../../utils/prismaClient';

// TYPES
import { ICheckPermission } from '../types';

export class PermissionServices {
  async list() {
    return (await prisma.permission.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    })) as Prisma.PermissionCreateInput[];
  }

  async findByName({ name }: { name: string }) {
    return (await prisma.permission.findUnique({
      where: { name },
    })) as Prisma.PermissionCreateInput;
  }

  async checkPermission({ userPermissions, permission }: ICheckPermission) {
    let isPermited = false;

    for (const element of userPermissions) {
      if (element.Permission.name === permission) isPermited = true;
    }

    if (!isPermited) {
      throw new ServerMessage({
        statusCode: 400,
        message: 'Você não possui permissão de acesso.',
      });
    }
  }
}
