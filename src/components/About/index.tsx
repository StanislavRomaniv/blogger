import { FC } from 'react';

import styles from './styles.module.scss';

const About: FC = () => {
    return (
        <div className={styles.about}>
            <div className={styles.about__header}>
                <img src="images/my_photo.png" alt={'myPhoto'} className={styles.about__img} />
                <div>
                    <div className={styles.about__name_wrapper}>
                        <h2 className={styles.about__name}>Stanislav Romaniv</h2>
                        <h3 className={styles.about__position}>Junior Front-end developer</h3>
                    </div>
                    <p className={styles.about__descr}>
                        Студент 2 курсу спеціальності Комп’ютерні науки. Самоорганізований та працьовитий розробник, зацікавлений у самостійному вирішенні складних задач. Успішно завершив декілька курсів та напрацював власне портфоліо із вивченими
                        технологіями
                    </p>
                </div>
            </div>
            <div className={styles.about__info}>
                <div className={styles.about__info_point}>
                    <h3 className={styles.about__point}>Education:</h3>
                    <div className={styles.about__point_descr}>Національний університет Львівська Політехніка</div>
                </div>
                <div className={styles.about__info_point}>
                    <h3 className={styles.about__point}>Email:</h3>
                    <div className={styles.about__point_descr}>stasrom17@gmail.com</div>
                </div>
                <div className={styles.about__info_point}>
                    <h3 className={styles.about__point}>Phone number:</h3>
                    <div className={styles.about__point_descr}>+38 066 843 6133</div>
                </div>
            </div>
        </div>
    );
};

export default About;
