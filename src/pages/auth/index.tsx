import React from 'react';

import Auth from '@/components/Auth';

import styles from '@/styles/PageHeader.module.scss';

const AuthPage = () => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.head__top}></div>
                <div className={styles.container}></div>
            </div>
            <Auth />
        </>
    );
};

export default AuthPage;
