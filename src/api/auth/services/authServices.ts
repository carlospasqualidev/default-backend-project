// LIBS
import { compare } from 'bcrypt';

// PRISMA
import { Prisma } from '@prisma/client';
import { prisma } from '../../../utils/prismaClient';
import { IResponseFindByEmail } from '../types';

// CLASS
import { ServerMessage } from '../../../utils/messages/serverMessage';

export class AuthServices {
  async findByEmail({ email }: { email: string }) {
    return (await prisma.user.findUnique({
      include: {
        UserPermissions: {
          select: { Permission: { select: { name: true } } },
        },
      },
      where: { email: email.toLowerCase() },
    })) as IResponseFindByEmail;
  }

  async validateToken({ userId }: { userId: string }) {
    return (await prisma.user.findUnique({
      include: {
        UserPermissions: {
          select: { Permission: { select: { name: true } } },
        },
      },
      where: { id: userId },
    })) as Prisma.UserCreateInput;
  }

  async canLogin({
    user,
    password,
  }: {
    user: IResponseFindByEmail;
    password: string;
  }) {
    if (!user) {
      throw new ServerMessage({
        statusCode: 400,
        message: 'E-mail ou senha incorretos.',
      });
    }

    if (user.isDeleted) {
      throw new ServerMessage({
        statusCode: 400,
        message: 'Sua conta foi desativada.',
      });
    }

    if (user.isBlocked) {
      throw new ServerMessage({
        statusCode: 400,
        message:
          'Sua conta está bloqueada, entre em contato com a administração.',
      });
    }

    const isValuePassword = await compare(password, user.passwordHash);

    if (!isValuePassword) {
      throw new ServerMessage({
        statusCode: 400,
        message: 'E-mail ou senha incorretos.',
      });
    }
  }
}
