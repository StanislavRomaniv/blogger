import React from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSideProps, NextPage } from 'next';

import Profile from '@/components/Profile';

import styles from '@/styles/PageHeader.module.scss';
import Head from 'next/head';

const ProfilePage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <div className={styles.header}>
                <div className={styles.head__top}></div>
            </div>
            <Profile />
        </>
    );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};
