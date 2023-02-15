import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { Element, scroller } from 'react-scroll';
import ReactMarkdown from 'react-markdown';

import { BlogType, CommentType } from '@/redux/blogs/types';

import NewComment from '../Comments/NewComment';
import CommentList from '../Comments/CommentList';

import styles from './BlogPage.module.scss';

const BlogItemPage: FC<BlogType> = ({ id, img, title, author, descr, likes, date }) => {
    const router = useRouter();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getCommentList();
    }, []);

    useEffect(() => {
        if (router.query.target === 'commentsBlock') {
            setTimeout(() => {
                scroller.scrollTo('commentsBlock', {
                    duration: 400,
                    smooth: true,
                    offset: -100,
                });
            }, 100);
        }
    }, [router.query]);

    const backClickHandler = () => {
        router.back();
        router.beforePopState((state) => {
            state.options.scroll = false;
            return true;
        });
    };

    const getCommentList = async () => {
        const response = await axios(`/api/comments/${id}`).then((res) => res.data.data);
        response.length > 0 && setComments(response.reverse());
    };

    const onAddCommentHandler = async (comment: CommentType) => {
        await axios({
            method: 'POST',
            url: `/api/comments/${id}`,
            data: {
                ...comment,
            },
        })
            .then((res) => console.log(res))
            .catch((error) => console.log(error));

        await getCommentList();
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
                    <ReactMarkdown className={styles.blog__descr}>{descr}</ReactMarkdown>
                </div>
            </div>
            <div className={styles.blog__bottom}>
                <div className={styles.blog__nav}>
                    <span className={styles.blog__date}>{date}</span>
                    <button className={styles.blog__btn}>
                        <img src="/icons/like.svg" alt="like" width={32} height={32} />
                        <>{likes > 0 ? likes : ''}</>
                        <span>Like</span>
                    </button>
                    {/* <button className={styles.blog__btn}>
                        <img src="/icons/comment.svg" alt="comment" width={35} height={35} /> <span>Comment</span>
                    </button> */}
                </div>
            </div>
            <Element id="commentsBlock" name="commentsBlock">
                <div className={styles.blog__comments}>
                    <h3 className={styles.blog__comments_title}>Comments</h3>
                    <NewComment onAddComment={onAddCommentHandler} />
                    {comments.length > 0 ? <CommentList commentList={comments} /> : <span>No comments here yet</span>}
                </div>
            </Element>
        </div>
    );
};

export default BlogItemPage;
