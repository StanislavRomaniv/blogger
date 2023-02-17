import axios from 'axios';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';

import styles from './Auth.module.scss';

export interface LoginValues {
    email: string;
    password: string;
}

const LoginForm = () => {
    const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const [statusMessage, setStatusMessage] = useState({
        text: '',
        type: '',
    });

    useEffect(() => {
        if (statusMessage.text) {
            const timer = setTimeout(() => {
                setStatusMessage({
                    text: '',
                    type: '',
                });
            }, 4000);

            return () => {
                clearTimeout(timer);
            };
        }

        return;
    }, [statusMessage]);

    const initialValues = {
        email: '',
        password: '',
    };

    const validate = (values: LoginValues) => {
        const errors: any = {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (!emailRegEx.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 7) {
            errors.password = 'Must be 7 characters or more';
        }

        return errors;
    };

    const submitForm = (values: LoginValues, helpers: FormikHelpers<typeof initialValues>) => {
        helpers.setSubmitting(true);

        axios({
            method: 'POST',
            url: '/api/auth/signup',
            data: { ...values },
        })
            .then((res) => {
                setStatusMessage({
                    text: 'You`re successfully signed up!',
                    type: 'success',
                });
                helpers.resetForm();
                helpers.setSubmitting(false);
            })
            .catch((error) => {
                error.response.status === 500
                    ? setStatusMessage({
                          text: 'Something went wrong. Please try again later',
                          type: 'fault',
                      })
                    : setStatusMessage({
                          text: 'Please enter proper values!',
                          type: 'fault',
                      });
                helpers.resetForm();
                helpers.setSubmitting(false);
            });
    };

    return (
        <Formik initialValues={initialValues} validate={validate} onSubmit={submitForm}>
            {({ errors, isSubmitting }) => (
                <Form className={styles.form}>
                    <Field className={`${styles.input} ${errors.email ? styles.input_invalid : ''}`} type="email" name="email" placeholder="Email" />
                    {errors.email ? <div className={styles.input_invalid_text}>{errors.email}</div> : ''}
                    <Field className={`${styles.input} ${errors.password ? styles.input_invalid : ''}`} type="password" name="password" placeholder="Password" />
                    {errors.password ? <div className={styles.input_invalid_text}>{errors.password}</div> : ''}
                    {statusMessage.text && <div className={statusMessage.type === 'fault' ? styles.fault : styles.success}>{statusMessage.text}</div>}
                    <button type="submit" className={styles.form__btn} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <svg width="18" height="18" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                                    <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
                                </path>
                            </svg>
                        ) : (
                            'Log In'
                        )}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
