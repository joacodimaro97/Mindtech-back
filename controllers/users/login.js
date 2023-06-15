import User from "../../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Invalid email",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!user.is_verified) {
      return res.status(401).json({
        message: "Your account is not verified, check your email and verify it",
      });
    }

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    await User.findOneAndUpdate({ email }, { is_online: true });

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    const userToSend = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return res.status(200).json({
      message: "User logged in",
      user: userToSend,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default signin;
