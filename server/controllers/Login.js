import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});
import createErrors from "../Errors/createErrors.js";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const Login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password)
      return res.json(createErrors(400, "all fields are required", false));
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) res.json(createErrors(404, "invalid credentials", false));
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword)
      return res.json(createErrors(400, "invalid credentials", false));
    const token = await jwt.sign(
      { _id: user._id },
      process.env.SECRETE_TOKEN_KEY
    );
    return res.status(200).json({
      success: true,
      message: "user login successfully",
      user,
      token,
    });
  } catch (err) {
    return next(err);
  }
};
export default Login;
