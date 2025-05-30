export interface IUser extends Document {
  name: string;
  email: string;
  pfp: string;
  password: string;
  google: boolean;
  role: "admin" | "user";
}
