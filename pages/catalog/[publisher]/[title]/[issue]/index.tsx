import Head from 'next/head';
import Image from 'next/image';

import keys from '../../../../../config/keys';

export default function Home({ comics }) {
  return (
    <>
      <Head>
        <title>Closet Space Comics</title>
        <meta name="description" content="Closet Space Comics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
