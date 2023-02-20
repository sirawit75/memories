import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { CommentModel } from "../entities/Comment";
import { Post, PostModel } from '../entities/Post';
import { UserModel } from '../entities/User';
import { isAdmin } from '../utils/funcs/isAdmin';
import { validateUser } from '../utils/funcs/validateUser';
import { isAuth } from '../utils/middlewares/isAuth';
import { MyContext } from '../utils/types/types';



@ObjectType()
class PaginatedPosts {
    @Field(() => [Post])
    posts!: Post[];
    @Field(() => Boolean)
    hasMore!: boolean;

    @Field(() => Number)
    nextPage!: number;
}


@Resolver()
export class PostResolvers {

    @Mutation(() => Post, { nullable: true})
    @UseMiddleware(isAuth)
    async editPost(
       @Ctx(){req}: MyContext,
       @Arg('postId') postId:string,
       @Arg('text')title:string
    ): Promise<Post|null> {
        const userId = validateUser(req);
        if (!isAdmin(userId))
            return null;
        return PostModel.findByIdAndUpdate(postId, {title});
    }


    @Query(() => Post, { nullable: true })
    async post(
        @Arg('postId') postId: string,
    ): Promise<Post | null> {
        return PostModel.findById(postId).populate("likeUser");
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async commentPost(
        @Arg('postId') postId: string,
        @Arg('text') text: string,
        @Ctx() { req }: MyContext,
    ): Promise<boolean> {
        const userId = validateUser(req);
        if (!userId)
            return false;
        const post = await PostModel.findById(postId);
        const user = await UserModel.findById(userId);
        const comment = await CommentModel.create({ text, username: user?.username, postId });
        post?.allComments?.push(comment.id);
        user?.commentId?.push(comment.id);
        await user?.save();
        await post?.save();
        return true;
    }

    @Mutation(() => Boolean)
    async deletePost(
        @Arg('postId') postId: string,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        const userId = validateUser(req);
        if (!isAdmin(userId))
            return false;
        await PostModel.findByIdAndRemove(postId);
        return true;
    }

    @Query(() => PaginatedPosts)
    async posts(
        @Arg("perPage", () => Number) perPage: number,
        @Arg("curPage", () => Number) curPage: number
    ): Promise<PaginatedPosts> {
        const posts = await PostModel.find().sort({ createdAt: "desc" })
            .skip(curPage * perPage)
            .limit(perPage + 1).populate("likeUser");


        const hasMore = posts.length === perPage + 1;
        return { posts: posts.slice(0, perPage), hasMore, nextPage: curPage + 1 };

    }

    @Mutation(() => Post, { nullable: true })
    @UseMiddleware(isAuth)
    async createPost(
        @Arg('title') title: string,
        @Arg('imageUrl', () => [String]) imageUrl: string[],
        @Ctx() { req }: MyContext
    ): Promise<Post | null> {
        const userId = validateUser(req);
        const user = (await UserModel.findById(userId))!;
        if (user.username !== process.env.ADMIN)
            return null;
        return PostModel.create({ title, creator: user.username, imageUrl });
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async likeOrUnlike(
        @Arg('postId') postId: string,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        const userId = validateUser(req);
        const user = await UserModel.findById(userId);
        if (!user)
            return false;
        const post = (await PostModel.findById(postId).populate("likeUser"))!;
        const isLiked = user.likePost?.includes(post._id);
        if (isLiked) {
            //unlike
            user.likePost = user.likePost?.filter(_postId => _postId !== post.id);
            post.likeUser = post.likeUser?.filter(_user => _user?.id !== user?.id);
            await post.save();
            await user.save();
            return true;
        } else {
            //like
            user.likePost?.push(post.id) as any;
            post.likeUser?.push(user.id) as any;
            await user.save();
            await post.save();
            return true;
        }
    }
}