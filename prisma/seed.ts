/* eslint-disable no-console */
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { prisma } from '../src/utils/prismaClient';

import { PermissionServices } from '../src/api/permission/services/permissionServices';

const permissionServices = new PermissionServices();

async function main() {
  // seeds
  console.log('seed is running ...');
  const permissions: Prisma.PermissionCreateInput[] = [
    {
      name: 'Admin',
    },
    {
      name: 'User',
    },
  ];

  for (const permission of permissions) {
    // eslint-disable-next-line no-await-in-loop
    await prisma.permission.create({
      data: permission,
    });
    console.log('permission ', permission.name, ' inserted');
  }

  // admin
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@gmail.com',
      image: `https://avatars.dicebear.com/api/initials/${'Admin'.replace(
        /\s/g,
        '%20',
      )}.svg`,
      passwordHash: hashSync('123123123', 12),
    },
  });

  // ajustar
  const permissionAdmin = await permissionServices.findByName({
    name: 'Admin',
  });

  const permissionLab = await permissionServices.findByName({
    name: 'User',
  });

  await prisma.userPermissions.create({
    data: {
      userId: admin.id,
      permissionId: permissionAdmin.id!,
    },
  });
  console.log('permission ', permissionAdmin.name, ' inserted in Admin');

  await prisma.userPermissions.create({
    data: {
      userId: admin.id,
      permissionId: permissionLab.id!,
    },
  });
  console.log('permission ', permissionLab.name, ' inserted in Admin');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
