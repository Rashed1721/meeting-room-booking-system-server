import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      maxlength: [20, "name can not be more than 20 character"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "phone number is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "{VALUE} is not valid",
      },
      required: [true, "role is required"],
    },
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
});

userSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email: email });
};

export const User = model<TUser, UserModel>("User", userSchema);
