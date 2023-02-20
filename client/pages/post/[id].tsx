import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import SpecificPost from '../../src/components/PostDetails/SpecificPost';
import { createUrqlClient } from '../../src/utils/urql/createUrqlClient';




const Post = () => {
    const router = useRouter();
    return (<SpecificPost postId={router.query.id as  string}/>);
}

export default withUrqlClient(createUrqlClient, {ssr:true})(Post);