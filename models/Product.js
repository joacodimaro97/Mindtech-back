import { Schema, model, Types } from "mongoose";

const schema = new Schema(
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
    images: {
      type: [],
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

const collection = "products";

const Product = model(collection, schema);

export default Product;
