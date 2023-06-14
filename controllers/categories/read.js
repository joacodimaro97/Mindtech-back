import Category from "../../models/Category.js";

let read = async (req, res, next) => {
  try {
    let all = await Category.find();
    res.status(200).json({
      categories: all,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default read;
