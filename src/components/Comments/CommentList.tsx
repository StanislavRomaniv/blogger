import React, { FC } from 'react';

import { CommentType } from '@/redux/blogs/types';

import styles from './Comments.module.scss';

const CommentList: FC<{ commentList: CommentType[] }> = ({ commentList }) => {
    return (
        <div>
            <ul className={styles.list}>
                {commentList.map((comment) => (
                    <li key={comment.id} className={styles.list__item}>
                        <p className={styles.list__item_text}>{comment.comment}</p>
                        <span className={styles.list__item_author}>
                            <i>By {comment.name}</i>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
