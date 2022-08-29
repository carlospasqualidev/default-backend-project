// PRISMA
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { prisma } from '../../../../utils/prismaClient';

// TYPES
import { IEditUser, IEditUserPassword, IListUser } from '../types';

export class UserServices {
  async create({ name, email, image, passwordHash }: Prisma.UserCreateInput) {
    return (await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        image,
        passwordHash: hashSync(passwordHash, 12),
      },
    })) as Prisma.UserCreateInput;
  }

  async findByEmail({ email }: { email: string }) {
    return prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        isBlocked: true,
        isDeleted: true,
        updatedAt: true,
        createdAt: true,
        UserPermissions: true,
      },

      where: { email: email.toLowerCase() },
    });
  }

  async findByEmailForEdit({
    email,
    userId,
  }: {
    email: string;
    userId: string;
  }) {
    return (await prisma.user.findFirst({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        isBlocked: true,
        isDeleted: true,
        updatedAt: true,
        createdAt: true,
      },
      where: {
        email: email.toLowerCase(),
        NOT: {
          id: userId,
        },
      },
    })) as Prisma.UserCreateInput;
  }

  async findById({ userId }: { userId: string }) {
    return (await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        isBlocked: true,
        isDeleted: true,
        updatedAt: true,
        createdAt: true,
      },
      where: { id: userId },
    })) as Prisma.UserCreateInput;
  }

  async edit({ userId, name, email, image }: IEditUser) {
    await prisma.user.update({
      data: {
        name,
        email,
        image,
      },
      where: { id: userId },
    });
  }

  async editClient({ userId, name, image }: IEditUser) {
    await prisma.user.update({
      data: {
        name,
        image,
      },
      where: { id: userId },
    });
  }

  async editPassword({ userId, password }: IEditUserPassword) {
    await prisma.user.update({
      data: {
        passwordHash: hashSync(password, 12),
      },
      where: { id: userId },
    });
  }

  async updateLastAccess({ userId }: { userId: string }) {
    await prisma.user.update({
      data: {
        lastAccess: new Date(),
      },
      where: { id: userId },
    });
  }

  async changeIsBlocked({ userId }: { userId: string }) {
    const user = await this.findById({ userId });

    await prisma.user.update({
      data: {
        isBlocked: !user.isBlocked,
      },
      where: { id: userId },
    });
  }

  async changeIsDeleted({ userId }: { userId: string }) {
    await prisma.user.update({
      data: {
        isDeleted: true,
      },
      where: { id: userId },
    });
  }

  async list({ loggedUserId, take = 20, page, search = '' }: IListUser) {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        updatedAt: true,
        lastAccess: true,
        createdAt: true,
        isBlocked: true,
        isDeleted: true,
      },

      take,
      skip: (page - 1) * take,

      where: {
        isDeleted: false,
        name: {
          contains: search,
          mode: 'insensitive',
        },
        NOT: {
          id: loggedUserId,
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    const usersCount = await prisma.user.count({
      where: {
        isDeleted: false,
        name: {
          contains: search,
          mode: 'insensitive',
        },
        NOT: {
          id: loggedUserId,
        },
      },
    });

    return { users, usersCount };
  }
}
