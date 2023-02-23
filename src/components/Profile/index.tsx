import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

import styles from './Profile.module.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { setAbout, setName } from '@/redux/user/slice';
import { userSelector } from '@/redux/user/selectors';

const Profile: FC = () => {
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const [newName, setNewName] = useState(false);
    const [username, setUserName] = useState(session?.user?.name);
    const [aboutText, setAboutText] = useState(session?.user?.about);
    const [statusMessage, setStatusMessage] = useState({
        text: '',
        type: '',
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
    });
    const { name, about } = useSelector(userSelector);

    useEffect(() => {
        name && setUserName(name);
        about && setAboutText(about);
        // axios.get('/api/user/change-name').then((res) => setName(res.data.name));
    }, []);

    useEffect(() => {
        if (statusMessage.text) {
            const timer = setTimeout(() => {
                setStatusMessage({
                    text: '',
                    type: '',
                });
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }

        return;
    }, [statusMessage]);

    const signOutHandler = () => {
        localStorage.removeItem('user-email');
        signOut({ callbackUrl: 'http://localhost:3000' });
    };

    const closeNameInputHandler = () => {
        setUserName(session?.user?.name);
        setNewName((prev) => !prev);
    };

    const confirmNameChange = () => {
        axios({
            method: 'PATCH',
            url: '/api/user/change-name',
            data: {
                email: session?.user?.email,
                name: username,
            },
        })
            .then((res) => {
                setNewName((prev) => !prev);
                dispatch(setName(username!));
                // axios('/api/;auth/session');
            })
            .catch((error) => setUserName(session?.user?.name));
    };

    const confirmAboutChange = () => {
        axios({
            method: 'PATCH',
            url: '/api/user/change-about',
            data: {
                email: session?.user?.email,
                about: aboutText,
            },
        })
            .then((res) => {
                dispatch(setAbout(aboutText!));
                // axios('/api/auth/session');
            })
            .catch((error) => setAboutText(''));
    };

    const confirmPasswordChange = () => {
        axios({
            method: 'PATCH',
            url: '/api/user/change-password',
            data: {
                email: session?.user?.email,
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword,
            },
        })
            .then((res) => {
                setPasswordData({
                    oldPassword: '',
                    newPassword: '',
                });
                setStatusMessage({
                    type: 'success',
                    text: res.data,
                });
            })
            .catch((error) => {
                setPasswordData({
                    oldPassword: '',
                    newPassword: '',
                });

                setStatusMessage({
                    type: 'fault',
                    text: error.response.data,
                });
            });
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
                                <svg onClick={closeNameInputHandler} className={`${styles.svg} ${styles.arrow}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 5L4.99998 19M5.00001 5L19 19" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}
                                </svg>
                                <input onChange={(e) => setUserName(e.target.value)} value={username!} className={`${styles.input} ${styles.input__name} ${username?.length! < 5 && styles.input__invalid}`} placeholder="New name" />
                            </>
                        ) : (
                            <h3 className={styles.name}>{username}</h3>
                        )}
                        {newName ? (
                            <button onClick={confirmNameChange} disabled={username?.length! < 5} className={styles.confirm}>
                                <svg className={styles.svg} fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z" fillRule="evenodd" />
                                </svg>
                            </button>
                        ) : (
                            <svg onClick={() => setNewName((prev) => !prev)} className={`${styles.svg} ${styles.edit}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </div>
                    <div className={styles.block}>
                        <label htmlFor="bio">About me</label>
                        <div className={styles.input__wrapper}>
                            <textarea onChange={(e) => setAboutText(e.target.value)} value={aboutText} name="bio" placeholder="My interests are:"></textarea>
                            <button onClick={confirmAboutChange} className={styles.confirm}>
                                <svg className={styles.svg} fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z" fillRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <label htmlFor="old_password">Change password:</label>
                        <div className={styles.input__wrapper}>
                            <input
                                onChange={(e) => setPasswordData((prev) => ({ ...prev, oldPassword: e.target.value }))}
                                value={passwordData.oldPassword}
                                className={styles.input}
                                type="password"
                                name="old_password"
                                placeholder="Old password"></input>
                            <div className={styles.plug}></div>
                        </div>
                        <div className={styles.input__wrapper}>
                            <input
                                onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                                value={passwordData.newPassword}
                                className={`${styles.input} ${styles.input__bottom} ${passwordData.newPassword.length! < 7 && passwordData.newPassword.length !== 0 && styles.input__invalid}`}
                                type="password"
                                name="new_password"
                                placeholder="New password"></input>
                            <button onClick={confirmPasswordChange} className={styles.confirm} disabled={passwordData.newPassword.length! < 7}>
                                <svg className={styles.svg} fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z" fillRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {statusMessage.text && <div className={statusMessage.type === 'fault' ? styles.fault : styles.success}>{statusMessage.text}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
