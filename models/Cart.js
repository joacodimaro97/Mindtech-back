import { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    products: [
      {
        product_id: {
          type: Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          ref: "Product",
        },
        price: {
          type: Number,
          required: true,
        },
        images: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        subtotal: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const collection = "carts";

const Cart = model(collection, schema);

export default Cart;
