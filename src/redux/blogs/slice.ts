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
        setLike: (state, { payload }: PayloadAction<{ id: string; isLiked: boolean }>) => {
            const chosenBlog = state.blogs.find((blog) => blog._id === payload.id);
            const index = state.blogs.indexOf(chosenBlog!);

            // if (payload.isLiked) {
            //     state.blogs[index] =
            // }
        },
    },
});

export const { setBlogs, getBlog } = blogsSlice.actions;

export default blogsSlice.reducer;
