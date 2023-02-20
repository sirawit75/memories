import { buildSchema } from "type-graphql";
import { CommentResolvers } from "../../resolvers/comment";
import { PostResolvers } from "../../resolvers/post";
import { UserResolvers } from "../../resolvers/user";

export const createSchema = () =>
  buildSchema({
    resolvers: [PostResolvers, UserResolvers, CommentResolvers],
    validate: false,
  });
