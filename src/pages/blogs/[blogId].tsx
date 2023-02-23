import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { connectToCollection, createClient } from '@/utils/db-util';

import { BlogType } from '@/redux/blogs/types';

import BlogItemPage from '@/components/BlogPage';
import SkeletonPage from '@/components/Skeleton/SkeletonPage';

import styles from '@/styles/PageHeader.module.scss';

interface BlogPageType {
    blogItem: BlogType;
}

const BlogPage: FC<BlogPageType> = ({ blogItem }) => {
    return (
        <>
            <div className={styles.header}>
                <div className={`${styles.head__top} ${styles.head__top_page}`}></div>
            </div>
            {blogItem ? (
                <BlogItemPage
                    id={blogItem.id}
                    img={blogItem.img}
                    title={blogItem.title}
                    author={blogItem.author}
                    descr={blogItem.descr}
                    excerpt={blogItem.excerpt}
                    date={blogItem.date}
                    totalLikes={blogItem.totalLikes}
                    usersLikes={blogItem.usersLikes}
                />
            ) : (
                <SkeletonPage />
            )}
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.blogId;
    const client = await createClient();
    const collection = await connectToCollection(client, 'blogger', 'blogs');

    const data = await collection.find({ id: id }).toArray();
    const blogItem = JSON.parse(JSON.stringify(data[0]));

    return {
        props: { blogItem },
    };
};

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [{ params: { blogId: 'ai-nowadays' } }, { params: { blogId: 'street-food' } }],
        fallback: true,
    };
};

export default BlogPage;
