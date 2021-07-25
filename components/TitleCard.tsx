import React from 'react';
import ITitle from '../interfaces/ITitle';
import styles from '../styles/card.module.css';

interface ITitleCardProps {
  title: ITitle;
}

export const TitleCard = ({ title }: ITitleCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={title.firstIssue.imageUrl}></img>
      </div>
      <div className={styles.title}>
        {title.name} - {title.seoFriendlyName}
      </div>
    </div>
  );
};
