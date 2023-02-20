import { act, render, screen } from "@testing-library/react";
import Createpost from "../../pages/create-post";
import * as resolvers from "../../src/generated/generated-types";


jest.mock('../../src/generated/generated-types', () => {
    return {
        __esModule: true,
        ...jest.requireActual('../../src/generated/generated-types')
    };
});



describe("Create post page", () => {

    const meQuery = jest.spyOn(resolvers, "useMeQuery").mockReturnValue([{
        data: {
            me: {
                username: "bob"
            }
        }
    }] as any);
    it.only("warning should be renderd", async () => {
        await act(() => {
            render(<Createpost pageProps={undefined} />);
        });
        expect(meQuery).toHaveBeenCalled();
        expect(await screen.findByTestId("warning")).toBeInTheDocument();
    });
});