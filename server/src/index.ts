import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
// import cors from "cors";
import { config } from "dotenv";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";

import { createSchema } from "./utils/funcs/createSchema";
import { MyContext } from "./utils/types/types";

config();

const origin = [
  process.env.FRONTEND_URI,
  process.env.BACKEND_URI,
  process.env.APOLLO_URI,
] as any;

const main = async () => {
  mongoose
    .connect(process.env.DB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .catch((err) => console.error(err));

  const app = express();
  app.get("/health", (_, res) => {
    res.status(200);
    res.send({ status: "Server is healthy" });
  });
  app.use(cookieParser());
  // app.use(
  //     cors({
  //         origin: process.env.FRONTEND_URI,
  //         credentials: true,
  //     })
  // );

  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req, res }: MyContext) => ({ req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: { credentials: true, origin } });
  app.listen({ port: process.env.PORT }, () => {
    console.log("app listening on port " + process.env.PORT);
  });
};

main();
