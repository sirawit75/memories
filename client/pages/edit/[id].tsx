import { useRouter } from 'next/router';
import React from 'react'
import Edit from '../../src/components/Edit/Edit';
import { useMeQuery, usePostQuery } from '../../src/generated/generated-types';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../src/utils/urql/createUrqlClient';
import Post from '../../src/components/Posts/Post';

const Edit_ = () => {
    const router = useRouter();
    const [{ data, fetching }] = useMeQuery();
    const postId = router.query.id as string;
    const [{ data:postData, fetching:postFetching }] = usePostQuery({ variables: { postId } });
    if (fetching || postFetching)
        return null;
    const isAdmin = data?.me?.username === process.env.NEXT_PUBLIC_ADMIN ? true : false;
    if (isAdmin) {
        return (<Edit post={postData?.post as Post} />)
    }
    else {
        router.replace('/')
        return null;
    }
}

export default withUrqlClient(createUrqlClient)(Edit_);