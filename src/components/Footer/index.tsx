import React from 'react';

import styles from './Footer.module.scss';
import Link from 'next/link';

const socialList = [
    { name: 'Instagram', src: '/icons/instagram.svg', path: 'https://instagram.com/stanislavvvromaniv' },
    { name: 'Telegram', src: '/icons/telegram.svg', path: 'https://t.me/s0nch1kk' },
    { name: 'LinkedIn', src: '/icons/linkedin.svg', path: 'https://linkedin.com/in/stanislav-romaniv-a54aaa244/' },
];

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <ul className={styles.footer__top}>
                {socialList.map((item, i) => (
                    <a key={i} href={item.path}>
                        <li>
                            <img src={item.src} alt={item.name} />
                        </li>
                    </a>
                ))}
            </ul>
            <div className={styles.footer__bottom}>
                <span>
                    © 2023 All Rights Reserved. Developed by <Link href={'/about'}>Stanislav Romaniv</Link>
                    {/* <a href="https://github.com/StanislavRomaniv">Stanislav Romaniv</a> */}
                </span>
            </div>
        </footer>
    );
};

export default Footer;
