import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './blogs/slice';
import userReducer from './user/slice';

export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
