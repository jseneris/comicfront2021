import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { ComicCard } from '../components/ComicCard';
import { PublisherCard } from '../components/PublisherCard';

import keys from '../config/keys';

export default function Home({ comics }) {
  return (
    <>
      <Head>
        <title>Closet Space Comics</title>
        <meta name="description" content="Closet Space Comics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <nav>date title</nav>
        <nav className={styles.filterNav}>
          <div className={styles.filter}>
            {comics.publishers.map((publisher) => {
              return <PublisherCard publisher={publisher} />;
            })}
          </div>
        </nav>
        <section className={styles.cards}>
          {comics.issues.map((comic) => {
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
  const res = await fetch(`${keys.comicApi}catalog/issue?date=2021-06-02`);
  const comics = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      comics,
    },
  };
}
