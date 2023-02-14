import { RootState } from '../store';

export const blogsSelector = (state: RootState) => state.blogs.blogs;
export const chosenBlogSelector = (state: RootState) => state.blogs.chosenBlog;
