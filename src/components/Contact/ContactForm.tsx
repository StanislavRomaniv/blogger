import axios from 'axios';
import Image from 'next/image';
import { FormikHelpers, Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';

import styles from './Contact.module.scss';

interface Values {
    name: string;
    phone: string;
    email: string;
    message: string;
}

const ContactForm = () => {
    const phoneRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
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
        name: '',
        phone: '',
        email: '',
        message: '',
    };

    const validate = (values: Values) => {
        const errors: any = {};

        if (!values.name) {
            errors.name = 'Required';
        } else if (values.name.length < 5) {
            errors.name = 'Must be 5 characters or more';
        }

        if (!values.phone) {
            errors.phone = 'Required';
        } else if (!phoneRegEx.test(values.phone)) {
            errors.phone = 'Inavlid phone number';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!emailRegEx.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };

    const submitForm = (values: Values, helpers: FormikHelpers<typeof initialValues>) => {
        helpers.setSubmitting(true);

        axios({
            method: 'POST',
            url: '/api/contact-me',
            data: { ...values },
        })
            .then((res) => {
                setStatusMessage({
                    text: 'Thanks! We will call you in 24 hours!',
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
                          text: 'You`ve already sent a request!',
                          type: 'fault',
                      });
                helpers.resetForm();
                helpers.setSubmitting(false);
            });
    };

    return (
        <div>
            <Formik initialValues={initialValues} validate={validate} onSubmit={submitForm}>
                {({ values, errors, handleChange, isSubmitting }) => (
                    <Form className={styles.contact__form}>
                        <Field className={`${styles.contact__input} ${errors.name ? styles.contact__input_invalid : ''}`} type="text" name="name" placeholder="Name" />
                        {errors.name ? <div className={styles.contact__input_invalid_text}>{errors.name}</div> : ''}
                        <Field className={`${styles.contact__input} ${errors.phone ? styles.contact__input_invalid : ''}`} type="text" name="phone" placeholder="Phone Number" />
                        {errors.phone ? <div className={styles.contact__input_invalid_text}>{errors.phone}</div> : ''}
                        <Field className={`${styles.contact__input} ${errors.email ? styles.contact__input_invalid : ''}`} type="email" name="email" placeholder="Email" />
                        {errors.email ? <div className={styles.contact__input_invalid_text}>{errors.email}</div> : ''}
                        <textarea className={styles.contact__input} id="message" name="message" placeholder="Message" value={values.message} onChange={handleChange} />
                        {statusMessage.text && <div className={statusMessage.type === 'fault' ? styles.contact__fault : styles.contact__success}>{statusMessage.text}</div>}
                        <button type="submit" className={styles.contact__form_btn} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <svg width="18" height="18" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                                        <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
                                    </path>
                                </svg>
                            ) : (
                                'Contact me'
                            )}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ContactForm;
