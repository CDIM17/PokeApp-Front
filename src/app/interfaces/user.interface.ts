export interface User {
  _id: string;
  createdDate: Date;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: string;
}
