import React from 'react';
import Skeleton from '@mui/material/Skeleton';

import styles from './Skeleton.module.scss';

const SkeletonComponent = () => {
    return (
        <div className={styles.skeleton}>
            <Skeleton animation="wave" variant="rounded" className={`${styles.item} ${styles.button}`} />
            <Skeleton animation="wave" variant="rounded" className={`${styles.item} ${styles.header}`} />
            <Skeleton animation="wave" variant="rounded" className={`${styles.item} ${styles.author}`} />
            <div className={styles.row__text}>
                <Skeleton animation="wave" variant="rounded" style={{ backgroundColor: '#e5e5e5' }} className={`${styles.item} ${styles.img}`} />
                <Skeleton animation="wave" variant="rounded" style={{ backgroundColor: '#e5e5e5' }} className={`${styles.item} ${styles.text__top}`} />
            </div>
            <div className={styles.row}>
                <Skeleton animation="wave" variant="rounded" className={`${styles.item} ${styles.text__bottom}`} />
            </div>
            <div className={styles.row}>
                <Skeleton animation="wave" variant="rounded" className={`${styles.item} ${styles.small}`} />
                <Skeleton animation="wave" variant="rounded" className={`${styles.item} ${styles.small}`} />
            </div>
            <h3 className={styles.title}>Comments</h3>
            <div className={styles.row__input}>
                <div className={styles.row}>
                    <Skeleton animation="wave" variant="rounded" className={`${styles.item} ${styles.input}`} />
                    <Skeleton animation="wave" variant="rounded" className={`${styles.item} ${styles.input}`} />
                </div>
                <Skeleton animation="wave" variant="rounded" className={`${styles.item} ${styles.input__big}`} />
            </div>
            <div className={styles.row}>
                <Skeleton animation="wave" variant="rounded" className={`${styles.item} ${styles.comments}`} />
            </div>
        </div>
    );
};

export default SkeletonComponent;
