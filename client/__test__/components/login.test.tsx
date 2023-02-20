import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../src/components/Login/Login";
import CreateProvider from "../utils/createProvider";



describe("Log in form", () => {
    beforeEach(() => {
        render(
            <CreateProvider>
                <Login />
            </CreateProvider>
        )
    });


    it("Log in form should be renderd", () => {
        expect(screen.getByTestId("login-form")).toBeInTheDocument();
    });

    it("Username input should be rendered and empty", () => {
        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
        const usernameInput = screen.getByPlaceholderText("Username") as HTMLInputElement;
        expect(usernameInput.value).toBe("")
    });

    it("Passowrd input should be rendered and empty", () => {
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;
        expect(passwordInput.value).toBe("")
    });

    it("Button should be rendered ", () => {
        expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    });

    it("Loading and errors should not be rendered", () => {
        expect(screen.queryByTestId("login-loading")).not.toBeInTheDocument();
        expect(screen.queryByTestId("login-errors")).not.toBeInTheDocument();
    });

    it("Username input should change", async () => {
        const  user = userEvent.setup();
        const usernameInput = screen.getByPlaceholderText("Username") as HTMLInputElement;
        await user.type(usernameInput, "abc");
        expect(usernameInput.value).toBe("abc");
    });

    it("Password input should change", async() => {
        const  user = userEvent.setup();
        const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;
        await user.type(passwordInput, "abc")
        expect(passwordInput.value).toBe("abc");
    });

    it("Loading component should be renderd when button is clicked", async () => {
        const  user = userEvent.setup();
        const usernameInput = screen.getByPlaceholderText("Username") as HTMLInputElement;
        await user.type(usernameInput, "abc");
        const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;
        await user.type(passwordInput, "abc");
        const btn = screen.getByRole("button", { name: /log in/i });
        await user.click(btn);
        expect(await screen.findByTestId("login-loading")).toBeInTheDocument();
    });
});


