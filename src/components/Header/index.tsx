import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import styles from './Header.module.scss';

const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
];

const Header = () => {
    const [active, setActive] = useState(false);

    const clickHandler = () => {
        setActive((prev) => (prev ? false : true));
    };

    useEffect(() => {
        active ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset');
    }, [active]);

    return (
        <header>
            <div className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <Link href="/">
                            <h2 className={styles.logo__text}>Blogger</h2>
                        </Link>
                    </div>
                    <div className={styles.navbar}>
                        <div className={`${styles.burger} ${active ? styles.active : ''}`} onClick={clickHandler}>
                            <span></span>
                        </div>
                        <ul className={`${styles.navbar__list} ${active ? styles.active__menu : ''}`}>
                            {active
                                ? navigationLinks.map((item, i) => (
                                      <li key={i} className={styles.navbar__item}>
                                          <Link className={styles.navbar__item_link} href={item.path} onClick={clickHandler}>
                                              {item.name}
                                          </Link>
                                      </li>
                                  ))
                                : navigationLinks.map((item, i) => (
                                      <li key={i} className={styles.navbar__item}>
                                          <Link className={styles.navbar__item_link} href={item.path}>
                                              {item.name}
                                          </Link>
                                      </li>
                                  ))}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
