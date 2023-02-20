import { faker } from "@faker-js/faker";
import { UserModel } from "../../src/entities/User";

import { connectDB, disconnectDB } from "../utils/funcs/createDB";
import { gCall } from "../utils/funcs/gCall";
import { loginMutation, meQuery, registerMutation } from "../utils/resolverDocument/user";
import jwt from 'jsonwebtoken'
import { user } from "../utils/funcs/getFakeData";
import mongoose from 'mongoose';





beforeAll(async () => await connectDB());
afterAll(async () => await disconnectDB());

describe("User resolvers", () => {
    beforeEach(()=>{
        jest.clearAllMocks();
    });
    it("register success", async () => {
        const response = await gCall({
            source: registerMutation,
            variableValues: {
                username: user.username,
                password: user.password
            }
        })
        expect(response).toMatchObject({
            data: {
                register: {
                    user: {
                        username: user.username,
                    },
                }
            }
        });
    });

    it("register fail", async () => {
        const response = await gCall({
            source: registerMutation,
            variableValues: {
                username: user.username,
                password: user.password
            }
        })
        expect(response).toMatchObject({
            data: {
                register: {
                    errors: [
                        {
                            message: "username already exists"
                        }
                    ],
                }
            }
        });
    });

    it("log in success", async () => {
        const response = await gCall({
            source: loginMutation,
            variableValues: {
                username: user.username,
                password: user.password
            }
        })
        expect(response).toMatchObject({
            data: {
                login: {
                    user: {
                        username: user.username
                    }
                }
            }
        });
    });

    it("log in fali", async () => {
        const response = await gCall({
            source: loginMutation,
            variableValues: {
                username: user.username,
                password: "..."
            }
        })
        expect(response).toMatchObject({
            data: {
                login: {
                    errors: [
                        {
                            message: "Something went wrong"
                        }
                    ]
                }
            }
        });
    });

    it("Me query should return user", async () => {
        mongoose.connection.dropDatabase();
        const dbUser = await UserModel.create({
            username: user.username,
            password: user.password,
            createdAt: user.createdAt
        });


        jest.spyOn(jwt, "verify").mockReturnValue({ userId: dbUser.id } as any);
        expect(dbUser).toBeDefined();
        expect(dbUser?.username).toBe(user.username);
        const response = await gCall({ source: meQuery, })
        expect(response).toMatchObject({
            data: {
                me: {
                    username: user.username
                }
            }
        });
    });

    it("Me query should return null", async () => {
        jest.spyOn(jwt, "verify").mockReturnValue({ userId: faker.internet.userName() } as any);
        const response = await gCall({ source: meQuery, })
        expect(response).toMatchObject({
            data: {
                me: null
            }
        });
    });
});
