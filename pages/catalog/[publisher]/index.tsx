import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import keys from '../../../config/keys';
import { useEffect } from 'react';

const Issue = ({ issues }) => {
  return (
    <div>
      <div></div>
      <div>
        {issues.map((issue) => {
          return (
            <>
              <div>
                {issue.firstIssue && (
                  <img src={issue.firstIssue.imageUrl}></img>
                )}
              </div>
              <div>{issue.name}</div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Issue;

// This function gets called at build time
export async function getServerSideProps(context) {
  const { publisher } = context.query;
  const res = await fetch(`${keys.comicApi}catalog/publisher/${publisher}`);
  const data = await res.json();

  return {
    props: {
      issues: data,
    },
  };
}
