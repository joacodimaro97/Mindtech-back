import Product from "../../models/Product.js";

export let readAll = async (req, res, next) => {
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

export let readOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    let all = await Product.findOneAndUpdate({ id });

    res.status(200).json({
      GoToBack: "/",
      product: all,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
