import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { FC, useEffect, useState } from 'react';

import styles from './Blogs.module.scss';

export interface BlogItemType {
    id: string;
    img: string;
    title: string;
    author: string;
    descr: string;
    excerpt: string;
    totalLikes: number;
    usersLikes: { email: string }[];
    date: string;
}

export interface LikeType {
    isLiked: boolean;
    totalLikes: number;
}

const BlogItem: FC<BlogItemType> = ({ id, img, title, author, totalLikes, usersLikes, date, excerpt }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const email = typeof window !== 'undefined' && localStorage.getItem('user-email');

    const [isSending, setIsSending] = useState(false);
    const [likeData, setLikeData] = useState({
        isLiked: usersLikes.filter((item) => item.email === email).length > 0 ? true : false,
        totalLikes: totalLikes,
    });

    const shortDescr = excerpt.length > 180 ? excerpt.slice(0, 180) + '...' : excerpt;
    const formattedDate = new Date(date).toLocaleDateString('en', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    useEffect(() => {
        if (isSending) {
            sendLikeData(likeData);
        }
    }, [isSending, likeData]);

    const pageClickHandler = () => {
        router.push(`/blogs/${id}`);
    };

    const likeHandler = async () => {
        if (!session) {
            router.replace('/auth');
            return;
        }

        setIsSending(true);
        setLikeData((prev) => ({ totalLikes: prev.isLiked ? prev.totalLikes - 1 : prev.totalLikes + 1, isLiked: !prev.isLiked }));
    };

    const sendLikeData = async (likeData: LikeType) => {
        await axios({
            method: 'PATCH',
            url: `/api/likes/${id}`,
            data: {
                isLiked: likeData.isLiked,
                totalLikes: likeData.totalLikes,
                email: email,
            },
        });

        setIsSending(false);
    };

    return (
        <div className={styles.blog__item}>
            <div>
                <div className={styles.blog__item_img_wrapper}>
                    <Image src={img} alt={title} className={styles.blog__item_img} width={600} height={400} onClick={pageClickHandler} />
                </div>
                <div className={styles.blog__item_text}>
                    <div>
                        <div className={styles.blog__item_text_top}>
                            <h4 className={styles.blog__item_title} onClick={pageClickHandler}>
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
                <span className={styles.blog__item_date}>{formattedDate}</span>
                <div className={styles.blog__item_nav}>
                    <button onClick={likeHandler} className={styles.blog__item_btn}>
                        <svg className={likeData.isLiked && session ? `${styles.svg} ${styles.active}` : styles.svg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.8824 12.9557L10.5021 19.3071C11.2981 20.2067 12.7019 20.2067 13.4979 19.3071L19.1176 12.9557C20.7905 11.0649 21.6596 8.6871 20.4027 6.41967C18.9505 3.79992 16.2895 3.26448 13.9771 5.02375C13.182 5.62861 12.5294 6.31934 12.2107 6.67771C12.1 6.80224 11.9 6.80224 11.7893 6.67771C11.4706 6.31934 10.818 5.62861 10.0229 5.02375C7.71053 3.26448 5.04945 3.79992 3.59728 6.41967C2.3404 8.6871 3.20947 11.0649 4.8824 12.9557Z"
                                stroke={likeData.isLiked && session ? 'ff0000' : '#323232'}
                                strokeWidth="2"
                                strokeLinejoin="round"></path>
                        </svg>
                        <>{likeData.totalLikes > 0 ? <span>{likeData.totalLikes}</span> : ''}</>
                        <span>Like</span>
                    </button>
                    <Link
                        href={{
                            pathname: `/blogs/${id}`,
                            query: { target: 'commentsBlock' },
                        }}
                        className={styles.blog__item_btn}>
                        <img src="/icons/comment.svg" alt="comment" width={26} height={26} /> <span>Comment</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogItem;
