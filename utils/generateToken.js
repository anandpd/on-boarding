import jwt from "jsonwebtoken";

export const generateToken = (payload, secret = process.env.SECRET, expIn = "1h") => {
    const token = jwt.sign(payload, secret, {
        expiresIn: expIn
    })
    return token;
};
