import { mongoose } from "@typegoose/typegoose";

import { CommentModel } from "../../src/entities/Comment";
import { connectDB, disconnectDB } from "../utils/funcs/createDB";
import { gCall } from "../utils/funcs/gCall";
import { comments } from "../utils/funcs/getFakeData";
import { commentsQuery } from "../utils/resolverDocument/comment";





beforeAll(async () => await connectDB());
afterAll(async () => await disconnectDB());

describe("Comment resolvers", () => {
    beforeEach(() => {
        mongoose.connection.dropDatabase();
        jest.clearAllMocks();
    });
    it("comments query", async () => {
        for (let i = 0; i < comments.length; i++) {
            await CommentModel.create({ ...comments[i] });
        }
        let text = [];
        for(let i = 0; i < comments.length; i++)
            text.push({text:comments[i].text});
        const response = await gCall({
            source: commentsQuery,
            variableValues: {
                postId:"abc"
            }
        })
        
        expect(response).toMatchObject({
            data: {
                comments:text
            }
        });
    });

});
