import moment from 'moment';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { PostQuery, useCommentsQuery, useLikeOrUnlikeMutation, useMeQuery } from '../../generated/generated-types';
import MemberLoading from '../LoadingAnimation/MemberLoading';
import Comment from './Comments';
import WriteCommnet from './WriteComment';



const PostDetails: React.FC<PostQuery> = ({ post }) => {
    const [{ data, fetching }] = useMeQuery();
    const [, likeOrUnlike] = useLikeOrUnlikeMutation();
    const [{ data: commentData, fetching: commentFetching }] = useCommentsQuery({
        variables: {
            postId: post?.id as string
        }
    });
    const [showLikeCount, setShowLikeCount] = useState(post?.likeUser?.length as number);
    const isLoggedIn = data?.me ? true : false;
    const [showLike, setShowLike] = useState(false);

    useEffect(() => {
        for (let i = 0; i < post?.likeUser?.length!; i++) {
            // let likeByUserId = post?.likeUser?[i].id
            if (data?.me?.id === post?.likeUser![i]?.id) {
                setShowLike(true);
                break;
            }
            setShowLike(false);
        }
    }, [data?.me]);


    const sendActionToServer = async (postId: any) => {
        await likeOrUnlike({ postId });
    }
    const handleLikeCount = () => {
        if (!showLike)
            setShowLikeCount((post?.likeUser?.length) as number + 1);
        else
            setShowLikeCount((post?.likeUser?.length) as number - 1);
    }
    const handleLike = () => {
        if (!isLoggedIn) {
            router.push(`/login?back=${post?.id}`);
            return null;
        }
        setShowLike(!showLike);
        handleLikeCount();
        sendActionToServer(post?.id);
    }
    if (fetching || commentFetching)
        return (<MemberLoading />)

    return (
        <div className='text-center w-full  border-2 border-gray-500 bg-gray-100 flex flex-col items-start rounded-xl shadow-xl '>
            <div className=' flex items-center justify-around gap-3 w-full  mb-6 border-b-2  border-b-gray-500'>
                <div onClick={handleLike}
                    className='flex items-center justify-center gap-5   w-full cursor-pointer p-2 border-r-gray-500 border-r'>
                    {showLike ?
                        <AiFillHeart size={30} color='red' /> : <AiOutlineHeart size={30} />
                    }
                    <p>{showLikeCount}</p>
                </div>
                <div className='flex items-center justify-center gap-5 w-full p-2 border-r-gray-500 border-r'>
                    <BiCommentDetail size={28} />
                    <p>{post?.allComments?.length}</p>
                </div>
                <div className='w-full flex items-center justify-center p-2 md:text-sm flex-wrap text-xs'>
                    <p>{moment(post?.createdAt).format('MMMM Do, h:mm a')}</p>
                </div>
            </div>
            <div className='w-full'>
                <WriteCommnet me={data?.me} post={post} />
            </div>
            <div className='w-full flex flex-col-reverse h-auto' data-cy="comment-section">
                {commentData?.comments?.map((item, index) => (
                    <Comment key={index}
                        commentAt={item?.commentAt}
                        text={item?.text as string}
                        username={item?.username as string}
                        id={item.id}
                        likeByUserId={item.like}
                        postId={post?.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default PostDetails;
