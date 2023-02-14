import Link from 'next/link';
import React from 'react';

import styles from './Main.module.scss';

const Main = () => {
    return (
        <section className={styles.main}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <h1 className={styles.left__header}>
                        <span>Blog</span> <br /> Landing Page 2023
                    </h1>
                    <p className={styles.left__descr}>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                    </p>
                    <Link href="/blogs">
                        <button className={styles.left__btn}>Read More</button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <figure>
                        <img className={styles.right__img} src="images/box_img.png" alt="video" />
                    </figure>
                </div>
            </div>
        </section>
    );
};

export default Main;
