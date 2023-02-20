import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';

import { store } from '@/redux/store';
import Layout from '@/components/Layout';

import '@/styles/globals.css';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
    return (
        <SessionProvider refetchOnWindowFocus={true} session={pageProps.session}>
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </SessionProvider>
    );
};

export default App;
