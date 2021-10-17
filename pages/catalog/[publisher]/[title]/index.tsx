import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import keys from '../../../../config/keys';
import React, { useEffect } from 'react';
import { ComicCard } from '../../../../components/ComicCard';

const IssueShow = ({ currentUser, issue, titleList, ownList }) => {};

const Issue = ({ publisher, issues }) => {
  return (
    <div>
      {issues.map((comic) => {
        return <ComicCard comic={comic} handleClick={() => {}} />;
      })}
    </div>
  );
};

export default Issue;

// This function gets called at build time
export async function getServerSideProps(context) {
  const { publisher, title } = context.query;

  const res = await fetch(`${keys.comicApi}catalog/${publisher}/${title}/`);
  const data = await res.json();

  return {
    props: {
      publisher: { name: title },
      issues: data,
    },
  };
}
