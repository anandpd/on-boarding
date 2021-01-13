import jwt from 'jsonwebtoken'

export const verifyToken = async(req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ message: "No Authorization !!" });

    try{
        const verified = jwt.verify(token, secretToken);
        req.user = verified.user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token expired or is invalid !!" });
    }
}