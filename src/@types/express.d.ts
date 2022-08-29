// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface Request {
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

    file: any;
    image_link: any;
  }
}
