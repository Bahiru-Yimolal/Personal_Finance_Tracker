// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { authApiSlice } from './authApiSlice';

// 🔹 READ FROM LOCAL STORAGE ONCE
const storedAuth = localStorage.getItem('auth');
const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;

const initialState = {
  userInfo: parsedAuth?.user || null,
  token: parsedAuth?.token || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setCredentials: (state, action) => {
    //   state.userInfo = action.payload.user;
    //   state.token = action.payload.token;

    //   localStorage.setItem(
    //     'auth',
    //     JSON.stringify({
    //       user: action.payload.user,
    //       token: action.payload.token,
    //     })
    //   );
    // },

    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem('auth');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.userInfo = payload.user;
        state.token = payload.token;

        localStorage.setItem(
          'auth',
          JSON.stringify({
            user: payload.user,
            token: payload.token,
          })
        );
      }
    );
  },
});

export const selectUser = (state) => state.auth.userInfo;
export const selectRole = (state) => state.auth.userInfo?.role;
export const selectIsAuthenticated = (state) =>
  state.auth.token;

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
