import { mongoose } from "@typegoose/typegoose";

import { PostModel } from "../../src/entities/Post";
import { connectDB, disconnectDB } from "../utils/funcs/createDB";
import { gCall } from "../utils/funcs/gCall";
import  { post, posts } from "../utils/funcs/getFakeData";
import { postQuery, postsQuery } from "../utils/resolverDocument/post";








beforeAll(async () => await connectDB());
afterAll(async () => await disconnectDB());

describe("Post resolvers", () => {
    beforeEach(() => {
        mongoose.connection.dropDatabase();
        jest.clearAllMocks();
    });
    it("posts query with has more", async () => {
        for (let i = 0; i < posts.length; i++) {
            await PostModel.create({ ...posts[i] });
        }
        const response = await gCall({
            source: postsQuery,
            variableValues: {
                curPage: 0,
                perPage: 1
            }
        })

        expect(response).toMatchObject({
            data: {
                posts: {
                    hasMore: true,
                    nextPage: 1,
                    posts:[{}]
                }
            }
        });
    });

    it("posts query last page", async () => {
        for (let i = 0; i < posts.length; i++) {
            await PostModel.create({ ...posts[i] });
        }
        const response = await gCall({
            source: postsQuery,
            variableValues: {
                curPage: 4,
                perPage: 1
            }
        })
        expect(response).toMatchObject({
            data: {
                posts: {
                    hasMore: false,
                    nextPage: 5,
                    posts: [{}]
                }
            }
        });
    });

    it("single query and founded", async () => {
        const dbPost = await PostModel.create({ ...post });
        const response = await gCall({
            source: postQuery,
            variableValues: {
                postId: dbPost.id
            }
        })
        expect(response).toMatchObject({
            data: {
                post: {
                    id: dbPost.id,
                    title: dbPost.title
                }
            }
        });
    });

    it("query undefined post", async () => {
        const response = await gCall({
            source: postQuery,
            variableValues: {
                postId: "..."
            }
        })
        expect(response).toMatchObject({
            data: {
                post: null
            }
        });
    });

});
