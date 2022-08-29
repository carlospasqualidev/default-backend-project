export interface IResponseFindByEmail {
  id: string;
  name: string;
  email: string;
  image: string;
  isBlocked: false;
  isDeleted: true;
  passwordHash: string;
  lastAccess: Date;
  createdAt: Date;
  updatedAt: Date;
  UserPermissions: [{ Permission: { name: string } }];
}
