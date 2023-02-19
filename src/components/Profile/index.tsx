import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

import styles from './Profile.module.scss';

const Profile: FC = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const signOutHandler = () => {
        signOut({ callbackUrl: 'http://localhost:3000' });
    };

    return (
        <div className={styles.profile}>
            <div className={styles.container}>
                <div className={styles.left}>
                    {session?.user?.image ? <Image src={session.user.image} alt={session.user.name!} width={150} height={150} /> : <Image src="/icons/userImage.svg" alt={session?.user?.name!} width={150} height={150} />}
                    <button className={styles.button}>Upload photo</button>
                </div>
                <div className={styles.right}>
                    <div className={styles.header}>
                        <h3 className={styles.name}>{session?.user?.name}</h3>
                        <svg className={`${styles.svg} ${styles.edit}`} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className={styles.block}>
                        <label htmlFor="bio">About me</label>
                        <div className={styles.input}>
                            <textarea name="bio" placeholder="My interests are:"></textarea>
                            <svg className={styles.svg} fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z" fill-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <label htmlFor="old_password">Change password:</label>
                        <div className={styles.input}>
                            <input type="password" name="old_password" placeholder="Old password"></input>
                        </div>
                        <div className={styles.input}>
                            <input className={styles.input__bottom} type="password" name="new_password" placeholder="New password"></input>
                            <svg className={styles.svg} fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z" fill-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <button onClick={signOutHandler}>Log Out</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
