import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BlogListState, BlogType } from './types';

const initialState: BlogListState = {
    blogs: [],
    chosenBlog: {},
};

export const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs: (state, { payload }: PayloadAction<BlogType[]>) => {
            state.blogs = payload;
        },
        getBlog: (state, { payload }: PayloadAction<string>) => {
            state.chosenBlog = state.blogs.find((blog) => blog._id === payload) || {};
        },
    },
});

export const { setBlogs, getBlog } = blogsSlice.actions;

export default blogsSlice.reducer;
