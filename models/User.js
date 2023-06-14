import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
    },
    is_online: {
      type: Boolean,
      required: true,
    },
    is_verified: {
      type: Boolean,
    },
    verificationCode: {
      type: Number,
    },
    userCount : {
      type: Number,
      default: 0,
      required: false
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", schema);

export default User;
