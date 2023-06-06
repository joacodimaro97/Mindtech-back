import { Schema, model } from "mongoose";

let schema = new Schema(
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
    password: {
      type: String,
      required: true,
    },
    is_online: {
      type: Boolean,
      required: true,
    },
    role: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let collection = "users";

let User = model(collection, schema);

export default User;
