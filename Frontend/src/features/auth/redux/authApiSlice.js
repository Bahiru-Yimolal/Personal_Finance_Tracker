// src/features/auth/authApiSlice.js
import { apiSlice } from '../../../app/apiSlice';
import { API_TAGS } from '../../../constants/apiTags'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),

    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/users/update-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useForgotPasswordMutation, useUpdatePasswordMutation } = authApiSlice;
