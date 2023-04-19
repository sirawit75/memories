import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import { LoginMutation, MeDocument } from "../../generated/generated-types";
import { isServer } from "../funcs/isServer";

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) cookie = ctx?.req?.headers?.cookie;

  return {
    url: process.env.NEXT_PUBLIC_BACKEND_URI as string,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie } : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
          CommentDetails: () => null,
        },
        updates: {
          Mutation: {
            login: (_result: LoginMutation, args, cache, info) => {
              cache.updateQuery({ query: MeDocument }, () => {
                return { me: _result.login.user };
              });
            },
            logout: (result, args, cache, info) => {
              cache.updateQuery({ query: MeDocument }, () => {
                return { me: null };
              });
            },
            deletePost: (result, args, cache, info) => {
              cache.invalidate({
                __typename: "Post",
                id: args.postId as string,
              });
            },
            deleteUser: (result, args, cache, info) => {
              cache.invalidate({
                __typename: "User",
                id: args.deletedUserId as string,
              });
            },
            likeOrUnlike: (result, args, cache, info) => {
              cache.invalidate({
                __typename: "Post",
                id: args.postId as string,
              });
            },
            likeOrUnlikeComment: (result, args, cache, info) => {
              cache.invalidate({
                __typename: "Comment",
                id: args.commentId as string,
              });
            },
            commentPost: (result, args, cache, info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "comments"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate("Query", "comments", fi.arguments || {});
              });
              cache.invalidate({
                __typename: "Post",
                id: args.postId as string,
              });
            },
            deleteComment: (result, args, cache, info) => {
              cache.invalidate({
                __typename: "Comment",
                id: args.commentId as string,
              });
            },
            editComment: (result, args, cache, info) => {
              cache.invalidate({
                __typename: "Comment",
                id: args.commentId as string,
              });
            },
            editPost: (result, args, cache, info) => {
              cache.invalidate({
                __typename: "Post",
                id: args.postId as string,
              });
            },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
};
