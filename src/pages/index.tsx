import { FC, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { connectToCollection, createClient } from '@/utils/db-util';

import { BlogType } from '@/redux/blogs/types';
import { setBlogs } from '@/redux/blogs/slice';
import Main from '@/components/Main';
import Contact from '@/components/Contact';
import Blogs from '@/components/Blogs';
import HeaderDivider from '@/components/Header/HeaderDivider';

import styles from '@/styles/Home.module.scss';
import { blogsSelector } from '@/redux/blogs/selectors';

interface BlogListType {
    blogList: BlogType[];
    featuredBlogList: BlogType[];
}

const Home: FC<BlogListType> = ({ blogList, featuredBlogList }) => {
    const dispatch = useDispatch();
    const data = useSelector(blogsSelector);

    useEffect(() => {
        if (!data.length) {
            dispatch(setBlogs(blogList));
        }
    }, []);

    return (
        <>
            <div className={styles.header}>
                <div className={styles.head__top}></div>
                <Main />
            </div>
            <HeaderDivider title={'Our Blogs'} descr={'It is a long established fact that a reader will be distracted by the readable content '} />
            <Blogs blogList={featuredBlogList} />
            <HeaderDivider title={'Contact me'} descr={'There are many variations of passages of Lorem Ipsum available'} />
            <Contact />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const client = await createClient();
    const collection = await connectToCollection(client, 'blogger', 'blogs');

    const data = await collection.find({}).toArray();
    const featuredData = await collection.find({ featured: true }).toArray();
    const blogList = JSON.parse(JSON.stringify(data));
    const featuredBlogList = JSON.parse(JSON.stringify(featuredData));

    return {
        props: { blogList, featuredBlogList },
        revalidate: 600,
    };
};

export default Home;
