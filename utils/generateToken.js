import jwt from "jsonwebtoken";

export const generateToken = (payload, secret = process.env.SECRET, expiresIn) => {
    const token = jwt.sign(payload, secret, expiresIn)
    return token;
};
