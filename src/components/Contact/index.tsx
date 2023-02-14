import React from 'react';

import ContactForm from './ContactForm';

import styles from './Contact.module.scss';

const Contact = () => {
    return (
        <div className={styles.contact}>
            <div className={styles.container}>
                <ContactForm />
            </div>
        </div>
    );
};

export default Contact;
