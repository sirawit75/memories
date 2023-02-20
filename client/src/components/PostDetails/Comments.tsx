import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { CommentType } from '../../utils/types/index';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDeleteCommentMutation, useMeQuery, useLikeOrUnlikeCommentMutation, useEditCommentMutation } from '../../generated/generated-types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { BiEdit } from 'react-icons/bi';
import { PulseLoader } from 'react-spinners';

const Comment: React.FC<CommentType> = ({ commentAt, text, username, id, likeByUserId, postId }) => {
  const [, deleteComment] = useDeleteCommentMutation();
  const [editing, setEditing] = useState(false)
  const [{ data, fetching }] = useMeQuery();
  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState(text);
  const [, editComment] = useEditCommentMutation();
  const [showLikeCount, setShowLikeCount] = useState(likeByUserId?.length);
  const router = useRouter();
  const [showLike, setShowLike] = useState(false);
  const [, likeOrUnlikeComment] = useLikeOrUnlikeCommentMutation();
  useEffect(() => {
    if (!data?.me)
      setShowLike(false);
    else
      likeByUserId?.includes(data?.me?.id as string) ? setShowLike(true) : setShowLike(false);
  }, [data]);

  const handleLikeCount = () => {
    if (!showLike)
      setShowLikeCount(showLikeCount as number + 1);
    else
      setShowLikeCount(showLikeCount as number - 1);
  }
  const handleLike = async () => {
    if (!data?.me) {
      router.push(`/login?back=${postId}`);
      return null;
    }
    setShowLike(!showLike);
    handleLikeCount();
    await likeOrUnlikeComment({ commentId: id })

  }
  const handleEdit = async () => {
    setEditing(true);
    await editComment({ username: data?.me?.username as string, text: newText, commentId: id });
    setEdit(!edit);
    setEditing(false);
  }
  const handleClick = async () => {
    const result = confirm("Confirm Delete");
    if (result)
      await deleteComment({ commentId: id })
  }
  return (
    <div  className=' border-t  flex justify-between border-gray-500 gap-5 h-auto w-full items-start p-2'>
      <div className='flex flex-col pl-3 py-2 border-2 md:w-2/6 rounded-lg w-3/6'>
        <div className='flex items-center justify-start md:gap-3 w-full gap-1'>
          <p className={`font-bold md:text-lg  text-sm text-slate-100  bg-emerald-400 rounded-full p-3 md:p-5 w-5 h-5 flex items-center justify-center`}>
            {username[0].toUpperCase()}
          </p>
          <p className='md:font-bold md:text-base text-sm'>
            {username[0].toUpperCase() + username.slice(1)}
          </p>
        </div>
        <div className='mt-3 flex flex-wrap flex-col w-full'>
          <p className='text-xs font-mono text-start '>
            {moment(commentAt).format('MMMM Do ')}
          </p>
          <p className='text-xs font-mono text-start '>
            {moment(commentAt).format('h:mm a')}
          </p>
        </div>
      </div>
      {!edit ? (
        <div className='border-4 w-3/4 rounded-xl text-start pl-3 flex flex-wrap h-fit mt-1 mx-auto '>
          <div className='text-sm font-normal w-full' dangerouslySetInnerHTML={{ __html: text }} />
        </div>) :
        (
          <div className='w-3/4'>
            <textarea
              className='w-full border-2 rounded-lg p-2 font-normal text-xs'
              value={newText}
              autoFocus
              onChange={e => setNewText(e.target.value)}
            />
            <button onClick={handleEdit} disabled={editing}
              className={`md:w-2/6 w-4/6 rounded-full border ${!editing?'hover:bg-sky-600 active:bg-blue-700  bg-sky-400':'bg-gray-500'} font-md text-xs text-slate-50 p-1`}>
              Confirm edit
            </button>
            <div className='mt-2'>
              <PulseLoader color="#36d7b7" size={6} loading={editing} />
            </div>
          </div>
        )
      }
      <div className='flex items-start justify-center gap-3 mr-3 mt-1 w-[35px]'>
        <div className='flex flex-col justify-start items-center'>
          <div>
            {!fetching && showLike ? <AiFillHeart size={22} color='red' className='cursor-pointer' onClick={handleLike} />
              : <AiOutlineHeart size={22} className='cursor-pointer' onClick={handleLike} />
            }
          </div>
          <div>
            <p className='text-xs font-normal text-gray-500'>{showLikeCount}</p>
          </div>
        </div>
        {(data?.me?.username === process.env.NEXT_PUBLIC_ADMIN || data?.me?.username === username) &&
          (
            <div className='flex flex-col items-end justify-end gap-2'>
              <div className='w-full'>
                <AiOutlineDelete size={22} color='red' onClick={handleClick} className='cursor-pointer' />
              </div>
              <div>
                <BiEdit size={20} color='blue' className='cursor-pointer' onClick={() => setEdit(!edit)} />
              </div>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default Comment;