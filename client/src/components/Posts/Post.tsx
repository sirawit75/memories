import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { off } from 'process';
import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineDelete, AiOutlineHeart } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Post, useLikeOrUnlikeMutation, useMeQuery, useDeletePostMutation } from '../../generated/generated-types';



interface PostProps {
  post: Post | null;
}


const Post: React.FC<PostProps> = ({ post }) => {
  const [, likeOrUnlike] = useLikeOrUnlikeMutation();
  const [{ data, fetching }] = useMeQuery();
  const [showLikeCount, setShowLikeCount] = useState(post?.likeUser?.length);
  const [showLike, setShowLike] = useState(false);
  const [, deletePost] = useDeletePostMutation();
  const router = useRouter();


  useEffect(() => {
    for(let i=0; i<post?.likeUser?.length!; i++){
      // let likeByUserId = post?.likeUser?[i].id
      if(data?.me?.id === post?.likeUser![i]?.id){
        setShowLike(true);
        break;
      }
      setShowLike(false);
    }
  }, [data?.me]);


  const isLoggedIn = data?.me ? true : false;

  const sendActionToServer = async (postId: any) => {
    await likeOrUnlike({ postId });
  }

  const handleLikeCount = () => {
    if (!showLike)
      setShowLikeCount((post?.likeUser?.length) as number + 1);
    else
      setShowLikeCount((post?.likeUser?.length) as number - 1);
  }

  const doubleClick = (e: any) => {
    if (e.detail === 2) {
      if (!isLoggedIn) {
        router.push('/login');
        return null;
      }
      setShowLike(!showLike);
      handleLikeCount();
      sendActionToServer(post?.id);
    }
  }

  const oneClick = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return null;
    }
    setShowLike(!showLike);
    handleLikeCount();
    sendActionToServer(post?.id);
  }

  const handleDelete = async () => {
    const result = confirm("Confirm Delete");
    if (result)
      await deletePost({ postId: (post?.id) as string });
  }

  return (
    <div className="shadow-lg rounded-lg bg-gray-100 max-h-full md:mb-5 w-3/4 md:w-auto "
      onClick={(e: any) => doubleClick(e)} data-testid="single-post">
      <div className="flex  flex-col  gap-1  w-auto p-2 ">
        {/* <div className=''> */}
        <Link href='/post/[id]' as={`/post/${post?.id}`}>
          <div className="rounded-lg  w-fit  mx-auto h-fit object-fill  cursor-pointer pt-2">
            <LazyLoadImage src={`${post?.imageUrl[0]}`}
              width={500} height={500}
              alt={post?.title} />
          </div>
        </Link>
        <div className='mb-2 text-lg font-bold pt-3 flex items-center justify-between'>
          <Link href='/post/[id]' as={`/post/${post?.id}`} className='active:text-orange-500'>
            <div className='hover:scale-105 duration-500 cursor-pointer ' 
            dangerouslySetInnerHTML={{__html:post?.title as string}}/>
            
          </Link>
          {data?.me?.username === process.env.NEXT_PUBLIC_ADMIN && (
            <div className='flex justify-around items-center gap-2 cursor-pointer'>
              <AiOutlineDelete size={22} className='text-red-500' onClick={handleDelete} />
              <Link href='/edit/[id]' as={`/edit/${post?.id}`} className='active:text-orange-500'>
                <FiEdit size={19} className='text-cyan-600' />
              </Link>
            </div>
          )}
        </div>
        {/* </div> */}
        <div className='p-1 '>
          <hr className='  border-slate-300 ' />
        </div>
        <div className="flex items-center justify-between">
          <div className='flex items-center justify-between '>
            <div className='flex justify-center items-center text-lg font-semibold mr-3 gap-1'>
              <span className='text-gray-800 cursor-pointer ' onClick={oneClick}>
                {!fetching && showLike ?
                  <AiFillHeart size={28} color='red' /> :
                  <AiOutlineHeart size={28} />
                }
              </span>
              {showLikeCount as number > 0 && (
                <span className='font-normal text-sm'>
                  {showLikeCount}
                </span>
              )}
            </div>
            <Link href='/post/[id]' as={`/post/${post?.id}`} className='active:text-orange-500'>
              <div className='flex justify-center items-center text-lg font-semibold gap-1'>
                <span className='text-gray-800 cursor-pointer'>
                  <BiCommentDetail size={25} />
                </span>
                {(post?.allComments?.length) as Number > 0 && (
                  <span className='font-normal text-sm'>
                    {post?.allComments?.length}
                  </span>
                )}
              </div>
            </Link>
          </div>
          <div className='text-slate-700 font-light text-xs'>
            {moment(post?.createdAt).format('MMMM Do YYYY')}
          </div>
        </div>
      </div>
    </div>

  )
}

export default Post