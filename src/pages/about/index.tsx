import Head from 'next/head';
import React from 'react';

import styles from '@/styles/PageHeader.module.scss';
import About from '@/components/About';

const index = () => {
    return (
        <>
            <Head>
                <title>Contact me</title>
            </Head>
            <div className={styles.header}>
                <div className={styles.head__top}></div>
                <div className={styles.container}></div>
            </div>
            <About />
        </>
    );
};

export default index;
