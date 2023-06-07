import Product from "../../models/Product.js";

let read = async (req, res, next) => {
  try {
    let all = await Product.find();
    res.status(200).json({
      GoToBack: "/", 
      products: all,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default read;
