import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    language: localStorage.getItem('language') || 'en',
    theme: localStorage.getItem('theme') || 'light',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
            localStorage.setItem('language', action.payload);
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
        },
    },
});

export const { setLanguage, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
