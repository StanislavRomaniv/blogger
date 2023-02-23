import React from 'react';
import Skeleton from '@mui/material/Skeleton';

import styles from './Skeleton.module.scss';

const SkeletonAll = () => {
    return (
        <div className={styles.skeleton}>
            <div className={styles.row__text}>
                <Skeleton animation="wave" variant="rounded" style={{ backgroundColor: '#e5e5e5', height: 450 }} className={`${styles.item__big}`} />
                <Skeleton animation="wave" variant="rounded" style={{ backgroundColor: '#e5e5e5', height: 450 }} className={`${styles.item__big}`} />
            </div>
            <div className={styles.row__text}>
                <Skeleton animation="wave" variant="rounded" style={{ backgroundColor: '#e5e5e5', height: 450 }} className={`${styles.item__big}`} />
                <Skeleton animation="wave" variant="rounded" style={{ backgroundColor: '#e5e5e5', height: 450 }} className={`${styles.item__big}`} />
            </div>
            <div className={styles.row__text}>
                <Skeleton animation="wave" variant="rounded" style={{ backgroundColor: '#e5e5e5', height: 450 }} className={`${styles.item__big}`} />
                <Skeleton animation="wave" variant="rounded" style={{ backgroundColor: '#e5e5e5', height: 450 }} className={` ${styles.item__big}`} />
            </div>
        </div>
    );
};

export default SkeletonAll;
