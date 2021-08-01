import React from 'react';
import IComic from '../interfaces/IComic';
import styles from '../styles/card.module.css';

interface IComicCardProps {
  comic: IComic;
}

export const ComicCard = ({ comic }: IComicCardProps) => {
  return (
    <div
      className={styles.card}
      key={`${comic.title.name} - ${comic.seoFriendlyName}`}
    >
      <div className={styles.image}>
        <img src={comic.imageUrl}></img>
      </div>
      <div className={styles.title}></div>
    </div>
  );
};
