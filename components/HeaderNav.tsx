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
      <div>Collection Account</div>
      <div>
        {!user && <a href="/api/auth/login">Login</a>}
        {user && <a href="/api/auth/logout">Logout</a>}
      </div>
    </div>
  );
};
