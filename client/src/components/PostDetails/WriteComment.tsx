import { useRouter } from "next/router";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { MeQuery, useCommentPostMutation, PostQuery } from '../../generated/generated-types';





const WriteComment: React.FC<MeQuery & PostQuery> = ({ me, post }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [, commentPost] = useCommentPostMutation();
  const router = useRouter();


  const handleSubmit = async () => {
    if (!me) {
      router.push(`/login?back=${post?.id}`);
      return null;
    }
    if (text.length) {
      setLoading(true)
      await commentPost({ postId: post?.id as string, text });
      setLoading(false);
      setText("");
    }

  }
  return (
    <div className="w-full  p-2 ">
      {!me && <p className="text-red-500 font-bold text-base">**Log in to comment and like</p>}
      <div className="mb-5">
        {me?.id && (
          <div className='flex items-center gap-2 justify-start '>
            <p className={`font-bold text-slate-100  bg-emerald-400 rounded-full p-5 w-9 h-9 flex items-center justify-center`}>
              {me?.username[0].toUpperCase()}
            </p>
            <p className='font-bold text-lg'>
              {me?.username[0].toUpperCase() + me?.username.slice(1)}
            </p>
          </div>
        )}
      </div>
      <div className="p-2  border-t-2">
        <textarea
          value={text}
          onChange={(e => setText(e.target.value))}
          className='w-full min-h-[100px] rounded-lg bg-slate-50 border-2 p-2'
          placeholder="Say something..."
        />
      </div>
      <div>
        <div className="flex items-center justify-end">
          <button
            className={`place-items-end my-2 text-slate-50 ${!loading ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500'} active:bg-blue-800 font-medium rounded-xl text-sm px-6 mr-2 py-1`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {loading && (
          <div className='pt-6' data-testid="submit-comment">
            <PulseLoader color="#36d7b7" size={14} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
}

export default WriteComment;
