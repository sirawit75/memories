import moment from 'moment';
import React from 'react'
import { useUsersQuery, useMeQuery, useDeleteUserMutation } from '../../generated/generated-types';
import MemberLoading from '../LoadingAnimation/MemberLoading';

const Members = () => {
    const [{ data, fetching }] = useUsersQuery();
    const [{ data: meData, fetching: meFetching }] = useMeQuery();
    const [, deleteUser] =  useDeleteUserMutation();
    if (fetching || meFetching) return (<MemberLoading />);

    const handleDelete = async (deletedUserId:any) => {
        const result = confirm('Confirm delete');
        if(result)
            await deleteUser({deletedUserId});
    }

    return (
        <div className='flex flex-col items-center justify-center w-full mx-auto' data-testid="members">
            <p  className='p-2 text-md md:text-xl shadow-lg text-center my-12 text-slate-100 bg-green-500 font-bold md:w-2/6 mx-auto rounded-full w-4/6'>
                Members & Join date
            </p>
            {data?.users.map((item, index) => (
                <div className={`md:rounded-xl  shadow-md flex justify-around md:w-3/4 w-full mx-auto  md:text-lg  items-center ${index % 2 ? 'bg-gray-700 text-slate-300' : 'bg-slate-400'}`} key={item.id} >
                    <span className='font-bold text-xl'>{index + 1}</span>
                    <div className='p-2 flex flex-col items-center'>
                        <span className={
                            `${index%2?'bg-orange-400':'bg-pink-500'} text-slate-200 w-10 text-center h-10 flex justify-center items-center rounded-full font-semibold
                            ` }>
                            {item.username[0].toLocaleUpperCase()}
                        </span>
                        <span className='text-base font-medium'>{item.username}</span>
                    </div>
                    <span>
                        {moment(item?.createdAt).format('MMMM Do YYYY')}
                    </span>
                    {meData?.me?.username === process.env.NEXT_PUBLIC_ADMIN && (
                        <div className='bg-zinc-200 rounded-lg p-1 cursor-pointer' onClick={()=>handleDelete(item.id)}>
                            <span className='text-pink-600'>Delete</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Members