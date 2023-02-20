import { Response } from "express";
import jwt from "jsonwebtoken";



export const generateToken = (userId: string, res: Response) => {
    const token = jwt.sign({ userId }, process.env.TOKEN_SECRET!, { expiresIn: "7d" });
    res.cookie(process.env.COOKIE_NAME!, token, {
        httpOnly: true,
        secure: false
    });
}


