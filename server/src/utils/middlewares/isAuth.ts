import { MiddlewareFn } from "type-graphql";
import { MyContext } from '../types/types';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    const token  = context.req.cookies[process.env.COOKIE_NAME!];
    if (!token)
        throw new Error("Please login");
    return next();
}