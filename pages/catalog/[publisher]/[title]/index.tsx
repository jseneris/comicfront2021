import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import keys from '../../../../config/keys';
import { useEffect } from 'react';

const IssueShow = ({ currentUser, issue, titleList, ownList }) => {};

const Issue = ({ publisher }) => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default Issue;

// This function gets called at build time
export async function getServerSideProps(context) {
  const { publisher, title, issue } = context.query;

  const res = await fetch(`${keys.comicApi}${publisher}/${title}/${issue}`);
  const data = await res.json();
  console.log(data);

  return {
    props: {
      publisher: { name: 'marvel' },
    },
  };
}
