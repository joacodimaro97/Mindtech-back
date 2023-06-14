import Cart from "../../models/Cart.js";

export let readAll = async (req, res, next) => {
  try {
    let all = await Cart.find();
    res.status(200).json({
      carts: all,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export let readOne = async (req, res, next) => {
  try {
    const { one } = req.query;

    let cart = await Cart.findOne({ email: one });

    if (!cart) {
      return res.status(404).json({ error: "cart not found" });
    }

    res.status(200).json({
      cart: cart,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
