import React, { ReactElement } from 'react';

import Footer from '../Footer';
import Header from '../Header';

import styles from './Layout.module.scss';

const Layout = ({ children }: { children: ReactElement }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <Header />
                <>{children}</>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
