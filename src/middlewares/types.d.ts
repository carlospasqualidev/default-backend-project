export interface Itoken {
  userId: string;
  Permissions: [
    {
      Permission: {
        name: string;
      };
    },
  ];

  iat: number;
  exp: number;
}
