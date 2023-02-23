import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FC, useRef, useState } from 'react';

import styles from './Comments.module.scss';

const NewComment: FC<{ onAddComment: Function }> = ({ onAddComment }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [isInvalid, setIsInvalid] = useState(false);

    const commentInputRef = useRef<HTMLTextAreaElement>(null);

    const sendCommentHandler = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!session) {
            router.replace('/auth');
            return;
        }

        const enteredComment = commentInputRef?.current?.value;

        if (!enteredComment || enteredComment.trim() === '') {
            setIsInvalid(true);
            return;
        }

        onAddComment({
            email: session.user.email,
            comment: enteredComment,
        });

        commentInputRef.current.value = '';
    };

    return (
        <form onSubmit={sendCommentHandler} className={styles.form}>
            <textarea className={styles.input} id="comment" placeholder="Your comment" rows={5} ref={commentInputRef}></textarea>
            {isInvalid && <p>Please enter a valid email address and comment!</p>}
            <button className={styles.btn}>Send</button>
        </form>
    );
};

export default NewComment;
