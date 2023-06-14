import Product from "../../models/Product.js";

export const deleteProducts = async (req, res, next) => {
  try {
    const { selectedCheckboxes } = req.body;

    await Product.deleteMany({ _id: { $in: selectedCheckboxes } });
    res.status(200).json({
      message: 'Product/s successfully deleted',
    });
  } catch (error) {
    next(error);
  }
};
