import React, { FC } from 'react';

import styles from './Header.module.scss';

interface HeaderDivivderType {
    title: string;
    descr: string;
}

const HeaderDivider: FC<HeaderDivivderType> = ({ title, descr }) => {
    return (
        <div className={styles.header__divider}>
            <h2 className={styles.header__divider_title}>{title}</h2>
            <p className={styles.header__divider_descr}>{descr}</p>
        </div>
    );
};

export default HeaderDivider;
