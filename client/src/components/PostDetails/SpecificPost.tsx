import React from 'react';
import { usePostQuery, useMeQuery } from '../../generated/generated-types';
import MemberLoading from '../LoadingAnimation/MemberLoading';
import Carousel from './Carousel';
import PostDetails from './PostDetails';
import Title from './Title';

interface SpecificPostProps {
  postId: string;
}


const SpecificPost: React.FC<SpecificPostProps> = ({ postId }) => {
  const [{ data, fetching }] = usePostQuery({ variables: { postId } });
  const [{ data: meData, fetching: meFetching }] = useMeQuery();

  return (
    <div>
      {(fetching || meFetching) && <MemberLoading />}
      {data?.post && (
        <div data-testid="post-details" className=' flex border-2 rounded-xl shadow-md flex-col items-center  justify-center md:w-5/6  md:my-8 gap-5 mx-auto'>
          <div className='flex flex-col justify-center items-start mx-auto'>
            <Title post={data?.post} me={meData?.me} />
            <hr className="h-px bg-gray-600 border w-full  mb-6  mx-auto sm:w-[90%]" />
            <Carousel post={data?.post} />
          </div>
          <div className=' w-screen md:w-3/5 pb-12'>
            <PostDetails post={data?.post} />
          </div>
        </div>
      )}
    </div>
  )
}
export default SpecificPost



