import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import Login from '../src/components/Login/Login';
import { useMeQuery } from '../src/generated/generated-types';
import { createUrqlClient } from '../src/utils/urql/createUrqlClient';

const login = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  const { back } = router.query;
  if (fetching)
    return null;
  if (data?.me && !back)
    router.replace('/');
  else if (data?.me &&back)
    router.push(`/post/${back}`)
  return data?.me ? null : (<Login />);
}

export default withUrqlClient(createUrqlClient)(login);
