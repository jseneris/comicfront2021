import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { AdminPublisherCard } from '../../../components/admin/AdminPublisherCard';
import IPublisher from '../../../interfaces/IPublisher';

const AdminPublisher = () => {
  const { user, error, isLoading } = useUser();
  const [publisherInfo, setPublisherInfo] = useState([] as IPublisher[]);

  const getPublishers = async () => {
    const res = await fetch(`/api/admin/publishers`);
    const data = await res.json();
    setPublisherInfo(data);
  };

  useEffect(() => {
    getPublishers();
  }, []);

  return (
    <>
      <div>hello</div>
      {publisherInfo.map((pub) => {
        return <AdminPublisherCard publisher={pub} />;
      })}
    </>
  );
};

export default AdminPublisher;
