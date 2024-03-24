import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});
import jwt from "jsonwebtoken";
import createErrors from "../Errors/createErrors.js";
const Authentication = async (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  if (!token)
    return res.json(createErrors(402, "user not authenticate", false));
  await jwt.verify(token, process.env.SECRETE_TOKEN_KEY, (err, user) => {
    if (err) {
      return res.json(createErrors(401, "token not valid", false));
    } else {
      req.user = user;
      next();
    }
  });
};
export default Authentication;
