import React, { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from './Blogs.module.scss';

export interface BlogItemType {
    id: string;
    img: string;
    title: string;
    author: string;
    descr: string;
    likes: number;
    date: string;
}

const BlogItem: FC<BlogItemType> = ({ id, img, title, author, descr, likes, date }) => {
    const router = useRouter();
    const shortDescr = descr.length > 170 ? descr.slice(0, 170) + '...' : descr;

    const clickHandler = () => {
        router.push(`/blogs/${id}`);
    };

    return (
        <div className={styles.blog__item}>
            <div>
                <div className={styles.blog__item_img_wrapper}>
                    <Image src={img} alt={title} className={styles.blog__item_img} width={600} height={400} onClick={clickHandler} />
                </div>
                <div className={styles.blog__item_text}>
                    <div>
                        <div className={styles.blog__item_text_top}>
                            <h4 className={styles.blog__item_title} onClick={clickHandler}>
                                {title}
                            </h4>
                            <span className={styles.blog__item_author}>Post By: {author}</span>
                        </div>
                        <div className={styles.blog__item_text_bottom}>
                            <p className={styles.blog__item_descr}>{shortDescr}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.blog__item_bottom}>
                <span className={styles.blog__item_date}>{date}</span>
                <div className={styles.blog__item_nav}>
                    <button className={styles.blog__item_btn}>
                        <img src="/icons/like.svg" alt="like" width={24} height={24} />
                        <>{likes > 0 ? likes : ''}</>
                        <span>Like</span>
                    </button>
                    <button className={styles.blog__item_btn}>
                        <img src="/icons/comment.svg" alt="comment" width={26} height={26} /> <span>Comment</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogItem;