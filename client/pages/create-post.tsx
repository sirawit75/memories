import { withUrqlClient } from "next-urql";
import React from "react";
import MemberLoading from "../src/components/LoadingAnimation/MemberLoading";
import CreatePost from "../src/components/CreatePost/CreatePost";
import { useMeQuery } from "../src/generated/generated-types";
import { warning } from "../src/utils/constant/create-post";
import { createUrqlClient } from "../src/utils/urql/createUrqlClient";

const create_post = () => {
    const [{ data, fetching }] = useMeQuery();
    if (fetching)
        return <MemberLoading/>
    const isAdmin = data?.me?.username ===process.env.NEXT_PUBLIC_ADMIN? true : false;
    if (isAdmin)
        return (<CreatePost />)
    else
        return (
            <div className='text-center  mt-32  flex flex-col justify-start items-center' data-testid="warning">
                <p className='text-red-600 text-3xl font-extrabold '>{warning}</p>
                <a href="/" className='md:hidden rounded-3xl text-lg font-bold bg-cyan-500 text-slate-200 w-20 h-10 mt-5 flex items-center justify-center'>Home</a>
            </div>
        )
}

export default withUrqlClient(createUrqlClient)(create_post);