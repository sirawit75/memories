import argon2 from "argon2";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";

import { User, UserModel } from "../entities/User";
import { isAdmin } from "../utils/funcs/isAdmin";
import jwt from "jsonwebtoken";
import { validateUser } from "../utils/funcs/validateUser";
import { isAuth } from "../utils/middlewares/isAuth";
import { MyContext } from "../utils/types/types";



@ObjectType()
class FieldError {
    @Field()
    field!: string;
    @Field()
    message!: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => User, { nullable: true })
    user?: User

    @Field(() => [User], { nullable: true })
    users?: User[]

    @Field(() => String, { nullable: true })
    accessToken?: string;
}




@Resolver()
export class UserResolvers {

    @Mutation(() => Boolean)
    async deleteUser(
        @Ctx() { req }: MyContext,
        @Arg('deletedUserId') deletedUserId: string
    ): Promise<boolean> {
        const userId = validateUser(req);
        if (await isAdmin(userId)) {
            await UserModel.findByIdAndRemove(deletedUserId);
            return true;
        }
        return false;
    }

    @Query(() => [User])
    async users(): Promise<User[]> {
        return UserModel.find({}).find().sort({ createdAt: 'desc' });
    }


    @Query(() => User, { nullable: true })
    @UseMiddleware(isAuth)
    async me(@Ctx() { req }: MyContext): Promise<User | null> {
        const userId = validateUser(req);
        if (!userId)
            return null;
        const user = (await UserModel.findById(userId))!;
        return user;
    }


    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async logout(@Ctx() { req, res }: MyContext): Promise<Boolean> {
        const userId = validateUser(req);
        const user = await UserModel.findById(userId);
        if (!user)
            return false;
        res.clearCookie(process.env.COOKIE_NAME!);
        return true;
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('username') username: string,
        @Arg('password') password: string,
    ): Promise<UserResponse> {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser)
            return {
                errors: [
                    {
                        field: "username",
                        message: "username already exists"
                    }
                ]
            }

        const hashedPassword = await argon2.hash(password);
        const user = await UserModel.create({ username, password: hashedPassword });
        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('username') username: string,
        @Arg('password') password: string,
        @Ctx() { res }: MyContext
    ): Promise<UserResponse> {
        const errors = [
            {
                field: "password",
                message: "Something went wrong"
            }
        ]
        const user = await UserModel.findOne({ username });
        if (!user)
            return { errors };
        const valid = await argon2.verify(user.password, password);
        if (!valid)
            return { errors };

        // generateToken(user.id, res);
        const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET!, { expiresIn: "7d" });
        res.cookie(process.env.COOKIE_NAME!, token, {
            httpOnly: true,
            secure: false
        });
        return { user };
    }
}

