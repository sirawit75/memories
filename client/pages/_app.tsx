import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../src/components/Layout/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Memories</title>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
