import { faker } from "@faker-js/faker";
import { act, render, screen } from "@testing-library/react";
import Post from "../../src/components/Posts/Post";

import PaginationPosts from "../../src/components/Posts/PaginationPosts";
import CreateProvider from "../utils/createProvider";


jest.mock('next/router', () => require('next-router-mock'));


jest.mock('../../src/generated/generated-types', () => {
    return {
        __esModule: true,
        ...jest.requireActual('../../src/generated/generated-types')
    };
});


describe("Home page", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Unuser", async () => {
        await act(async () => {
            render(
                <CreateProvider >
                    <PaginationPosts />
                </CreateProvider>
            )
        });
        expect(await screen.findByTestId("homepage-warning")).toBeInTheDocument();
    });

    it("Posts query", async () => {
        const post = {
            title:faker.company.bsBuzz(),
            imageUrl:[faker.image.cats()],
            createdAt:faker.date.past()
        }
        await act(async () => {
            render(
                <CreateProvider >
                    <Post post={post as any}/>
                </CreateProvider>
            )
        });
        expect(await screen.findByText(post.title)).toBeInTheDocument();
    });
})


