import jwt from "jsonwebtoken";
import AppError from "../error/usererror.js";

const authMiddleware = (req, res, next) => {
    
    console.log("AUTH MIDDLEWARE HIT");
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token not found", 401);
    }

    const parts = authHeader.split(/\s+/);

    if (parts[0] !== "Bearer" || !parts[1]) {
        throw new AppError("Invalid authorization format", 401);
    }

    const token = parts[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
};

export default authMiddleware;