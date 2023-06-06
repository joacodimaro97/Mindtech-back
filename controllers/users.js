import User from "../models/User.js";

let read = async (req, res, next) => {
  try {
    let all = await User.find();
    return res.status(200).json({
      users: all,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "An error has occurred",
    });
  }
};

export default read;
