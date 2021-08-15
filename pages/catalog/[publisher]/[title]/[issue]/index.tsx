import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import keys from '../../../../../config/keys';
import React, { useEffect } from 'react';
import { ComicCard } from '../../../../../components/ComicCard';

const IssueShow = ({ currentUser, issue, titleList, ownList }) => {};

const Issue = ({ publisher, issues, currentIssue }) => {
  console.log(issues);
  console.log(currentIssue);
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
  const { publisher, title, issue } = context.query;

  const res = await fetch(`${keys.comicApi}catalog/${publisher}/${title}`);
  const data = await res.json();
  const res2 = await fetch(
    `${keys.comicApi}catalog/${publisher}/${title}/${issue}`
  );
  const data2 = await res2.json();
  console.log('title', data);
  console.log('issue', data2);

  return {
    props: {
      publisher: { name: title },
      issues: data,
      currentIssue: data2,
    },
  };
}
