import React from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSideProps, NextPage } from 'next';

import Profile from '@/components/Profile';

import styles from '@/styles/PageHeader.module.scss';

const ProfilePage: NextPage = () => {
    return (
        <>
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
