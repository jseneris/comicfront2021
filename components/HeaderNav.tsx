import React from 'react';
import styles from '../styles/HeaderNav.module.css';
import { useUser } from '@auth0/nextjs-auth0';

export const HeaderNav = () => {
  const { user, error, isLoading } = useUser();

  return (
    <div className={styles.main}>
      <div>
        <a>Home</a>
      </div>
      <div>{user && <a href="/api/auth/logout">Collection</a>}</div>
      <div>{user && <a href="/user">Account</a>}</div>
      <div>{user && <a href="/admin">Admin</a>}</div>
      <div>
        {!user && <a href="/api/auth/login">Login</a>}
        {user && <a href="/api/auth/logout">Logout</a>}
      </div>
    </div>
  );
};
