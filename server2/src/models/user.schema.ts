import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pfp: {
      type: String,
      default: "https://github.com/shadcn.png",
    },
    password: {
      type: String,
      required: function (this: any) {
        return !this.google;
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    google: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
