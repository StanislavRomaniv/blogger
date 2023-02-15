import { GetStaticProps } from 'next';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createClient, connectToCollection } from '@/utils/db-util';

import { setBlogs } from '@/redux/blogs/slice';
import { blogsSelector } from '@/redux/blogs/selectors';
import Blogs, { BlogListType } from '@/components/Blogs';

import styles from '@/styles/PageHeader.module.scss';
import { BlogType } from '@/redux/blogs/types';
import Sort from '@/components/Sort';

const sortList = [
    { name: 'Date (new fist)', type: 'date' },
    { name: 'Date (old first)', type: '-date' },
    { name: 'Name (A - Z)', type: 'name' },
    { name: 'Name (Z - A)', type: '-name' },
];

const BlogsPage: FC<BlogListType> = ({ blogList }) => {
    const dispatch = useDispatch();
    const [filteredList, setFilteredList] = useState<BlogType[]>(blogList);
    const [sortType, setSortType] = useState<string>('date');
    const data = useSelector(blogsSelector);

    const sortCkickHandler = (type: string) => {
        setSortType(type);
        localStorage.setItem('sort-type-all', type);
    };

    const setNewList = (list: BlogType[]) => {
        setFilteredList(list);
    };

    useEffect(() => {
        setSortType(localStorage.getItem('sort-type-all') || 'date');

        if (!data.length) {
            dispatch(setBlogs(blogList));
        }
    }, []);

    return (
        <>
            <div className={styles.header}>
                <div className={styles.head__top}></div>
                <div className={styles.container}>
                    <div className={styles.main}>
                        <h1 className={styles.main__header}>
                            <span>All Blogs</span>
                        </h1>
                        <p className={styles.main__descr}>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                        </p>
                    </div>
                    <Sort blogList={blogList} setNewList={setNewList} />
                </div>
            </div>
            <Blogs blogList={filteredList} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const client = await createClient();
    const collection = await connectToCollection(client, 'blogger', 'blogs');

    const data = await collection.find({}).toArray();
    const blogList = JSON.parse(JSON.stringify(data));

    return {
        props: { blogList },
    };
};

export default BlogsPage;
