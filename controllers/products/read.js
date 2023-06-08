import Product from "../../models/Product.js";

export let readAll = async (req, res, next) => {
  try {
    let all = await Product.find();
    res.status(200).json({
      products: all,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export let readOne = async (req, res, next) => {
  try {
    const { one } = req.query;

    let product = await Product.findOne({ _id: one });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      product: product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
