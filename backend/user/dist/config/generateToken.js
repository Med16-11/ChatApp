import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SCRET = process.env.JWT_SECRET;
export const generateToken = (user) => {
    return jwt.sign({ user }, JWT_SCRET, { expiresIn: "15d" });
};
//# sourceMappingURL=generateToken.js.map