import { GetStaticProps } from 'next';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createClient, connectToCollection } from '@/utils/db-util';

import { setBlogs } from '@/redux/blogs/slice';
import { blogsSelector } from '@/redux/blogs/selectors';
import Blogs, { BlogListType } from '@/components/Blogs';

import styles from '@/styles/PageHeader.module.scss';
import { BlogType } from '@/redux/blogs/types';

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

    const dateSorting = (d1: string, d2: string) => {
        const dateA = new Date(d1).getTime();
        const dateB = new Date(d2).getTime();
        return dateA > dateB ? -1 : 1;
    };

    const sortListByType = (type: string, list: BlogType[]) => {
        const copyList = [...list];

        if (type === 'date') {
            return copyList.sort((a, b) => dateSorting(a.date, b.date));
        } else if (type === '-date') {
            return copyList.sort((a, b) => dateSorting(b.date, a.date));
        } else if (type === 'name') {
            return copyList.sort((a, b) => (a.title > b.title ? 1 : -1));
        } else if (type === '-name') {
            return copyList.sort((a, b) => (a.title > b.title ? -1 : 1));
        }

        return copyList;
    };

    useEffect(() => {
        const list = sortListByType(sortType, blogList);
        setFilteredList(list);
    }, [sortType]);

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
                    <div className={styles.sort}>
                        <span className={styles.sort__text}>Sort by: </span>
                        <ul className={styles.sort__list}>
                            {sortList.map((sort, i) => (
                                <li key={i} className={`${styles.sort__item} ${sort.type === sortType ? styles.sort__item_active : ''}`} onClick={() => sortCkickHandler(sort.type)}>
                                    {sort.name}
                                </li>
                            ))}
                        </ul>
                    </div>
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
