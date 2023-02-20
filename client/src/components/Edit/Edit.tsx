import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { Post, useEditPostMutation } from '../../generated/generated-types';

interface EditProps {
    post: Post
}


const Edit: React.FC<EditProps> = ({ post }) => {
    const [, editPost] = useEditPostMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState(post.title);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setTitle(title);
        setIsLoading(true);
        await editPost({ postId: post.id, text: title as string });
        setIsLoading(false);
        router.back();
    }
    return (
        <div className=' w-3/4 md:w-1/3 mx-auto   text-center h-full bg-gray-200 shadow-lg rounded mt-6'>
            <div className='pt-3'>
                <h1 className='font-extrabold  text-xl text-gray-800'>Edit post</h1>
            </div>
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)} className='px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                    <div className='text-start font-bold p-2 text-base text-gray-600'>
                        <label htmlFor="password" className=''>Title</label>
                    </div>
                    <textarea 
                        className='p-2 w-full h-full border-3 rounded-lg bg-slate-50'
                        autoFocus
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit" disabled={isLoading} className={`bg-teal-500 hover:bg-teal-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
                    Confirm
                </button>
                <div className='pt-6'>
                    <PulseLoader color="#36d7b7" size={14} loading={isLoading} />
                </div>
            </form>

        </div>
    )
}

export default Edit