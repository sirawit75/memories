import { graphql, GraphQLSchema } from "graphql";

import { createSchema } from "../../../src/utils/funcs/createSchema";

// import { Response,Request } from 'express';
interface Options {
    source: string;
    variableValues?: any;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues}: Options) => {
    if (!schema)
        schema = await createSchema();
    return graphql({
        schema,
        source,
        variableValues,
        contextValue: {
            req: {
                cookies: {
                    [process.env.COOKIE_NAME!]:"somevalue"
                }
            },
            res: {
                cookie: jest.fn()
            },
        }
    });
}