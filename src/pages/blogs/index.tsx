import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';

import { BlogType } from '@/redux/blogs/types';

import Sort from '@/components/Sort';
import Blogs, { BlogListType } from '@/components/Blogs';
import SkeletonAll from '@/components/Skeleton/SkeletonAll';

import styles from '@/styles/PageHeader.module.scss';

const BlogsPage: FC<BlogListType> = () => {
    const [blogs, setBlogs] = useState<BlogType[]>();
    const [filteredList, setFilteredList] = useState<BlogType[]>();

    const setNewList = (list: BlogType[]) => {
        setFilteredList(list);
    };

    useEffect(() => {
        getNewestData();
    }, []);

    const getNewestData = async () => {
        await axios('/api/blogs')
            .then((res) => setBlogs(res.data.data))
            .catch((error) => console.log(error));
    };

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
                    {blogs && <Sort blogList={blogs} setNewList={setNewList} />}
                </div>
            </div>
            {filteredList ? <Blogs blogList={filteredList} /> : <SkeletonAll />}
        </>
    );
};

// export const getStaticProps: GetStaticProps = async () => {
//     const client = await createClient();
//     const collection = await connectToCollection(client, 'blogger', 'blogs');

//     const data = await collection.find({}).toArray();
//     const blogList = JSON.parse(JSON.stringify(data));

//     // console.log('revalidate');

//     return {
//         props: { blogList },
//         revalidate: 600,
//     };
// };

export default BlogsPage;
