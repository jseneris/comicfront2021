import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { ComicCard } from '../components/ComicCard';
import { PublisherCard } from '../components/PublisherCard';
import { Modal } from '../components/Modal';
import { useUser } from '@auth0/nextjs-auth0';

import keys from '../config/keys';
import getWednesday from '../utils/getWednesday';

export default function Home({ comics }) {
  const { user, error, isLoading } = useUser();
  const [filterList, setFilterList] = useState([]);
  const [filterDate, setFilterDate] = useState(getWednesday());
  const [comicList, setComicList] = useState(comics.issues);
  const [publisherList, setPublisherList] = useState(comics.publishers);
  const [showModal, setShowModal] = useState(false);
  const [currentIssue, setCurrentIssue] = useState(null);

  useEffect(() => {
    (async () => {})();
  }, [filterDate]);

  useEffect(() => {
    const newList = comicList.filter((comic) => {
      if (
        filterList.length === 0 ||
        (comic.title.publisher != null &&
          filterList.indexOf(comic.title.publisher.seoFriendlyName) > -1)
      )
        return comic;
    });

    setComicList(newList);
  }, [filterList]);

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleDateEnter = async (e) => {
    if (e.key === 'Enter') {
      setComicList(null);

      const res = await fetch(
        `${keys.comicApi}catalog/weekly?date=${filterDate}`
      );
      const comics = await res.json();
      setComicList(comics);
    }
  };

  const updateFilter = (value) => {
    if (filterList.find((element) => element === value)) {
      setFilterList(filterList.filter((element) => element !== value));
    } else {
      setFilterList([...filterList, value]);
    }
  };

  const showIssueModal = (title, issue) => {
    const currentIssue = comicList.find(
      (x) => x.title.name === title && x.seoFriendlyName === issue
    );
    setCurrentIssue(currentIssue);
    setShowModal(true);
  };

  const changeCurrentIssue = (offset) => {
    const newCurrentIssue = comicList.indexOf(currentIssue);
    setCurrentIssue(comicList[newCurrentIssue + offset]);
  };

  return (
    <>
      <Head>
        <title>Closet Space Comics</title>
        <meta name="description" content="Closet Space Comics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!user && <a href="/api/auth/login">Login</a>}
        {user && <a href="/api/auth/logout">Logout</a>}
        <div id="modal-root"></div>
        <Modal onClose={() => setShowModal(false)} show={showModal}>
          {currentIssue && currentIssue.title && (
            <div className={styles.modalContent}>
              <div onClick={() => changeCurrentIssue(-1)}>prev</div>
              <div>
                <img
                  className={styles.focusImg}
                  src={currentIssue.imageUrl}
                ></img>
              </div>
              <div>
                <h3>
                  <a
                    href={`/catalog/${currentIssue.title.publisher.seoFriendlyName}/${currentIssue.title.seoFriendlyName}/${currentIssue.seoFriendlyName}`}
                  >
                    {`${currentIssue.title ? currentIssue.title.name : ''} ${
                      currentIssue.seoFriendlyName
                    }`}
                  </a>
                </h3>
              </div>
              <div onClick={() => changeCurrentIssue(1)}>next</div>
            </div>
          )}
        </Modal>
        <nav className={styles.searchNav}>
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
            {publisherList.map((publisher) => {
              return (
                <PublisherCard
                  publisher={publisher}
                  enabled={
                    filterList.length === 0
                      ? true
                      : filterList.find(
                          (element) => element === publisher.seoFriendlyName
                        )
                      ? true
                      : false
                  }
                  changeFilter={updateFilter}
                />
              );
            })}
          </div>
        </nav>
        <section className={styles.content}>
          <div className={styles.cards}>
            {comicList.map((comic) => {
              return <ComicCard comic={comic} handleClick={showIssueModal} />;
            })}
          </div>
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
    `${keys.comicApi}catalog/weekly?date=${getWednesday()}`
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
