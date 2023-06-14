import { Schema, model } from "mongoose";

let schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

let collection = "brands";

let Brand = model(collection, schema);

export default Brand;
