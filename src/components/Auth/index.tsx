import React, { useState } from 'react';

import styles from './Auth.module.scss';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SignupWith from './SignupWith';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className={styles.auth}>
            <div className={styles.auth__left}>
                <div className={styles.form__container}>
                    <div className={styles.form__wrapper}>
                        <div className={styles.form__text}>
                            <div className={styles.form__text_text}>{isLogin ? 'Log into your account' : 'Create a new account'}</div>
                            <span>or</span>
                            <div className={styles.form__text_button} onClick={() => setIsLogin((prev) => !prev)}>
                                {isLogin ? 'Create a new account' : 'Log into your account'}
                            </div>
                        </div>
                        {isLogin ? <LoginForm /> : <SignupForm />}
                    </div>
                    <div className={styles.form__wrapper}>
                        <div className={`${styles.form__text} ${styles.white}`}>
                            <div className={styles.form__text_text}>Sign Up with:</div>
                        </div>
                        <SignupWith />
                    </div>
                </div>
            </div>
            <div className={styles.auth__right}></div>
        </div>
    );
};

export default Auth;
