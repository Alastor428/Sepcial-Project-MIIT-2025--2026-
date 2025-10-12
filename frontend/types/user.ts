export interface User {
  _id?: string;
  name: string;
  userId: string;
  balance: number;
  phone: string;
  pin: string;
  gender?: string;
  employment?: string;
  dob?: string;
  nrc?: string;
  avatar?: string;
  createdAt?: Date;
}

export interface TransferParams {
  sender: User;
  recipient: User;
  amount: string;
  loggedInUser: User;
}
