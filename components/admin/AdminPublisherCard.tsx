import React, { useState } from 'react';
import IPublisher from '../../interfaces/IPublisher';
import keys from '../../config/keys';
import FileUpload from '../FileUpload';

interface IPublisherCardProps {
  publisher: ITempPublisher;
}

interface ITempPublisher {
  name: string;
  seoFriendlyName: string;
  imageName?: string;
}

export const AdminPublisherCard = ({ publisher }: IPublisherCardProps) => {
  const { name, seoFriendlyName, imageName } = publisher;
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  });
  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic to create new user...
  };

  return (
    <div>
      {/* {publisher.imageName && (
        <div className="" key={seoFriendlyName}>
          { <img
            src={`${keys.azureCdnAddress}/publishers/${imageName}`}
            alt={name}
            title={name}
          /> *
        </div>
      )} */}
      <div className="">{name}</div>
      {imageName ? (
        <img
          src={`${keys.azureCdnAddress}/publishers/${imageName}`}
          alt={name}
          title={name}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <FileUpload
            accept=".jpg,.png,.jpeg"
            label="Profile Image(s)"
            multiple
            updateFilesCb={updateUploadedFiles}
          />
        </form>
      )}
    </div>
  );
};
