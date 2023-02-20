import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";

import Title from "../../src/components/PostDetails/Title";
import WriteComment from "../../src/components/PostDetails/WriteComment";
import CreateProvider from "../utils/createProvider";

jest.mock('next/router', () => require('next-router-mock'));


const myRender = (component: ReactNode) => {
    return render(
        <CreateProvider>
            {component}
        </CreateProvider>
    );
}

describe("Single post page", () => {


    it("Post will be shown bob", async () => {
        myRender(<Title />);
        expect(await screen.findByTestId("Bob")).toHaveTextContent("Bob");
    });

    it("Admin tools should not  be rendered", async () => {
        render(
            <CreateProvider>
                <Title />
            </CreateProvider>
        )
        await waitFor(() => {
            expect(screen.queryByTestId("admin-tools")).toBeNull();
        });
    });

    it("Button should be rendered", async () => {
        myRender(<WriteComment />);
        expect(await screen.findByRole("button", { name: /submit/i })).toBeInTheDocument();
    });

    it("Loading should not be rendered", () => {
        myRender(<WriteComment />);
        expect(screen.queryByTestId("submit-comment")).toBeNull();
    });

    it("Write comment field should be rendered and empty", async () => {
        myRender(<WriteComment />);
        expect(await screen.findByPlaceholderText("Say something...")).toBeInTheDocument();
        const writeCommentField = await screen.findByPlaceholderText("Say something...") as HTMLInputElement;
        expect(writeCommentField.value).toBe("");
    });

    it("Test typing comment and submit", async () => {
        myRender(<WriteComment />);
        const user = userEvent.setup();
        const commenytField = await screen.findByPlaceholderText("Say something...") as HTMLInputElement;
        await user.type(commenytField, "dsd");
        expect(commenytField.value).toBe("dsd");
    });

});