import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../../src/components/Register/Register';
import CreateProvider from "../utils/createProvider";


jest.mock('next/router', () => require('next-router-mock'));


describe("Register form", () => {
    beforeEach(() => {
        render(
            <CreateProvider>
                <Register />
            </CreateProvider>
        )
    });

    it("Register should be rendered", () => {
        expect(screen.getByTestId("register-form")).toBeInTheDocument();
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

    it("Confirm paassowrd input should be rendered and empty", () => {
        expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();
        const confirmPassword = screen.getByPlaceholderText("Password") as HTMLInputElement;
        expect(confirmPassword.value).toBe("")
    });

    it("Button should be rendered ", () => {
        expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
    });

    it("Loading and errors should not be rendered", () => {
        const errors = screen.queryAllByTestId("register-errors");
        errors.map(item => expect(item).toBeNull());
        expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
        expect(screen.queryByTestId("register-loading")).toBeNull();
    });

    it("Username input should change and errros in this field will be shown", async () => {
        const user = userEvent.setup()
        const usernameInput = screen.getByPlaceholderText("Username") as HTMLInputElement;
        await user.type(screen.getByPlaceholderText("Username"), "ab");
        expect(usernameInput.value).toBe("ab");
        expect(screen.getByTestId("register-errors"));
    });

    it("Password input should change and errros in this field will be shown", async () => {
        const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;
        const user = userEvent.setup()
        await user.type(screen.getByPlaceholderText("Password"), "ab");
        expect(passwordInput.value).toBe("ab");
        expect(screen.getByTestId("register-errors"));
    });

    it("Confirm password input should change and errros in this field will be shown", async () => {
        const confirmPasswordInput = screen.getByPlaceholderText("Confirm password") as HTMLInputElement;
        const user = userEvent.setup()
        await user.type(screen.getByPlaceholderText("Confirm password"), "ab");
        expect(confirmPasswordInput.value).toBe("ab");
        expect(screen.getByTestId("register-errors"));
    });

    it("Check submitting event", async () => {
        const user = userEvent.setup()

        await user.type(screen.getByPlaceholderText("Username"), "username");
        const usernameInput = screen.getByPlaceholderText("Username") as HTMLInputElement;
        expect(usernameInput.value).toBe("username");

        await user.type(screen.getByPlaceholderText("Password"), "password");
        const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;
        expect(passwordInput.value).toBe("password");

        await user.type(screen.getByPlaceholderText("Confirm password"), "password");
        const confirmPasswordInput = screen.getByPlaceholderText("Confirm password") as HTMLInputElement;
        expect(confirmPasswordInput.value).toBe("password");

        const btn = screen.getByRole("button", { name: /register/i });
        await user.click(btn);
        expect(await screen.findByTestId("register-loading")).toBeInTheDocument();
    })

});

