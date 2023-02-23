import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Element, scroller } from 'react-scroll';
import ReactMarkdown from 'react-markdown';

import { CommentType } from '@/redux/blogs/types';
import { BlogItemType, LikeType } from '../Blogs/BlogItem';

import NewComment from '../Comments/NewComment';
import CommentList from '../Comments/CommentList';

import styles from './BlogPage.module.scss';
import { useSession } from 'next-auth/react';

const BlogItemPage: FC<BlogItemType> = (props) => {
    const router = useRouter();
    const { data: session } = useSession();

    const [blog, setBlog] = useState(props);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');
    const [isSending, setIsSending] = useState(false);
    const email = typeof window !== 'undefined' && localStorage.getItem('user-email');

    const [likeData, setLikeData] = useState({
        isLiked: blog.usersLikes.filter((item) => item.email === email).length > 0 ? true : false,
        totalLikes: blog.totalLikes,
    });

    const formattedDate = new Date(blog.date).toLocaleDateString('en', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    useEffect(() => {
        // if (localStorage.getItem('like-data')) {
        //     setLikeData(JSON.parse(localStorage.getItem('like-data') || ''));
        // }

        getCommentList();

        // return () => {
        //     localStorage.removeItem('like-data');
        // };
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

    useEffect(() => {
        if (isSending) {
            sendLikeData(likeData);
        }
    }, [isSending, likeData]);

    const backClickHandler = () => {
        router.back();
        router.beforePopState((state) => {
            state.options.scroll = false;
            return true;
        });
    };

    const getCommentList = async () => {
        const response = await axios(`/api/blogs/${blog.id}`).then((res) => res.data.data);
        response.comments.length > 0 && setComments(response.comments.reverse());
        setBlog(response);
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
        // localStorage.setItem('like-data', JSON.stringify(likeData));

        console.log('work', likeData);

        await axios({
            method: 'PATCH',
            url: `/api/likes/${blog.id}`,
            data: {
                isLiked: likeData.isLiked,
                totalLikes: likeData.totalLikes,
                email: email,
            },
        });

        console.log('sending');

        setIsSending(false);
    };

    const onAddCommentHandler = async (comment: CommentType) => {
        await axios({
            method: 'POST',
            url: `/api/comments/${blog.id}`,
            data: {
                ...comment,
            },
        }).catch((error) => setError('Something went wrong. Please try again later!'));

        await getCommentList();
    };

    return (
        <div className={styles.blog}>
            {error ? (
                <span className={styles.blog__author}>{error}</span>
            ) : (
                <>
                    <div className={styles.blog__text_top}>
                        <button className={styles.blog__btn_back} onClick={backClickHandler}>
                            Go back
                        </button>
                        <h4 className={styles.blog__title}>{blog.title}</h4>
                        <span className={styles.blog__author}>Post By: {blog.author}</span>
                    </div>
                    <div className={styles.blog__content}>
                        <div className={styles.blog__img_wrapper}>
                            <Image src={blog.img} alt={blog.title} className={styles.blog__img} width={1000} height={660} />
                        </div>
                        <div className={styles.blog__text}>
                            <ReactMarkdown className={styles.blog__descr}>{blog.descr}</ReactMarkdown>
                        </div>
                    </div>
                    <div className={styles.blog__bottom}>
                        <div className={styles.blog__nav}>
                            <span className={styles.blog__date}>{formattedDate}</span>
                            <button disabled={isSending} onClick={likeHandler} className={styles.blog__btn}>
                                <svg className={likeData.isLiked && session ? styles.active : ''} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.8824 12.9557L10.5021 19.3071C11.2981 20.2067 12.7019 20.2067 13.4979 19.3071L19.1176 12.9557C20.7905 11.0649 21.6596 8.6871 20.4027 6.41967C18.9505 3.79992 16.2895 3.26448 13.9771 5.02375C13.182 5.62861 12.5294 6.31934 12.2107 6.67771C12.1 6.80224 11.9 6.80224 11.7893 6.67771C11.4706 6.31934 10.818 5.62861 10.0229 5.02375C7.71053 3.26448 5.04945 3.79992 3.59728 6.41967C2.3404 8.6871 3.20947 11.0649 4.8824 12.9557Z"
                                        stroke={likeData.isLiked && session ? 'ff0000' : '#323232'}
                                        strokeWidth="2"
                                        strokeLinejoin="round"></path>
                                </svg>
                                <>{likeData.totalLikes > 0 ? <span>{likeData.totalLikes}</span> : ''}</>
                                <span>Like</span>
                            </button>
                        </div>
                    </div>
                    <Element id="commentsBlock" name="commentsBlock">
                        <div className={styles.blog__comments}>
                            <h3 className={styles.blog__comments_title}>Comments</h3>
                            <NewComment onAddComment={onAddCommentHandler} />
                            {comments.length > 0 ? <CommentList commentList={comments} /> : <span>No comments here yet</span>}
                        </div>
                    </Element>
                </>
            )}
        </div>
    );
};

export default BlogItemPage;

/*

    const likeRef = useRef<{
    isLiked: boolean;
    totalLikes: number;
    }>(likeData);

    useEffect(() => {
        if (localStorage.getItem('like-data')) {
            setLikeData(JSON.parse(localStorage.getItem('like-data') || ''));
        }
        // setLikeData((prev) => ({ ...prev, isLiked: usersLikes.map((item) => item.email === session?.user.email).length > 0 ? true : false }));

        return () => {
            if (likeRef.current.isLiked) {
                console.log('likeData', likeRef.current);
                console.log('email', session?.user.email);
                const likeLS = JSON.parse(localStorage.getItem('like-data')!);
                axios({
                    method: 'PATCH',
                    url: `/api/likes/${id}`,
                    data: {
                        isLiked: likeLS.isLiked,
                        totalLikes: likeLS.totalLikes,
                        email: session?.user?.email,
                    },
                });
                localStorage.removeItem('like-data');
            } else {
                console.log('likeData', likeRef.current);
                console.log('email', session?.user.email);
                const likeLS = JSON.parse(localStorage.getItem('like-data') || '');
                axios({
                    method: 'PATCH',
                    url: `/api/likes/${id}`,
                    data: {
                        isLiked: likeLS.isLiked,
                        totalLikes: likeLS.totalLikes,
                        email: session?.user.email,
                    },
                });
                localStorage.removeItem('like-data');
            }
        };
    }, []);

    useEffect(() => {
        console.log(likeData.isLiked);
        likeRef.current = likeData;
        localStorage.setItem('like-data', JSON.stringify({ ...likeData, email: session?.user?.email }));
    }, [likeData]);

*/
