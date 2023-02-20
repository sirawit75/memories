import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react'
import Register from '../src/components/Register/Register'
import { useMeQuery } from '../src/generated/generated-types';
import { createUrqlClient } from '../src/utils/urql/createUrqlClient';

const register = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  if (fetching)
    return null;
  if (data?.me)
    router.replace('/login');
  return data?.me ? null : (<Register />);
}

export default withUrqlClient(createUrqlClient)(register);