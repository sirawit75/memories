import type { NextPage } from 'next'
import Home from '../src/components/Posts/Home'
import {withUrqlClient} from 'next-urql';
import { createUrqlClient } from '../src/utils/urql/createUrqlClient';

const Index: NextPage = () => {
  return (
    <Home/>
  )
}

export default withUrqlClient(createUrqlClient, {ssr:true})(Index);
