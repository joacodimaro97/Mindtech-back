import Brand from "../../models/Brand.js";

let read = async (req, res, next) => {
  try {
    let all = await Brand.find();
    res.status(200).json({
      brands: all,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default read;
