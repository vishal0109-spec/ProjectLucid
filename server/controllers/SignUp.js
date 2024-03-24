import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});
import User from "../Models/User.js";
import createErrors from "../Errors/createErrors.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import vineSchema from "../Vine/vineSchema.js";
import vine, { errors } from "@vinejs/vine";
const SignUp = async (req, res, next) => {
  try {
    let { firstName, lastName, email, phone, password, confirmPassword } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    )
      return res.json(createErrors(404, "all fields are required", false));
    const data = {
      ...req.body,
    };

    const schemaValidator = vine.compile(vineSchema);
    const output = await schemaValidator.validate(data);

    const validEmail = validator.isEmail(email);
    const validPhone = validator.isMobilePhone(phone);
    if (!validEmail || !validPhone)
      return res.json(createErrors(400, "email or phone incorrect", false));
    const checkEmail = await User.findOne({
      email: req.body.email,
    });
    if (checkEmail)
      return res.json(createErrors(405, "user already exist", false));
    if (req.body.password !== req.body.confirmPassword)
      return res.json(
        createErrors(400, "password and confirm password different", false)
      );
    password = await bcrypt.hash(req.body.password, 10);

    const user = await new User({
      ...output,
      password,
    });
    await user.save();
    const token = await jwt.sign(
      { _id: user._id },
      process.env.SECRETE_TOKEN_KEY
    );
    return res.status(200).json({
      success: true,
      message: "user created successfully",
      token,
      user,
    });
  } catch (err) {
    console.log(err.messages);
    if (err instanceof errors.E_VALIDATION_ERROR)
      return res.json(createErrors(404, err.messages, false));
    return next(err);
  }
};
export default SignUp;
