import React from 'react'
import About from '../src/components/About/About'
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../src/utils/urql/createUrqlClient';

const about = () => {
  return (
    <About/>
  )
}

export default withUrqlClient(createUrqlClient, {ssr:true})(about);