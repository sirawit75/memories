import { faker } from "@faker-js/faker";
import { act, render, screen } from "@testing-library/react";

import Navbar from "../../src/components/Navbar/Navbar";
import * as resolvers from "../../src/generated/generated-types";
import CreateProvider from "../utils/createProvider";




jest.mock('../../src/generated/generated-types', () => {
    return {
        __esModule: true,
        ...jest.requireActual('../../src/generated/generated-types')
    };
});


describe("Navbar", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Unauth navbar", async () => {
        await act(async () => {
            render(
                <CreateProvider >
                    <Navbar pageProps={undefined} />
                </CreateProvider>
            )
        });
        expect(await screen.findAllByTestId("menu-list")).toHaveLength(6);
        expect(await screen.findByText(/log in/i)).toBeInTheDocument();
        expect(await screen.findByText(/sign up/i)).toBeInTheDocument();
    });

    it("Auth navbar", async () => {
        const username = faker.internet.userName();
        const meQuery = jest.spyOn(resolvers, "useMeQuery").mockReturnValue([{
            data: {
                me: {
                    username
                }
            }
        }] as any);
        await act(async () => {
            render(
                <CreateProvider >
                    <Navbar pageProps={undefined} />
                </CreateProvider>
            )
        });
        expect(meQuery).toBeCalled();
        expect(await screen.findAllByTestId("menu-list")).toHaveLength(5);
        expect(await screen.findByText(/log out/i)).toBeInTheDocument();
        expect(await screen.findByTestId("profile")).toBeInTheDocument();
    });
})


