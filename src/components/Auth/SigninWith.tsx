import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

import styles from './Auth.module.scss';

const list = [
    { name: 'Google', img: '/icons/google.svg', className: styles.google, provider: 'google' },
    { name: 'GitHub', img: '/icons/github.svg', className: styles.github, provider: 'github' },
    { name: 'Facebook', img: '/icons/facebook.svg', className: styles.facebook, provider: 'facebook' },
];

const signinWithHandler = (provider: string) => {
    signIn(provider, { callbackUrl: 'http://localhost:3000' });
};

const SigninWith = () => {
    return (
        <ul className={styles.sigup__with_list}>
            {list.map((item, i) => (
                <li key={i} onClick={() => signinWithHandler(item.provider)} className={`${styles.sigup__with_item} ${item.className}`}>
                    <Image src={item.img} alt={item.name} width={30} height={30} />
                    <span>{item.name}</span>
                </li>
            ))}
        </ul>
    );
};

export default SigninWith;
