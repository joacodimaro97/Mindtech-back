import User from "../../models/User.js";

export let readAll = async (req, res, next) => {
  try {
    let all = await User.find();
    res.status(200).json({
      users: all,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export let readOne = async (req, res, next) => {
  try {
    const { one } = req.query;

    let user = await User.findOne({ email: one });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
