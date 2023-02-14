import React, { ChangeEvent, FC, useRef, useState } from 'react';

import styles from './Comments.module.scss';

const NewComment: FC<{ onAddComment: Function }> = ({ onAddComment }) => {
    const [isInvalid, setIsInvalid] = useState(false);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const commentInputRef = useRef<HTMLTextAreaElement>(null);

    function sendCommentHandler(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        const enteredEmail = emailInputRef?.current?.value;
        const enteredName = nameInputRef?.current?.value;
        const enteredComment = commentInputRef?.current?.value;

        if (!enteredEmail || enteredEmail.trim() === '' || !enteredEmail.includes('@') || !enteredName || enteredName.trim() === '' || !enteredComment || enteredComment.trim() === '') {
            setIsInvalid(true);
            return;
        }

        onAddComment({
            email: enteredEmail,
            name: enteredName,
            comment: enteredComment,
        });

        emailInputRef.current.value = '';
        nameInputRef.current.value = '';
        commentInputRef.current.value = '';
    }

    return (
        <form onSubmit={sendCommentHandler} className={styles.form}>
            <div className={styles.row}>
                <input className={styles.input} type="email" id="email" placeholder="Email" ref={emailInputRef} />
                <input className={styles.input} type="text" id="name" placeholder="Name" ref={nameInputRef} />
            </div>
            <textarea className={styles.input} id="comment" placeholder="Your comment" rows={5} ref={commentInputRef}></textarea>
            {isInvalid && <p>Please enter a valid email address and comment!</p>}
            <button className={styles.btn}>Send</button>
        </form>
    );
};

export default NewComment;
