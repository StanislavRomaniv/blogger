import React, { FC, useEffect, useState } from 'react';

import { BlogType } from '@/redux/blogs/types';

import styles from './Sort.module.scss';

const sortList = [
    { name: 'Date (new fist)', type: 'date' },
    { name: 'Date (old first)', type: '-date' },
    { name: 'Name (A - Z)', type: 'name' },
    { name: 'Name (Z - A)', type: '-name' },
];

const Sort: FC<{ blogList: BlogType[]; setNewList: Function }> = ({ blogList, setNewList }) => {
    const [sortType, setSortType] = useState<string>('date');

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
        setSortType(localStorage.getItem('sort-type-all') || 'date');
    }, []);

    useEffect(() => {
        const list = sortListByType(sortType, blogList);
        setNewList(list);
    }, [sortType]);

    return (
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
    );
};

export default Sort;
