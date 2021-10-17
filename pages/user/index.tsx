import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import keys from '../../config/keys';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

interface userInfo {
  userName: string;
  email: string;
}

const User = () => {
  const { user, error, isLoading } = useUser();
  const [userInfo, setUserinfo] = useState({} as userInfo);

  const getUser = async () => {
    const res = await fetch('http://localhost:3000/api/user/user');
    const data = await res.json();
    setUserinfo({
      userName: data.currentUser.userName,
      email: data.currentUser.email,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div>hello</div>
      {userInfo && (
        <div>
          <div>{userInfo.userName}</div>
          <div>{userInfo.email}</div>
        </div>
      )}
    </>
  );
};

export default User;
