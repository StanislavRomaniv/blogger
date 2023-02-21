import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserType } from './types';

const initialState: UserType = {
    name: '',
    about: '',
    image: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, { payload }: PayloadAction<string>) => {
            state.name = payload;
        },
        setAbout: (state, { payload }: PayloadAction<string>) => {
            state.about = payload;
        },
    },
});

export const { setName, setAbout } = userSlice.actions;

export default userSlice.reducer;
