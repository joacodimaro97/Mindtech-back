import User from "../../models/User.js";

export let readAll = async (req, res, next) => {
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

export let readOne = async (req, res, next) => {
  try {
    const { email } = req.params;

    let all = await User.findOneAndUpdate({ email });

    res.status(200).json({
      GoToBack: "/",
      user: all,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
