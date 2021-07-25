import React from 'react';
import IPublisher from '../interfaces/IPublisher';
import styles from '../styles/publisher.module.css';
import keys from '../config/keys';

interface IPublisherCardProps {
  publisher: IPublisher;
  enabled: boolean;
  changeFilter?: (string) => void;
}

export const PublisherCard = ({
  publisher,
  enabled,
  changeFilter,
}: IPublisherCardProps) => {
  const { name, seoFriendlyName, imageName } = publisher;

  return (
    <div
      className={enabled ? styles.card : styles.inactive}
      onClick={() => changeFilter(seoFriendlyName)}
    >
      {publisher.imageName && (
        <div className={styles.image} key={seoFriendlyName}>
          <img
            src={`${keys.azureCdnAddress}/publishers/${imageName}`}
            alt={name}
            title={name}
          />
        </div>
      )}
      <div className={styles.name}>{name}</div>
    </div>
  );
};
