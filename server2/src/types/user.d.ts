export interface IUser extends Document {
  name: string;
  email: string;
  pfp: string;
  password: string;
  role: "admin" | "user";
}
