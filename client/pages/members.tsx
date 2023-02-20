import React from 'react'
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../src/utils/urql/createUrqlClient';
import Members from '../src/components/Members/Members';

const members = () => {
  return ( <Members/>)
}

export default withUrqlClient(createUrqlClient)(members);