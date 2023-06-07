import { Schema, model, Types } from "mongoose";

let schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "categories",
      required: true,
    },
    brand: {
      type: Types.ObjectId,
      ref: "brands",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let collection = "products";

let Product = model(collection, schema);

export default Product;
