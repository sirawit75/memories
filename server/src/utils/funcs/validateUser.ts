import jwt from 'jsonwebtoken';
import { Request } from 'express';



export const validateUser = (req: Request) => {
    const token = req.cookies[process.env.COOKIE_NAME!];
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET!) as any;
    if (!userId)
        return null;
    return userId;
}
