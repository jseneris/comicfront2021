import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { ComicCard } from '../components/ComicCard';
import { PublisherCard } from '../components/PublisherCard';

import keys from '../config/keys';
import getWednesday from '../utils/getWednesday';

export default function Home({ comics }) {
  const [filterList, setFilterList] = useState([]);
  const [filterDate, setFilterDate] = useState(getWednesday());
  const [comicList, setComicList] = useState(comics);

  useEffect(() => {
    (async () => {})();
  }, [filterDate]);

  const handleDateChange = (e) => {
    console.log(e.target.value);
    setFilterDate(e.target.value);
  };

  const handleDateEnter = async (e) => {
    console.log(e);
    if (e.key === 'Enter') {
      console.log('getting date');

      const res = await fetch(
        `${keys.comicApi}catalog/issue?date=${filterDate}`
      );
      const comics = await res.json();
      setComicList(comics);
    }
  };

  const updateFilter = (id) => {
    if (filterList.find((element) => element === id) >= 0) {
      setFilterList([...filterList, id]);
    } else {
      setFilterList(filterList.filter((element) => element !== id));
    }
  };

  return (
    <>
      <Head>
        <title>Closet Space Comics</title>
        <meta name="description" content="Closet Space Comics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <nav className={styles.filter}>
          <div className={styles.filter}>
            <div>date</div>
            <div>
              <input
                type="text"
                value={filterDate}
                onChange={(e) => handleDateChange(e)}
                onKeyPress={(e) => handleDateEnter(e)}
              ></input>
            </div>
          </div>
          <div className={styles.filter}>
            <div>title</div>
            <div>
              <input type="text"></input>
            </div>
          </div>
        </nav>
        <nav className={styles.filterNav}>
          <div className={styles.filter}>
            {comicList.publishers.map((publisher) => {
              return <PublisherCard publisher={publisher} />;
            })}
          </div>
        </nav>
        <section className={styles.cards}>
          {comicList.issues.map((comic) => {
            return <ComicCard comic={comic} />;
          })}
        </section>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  );
}

// This function gets called at build time
export async function getServerSideProps() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    `${keys.comicApi}catalog/issue?date=${getWednesday()}`
  );
  const comics = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      comics,
    },
  };
}
