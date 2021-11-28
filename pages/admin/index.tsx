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

  return (
    <div>
      <div>{user && <a href="/admin/publishers">Publishers</a>}</div>
    </div>
  );
};

export default User;
