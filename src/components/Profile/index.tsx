import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

import styles from './Profile.module.scss';

const Profile: FC = () => {
    const router = useRouter();
    const [newName, setNewName] = useState(false);
    const { data: session } = useSession();

    const signOutHandler = () => {
        signOut({ callbackUrl: 'http://localhost:3000' });
    };

    return (
        <div className={styles.profile}>
            <div className={styles.container}>
                <div className={styles.left}>
                    {session?.user?.image ? <Image className={styles.avatar} src={session.user.image} alt={session.user.name!} width={160} height={160} /> : <Image src="/icons/userImage.svg" alt={session?.user?.name!} width={160} height={160} />}
                    <div>
                        <button className={styles.button}>Upload new photo</button>
                        <button className={`${styles.button} ${styles.logout}`} onClick={signOutHandler}>
                            Log Out
                        </button>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={`${styles.header} ${newName && styles.header__input}`}>
                        {newName ? (
                            <>
                                <svg onClick={() => setNewName((prev) => !prev)} className={`${styles.svg} ${styles.arrow}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 5L4.99998 19M5.00001 5L19 19" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}
                                </svg>
                                <input className={`${styles.input} ${styles.input__name}`} placeholder={session?.user?.name!} />
                            </>
                        ) : (
                            <h3 className={styles.name}>{session?.user?.name}</h3>
                        )}
                        {newName ? (
                            <svg className={styles.svg} fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z" fillRule="evenodd" />
                            </svg>
                        ) : (
                            <svg onClick={() => setNewName((prev) => !prev)} className={`${styles.svg} ${styles.edit}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </div>
                    <div className={styles.block}>
                        <label htmlFor="bio">About me</label>
                        <div className={styles.input__wrapper}>
                            <textarea name="bio" placeholder="My interests are:"></textarea>
                            <svg className={styles.svg} fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z" fillRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <label htmlFor="old_password">Change password:</label>
                        <div className={styles.input__wrapper}>
                            <input className={styles.input} type="password" name="old_password" placeholder="Old password"></input>
                            <div className={styles.plug}></div>
                        </div>
                        <div className={styles.input__wrapper}>
                            <input className={`${styles.input} ${styles.input__bottom}`} type="password" name="new_password" placeholder="New password"></input>
                            <svg className={styles.svg} fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z" fillRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
