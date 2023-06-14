import User from "../../models/User.js";

const signout = async (req, res, next) => {
  const { email } = req.body;
  try {
    await User.findOneAndUpdate({ email }, { is_online: false });
    return res.status(200).json({ message: "User logged out" });
  } catch (error) {
    next(error);
  }
};

export default signout;
