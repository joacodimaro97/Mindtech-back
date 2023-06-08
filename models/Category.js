import { Schema, model } from "mongoose";

let schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

let collection = "categories";

let Category = model(collection, schema);

export default Category;
