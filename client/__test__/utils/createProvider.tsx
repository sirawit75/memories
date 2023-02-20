import React from "react";
import { Provider } from "urql";
import { never } from "wonka";


interface _ {
    children?: React.ReactNode
    value?:any;
}
export const mockClient = {
    executeQuery: jest.fn(() => never),
    executeMutation: jest.fn(() => never),
    executeSubscription: jest.fn(() => never),
};



const CreateProvider: React.FC<_> = ({ value = mockClient, children }) => {
    return (
        <Provider value={value}>
            {children}
        </Provider>
    )
}

export default CreateProvider;