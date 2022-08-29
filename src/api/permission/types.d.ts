export interface ICheckPermission {
  permission: string;
  userPermissions: [
    {
      Permission: {
        name: string;
      };
    },
  ];
}
