import React from 'react';

import Contact from '@/components/Contact';

import styles from '@/styles/PageHeader.module.scss';

const Content = () => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.head__top}></div>
                <div className={styles.container}>
                    <div className={styles.main}>
                        <h1 className={styles.main__header}>
                            <span>Contact me</span>
                        </h1>
                        <p className={styles.main__descr}>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                        </p>
                    </div>
                </div>
            </div>
            <Contact />
        </>
    );
};

export default Content;
