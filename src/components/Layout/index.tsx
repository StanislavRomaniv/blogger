import { Session } from 'next-auth';
import React, { ReactElement } from 'react';

import Footer from '../Footer';
import Header from '../Header';

const Layout = ({ children }: { children: ReactElement }) => {
    return (
        <div>
            <Header />
            <>{children}</>
            <Footer />
        </div>
    );
};

export default Layout;
