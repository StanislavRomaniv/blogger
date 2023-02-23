import React, { FC } from 'react';

import { BlogType } from '@/redux/blogs/types';
import BlogItem from './BlogItem';

import styles from './Blogs.module.scss';

export interface BlogListType {
    blogList: BlogType[];
}

const Blogs: FC<BlogListType> = ({ blogList }) => {
    return (
        <div className={styles.blog}>
            <div className={styles.container}>
                <div className={styles.blog__list}>
                    {blogList.map((blog, i) => (
                        <BlogItem key={blog.id} id={blog.id} img={blog.img} title={blog.title} author={blog.author} excerpt={blog.excerpt} descr={blog.descr} date={blog.date} totalLikes={blog.totalLikes} usersLikes={blog.usersLikes} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
