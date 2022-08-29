export interface IEditUser {
  userId: string;
  name: string;
  email?: string;
  image: string;
}

export interface IEditUserPassword {
  userId: string;
  password: string;
}

export interface IListUser {
  loggedUserId: string;

  take?: number;
  page: number;
  search: string;
}
