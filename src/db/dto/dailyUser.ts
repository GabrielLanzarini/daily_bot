export interface IUser {
  id: string;
  name: string;
  started_at: Date | null;
}

export interface IUserWithData {
  id: string;
  name: string;
  started_at: number;
}
