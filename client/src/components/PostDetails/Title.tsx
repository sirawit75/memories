import Link from 'next/link';
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { PostQuery, MeQuery, useDeletePostMutation } from '../../generated/generated-types';
import { useRouter } from 'next/router';

const Title: React.FC<PostQuery & MeQuery> = ({ post, me }) => {
    const [, deletePost] = useDeletePostMutation();
    const router = useRouter();
    const handleDelete = async () => {
        const result = confirm("Confirm Delete");
        if (result) {
            await deletePost({ postId: post?.id as string });
            router.replace('/');
        }
    }
    return (
        <div className=' pb-5 pl-5 w-full mt-5 flex justify-between items-start'>
            <div className=''>
                <div className='flex items-center gap-2 justify-start pt-3'>
                    <p className='font-bold text-slate-100  bg-blue-400 rounded-full p-5 w-12 h-12 flex items-center justify-center'>
                        B
                    </p>
                    <p className='font-bold text-lg' data-testid="Bob">Bob</p>
                </div>
                <div className='mt-6 flex flex-wrap ml-5'>
                    <div className='font-semibold text-gray-800' dangerouslySetInnerHTML={{ __html: post?.title as string }} />
                </div>
            </div>
            <div className=' mr-8  mt-4 md:mt-2' >
                {me?.username === process.env.NEXT_PUBLIC_ADMIN && (
                    <div  data-testid="admin-tools" className='border-2  p-2 rounded-lg border-gray-300 flex justify-center items-center gap-2 cursor-pointer'>
                        <AiOutlineDelete size={30} className='text-red-500' onClick={handleDelete} />
                        <Link href='/edit/[id]' as={`/edit/${post?.id}`} className='active:text-orange-500'>
                            <FiEdit size={26} className='text-cyan-600' />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Title