import React from 'react';

import styles from './Footer.module.scss';

const socialList = [
    { name: 'Instagram', src: '/icons/instagram.svg' },
    { name: 'Telegram', src: '/icons/telegram.svg' },
    { name: 'LinkedIn', src: '/icons/linkedin.svg' },
];

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <ul className={styles.footer__top}>
                {socialList.map((item, i) => (
                    <li key={i}>
                        <img src={item.src} alt={item.name} />
                    </li>
                ))}
            </ul>
            <div className={styles.footer__bottom}>
                <span>
                    © 2023 All Rights Reserved. Developed by <a href="https://github.com/StanislavRomaniv">Stanislav Romaniv</a>
                </span>
            </div>
        </footer>
    );
};

export default Footer;
