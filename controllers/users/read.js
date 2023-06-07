import User from "../../models/User.js";

let read = async (req, res, next) => {
  try {
    let all = await User.find();
    res.status(200).json({
      GoToBack: "/", 
      users: all,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default read;
