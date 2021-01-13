import jwt from "jsonwebtoken";
import status from "../utils/statusCodes";

export const verifyToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(status.unAuthorized)
      .json({ message: "No Authorization !!" });

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified.user;
    next();
  } catch (err) {
    res
      .status(status.forbidden)
      .json({ message: "Token expired or is invalid !!" });
  }
};
