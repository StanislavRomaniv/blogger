import React, { FC } from 'react';
import Image from 'next/image';

import styles from './BlogPage.module.scss';
import { useRouter } from 'next/router';
import { BlogItemType } from '../Blogs/BlogItem';

const BlogItemPage: FC<BlogItemType> = ({ id, img, title, author, descr, likes, date }) => {
    const router = useRouter();

    const backClickHandler = () => {
        router.back();
        router.beforePopState((state) => {
            state.options.scroll = false;
            return true;
        });
    };

    return (
        <div className={styles.blog}>
            <div className={styles.blog__text_top}>
                <button className={styles.blog__btn_back} onClick={backClickHandler}>
                    Go back
                </button>
                <h4 className={styles.blog__title}>{title}</h4>
                <span className={styles.blog__author}>Post By: {author}</span>
            </div>
            <div className={styles.blog__content}>
                <div className={styles.blog__img_wrapper}>
                    <Image src={img} alt={title} className={styles.blog__img} width={1000} height={660} />
                </div>
                <div className={styles.blog__text}>
                    <p className={styles.blog__descr}>{descr}</p>
                </div>
            </div>
            <div className={styles.blog__bottom}>
                <span className={styles.blog__date}>{date}</span>
                <div className={styles.blog__nav}>
                    <button className={styles.blog__btn}>
                        <img src="/icons/like.svg" alt="like" width={32} height={32} />
                        <>{likes > 0 ? likes : ''}</>
                        <span>Like</span>
                    </button>
                    <button className={styles.blog__btn}>
                        <img src="/icons/comment.svg" alt="comment" width={35} height={35} /> <span>Comment</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogItemPage;
