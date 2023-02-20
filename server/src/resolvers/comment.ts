import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Comment, CommentModel } from '../entities/Comment';
import { PostModel } from '../entities/Post';
import { UserModel } from '../entities/User';
import { validateUser } from '../utils/funcs/validateUser';
import { isAuth } from '../utils/middlewares/isAuth';
import { MyContext } from '../utils/types/types';
import { isAdmin } from '../utils/funcs/isAdmin';




@Resolver()
export class CommentResolvers {

    @Query(() => [Comment], { nullable: true })
    async comments(
        @Arg('postId') postId: string,
    ): Promise<Comment[] | null> {
        return CommentModel.find({ postId });
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async editComment(
        @Arg('commentId') commentId: string,
        @Arg('username') username: string,
        @Arg('text') text: string,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        const userId = validateUser(req);
        if (!userId)
            return false;
        const comment = (await CommentModel.findById(commentId))!;
        if (await isAdmin(userId)) {
            comment.text = text;
            await comment.save();
            return true;
        }
        if (comment?.username !== username)
            return false;
        comment.text = text;
        await comment.save();
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteComment(
        @Arg('commentId') commentId: string,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        const userId = validateUser(req);
        const user = (await UserModel.findById(userId))!;

        const comment = await CommentModel.findByIdAndRemove(commentId);
        const post = (await PostModel.findById(comment?.postId))!;

        user.commentId = user.commentId?.filter(item => item !== comment?.id);
        post.allComments = post?.allComments?.filter(item => item !== comment?.id);


        await post.save();
        await user.save();
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async likeOrUnlikeComment(
        @Arg('commentId') commentId: string,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        const userId = validateUser(req);
        if (!userId) return false;
        const user = (await UserModel.findById(userId))!;

        const comment = await CommentModel.findById(commentId);
        if (comment?.like?.includes(user.id)) {
            comment.like = comment.like.filter(item => item !== user.id);
            user.likeCommentId = user.likeCommentId?.filter(item => item !== comment?.id);
        }
        else {
            comment?.like?.push(user.id);
            user.likeCommentId?.push(comment?.id);
        }

        await user.save();
        await comment?.save();
        return true;
    }
}