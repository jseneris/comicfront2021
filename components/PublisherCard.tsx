import React from 'react';
import IPublisher from '../interfaces/IPublisher';
import styles from '../styles/publisher.module.css';
import keys from '../config/keys';

interface IPublisherCardProps {
  publisher: IPublisher;
}

export const PublisherCard = ({ publisher }: IPublisherCardProps) => {
  return (
    <div className={styles.card}>
      {publisher.imageName && (
        <div className={styles.image}>
          <img
            src={`${keys.azureCdnAddress}/publishers/${publisher.imageName}`}
            alt={publisher.name}
            title={publisher.name}
          />
        </div>
      )}
      <div className={styles.name}>{publisher.name}</div>
    </div>
  );
};
