// src/features/user/api/profileApiSlice.js
import { apiSlice } from '../../../app/apiSlice';
import { API_TAGS } from '../../../constants/apiTags';

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    viewProfile: builder.query({
      query: () => ({
        url: '/users/profile',
        method: 'GET',
      }),
      providesTags: [API_TAGS.USER],
    }),
    getLoginInfo: builder.query({
      query: () => ({
        url: '/users/profile/login-info',
        method: 'GET',
      }),
      providesTags: [API_TAGS.USER],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/users/update-info`,
        method: 'PATCH', // PUT since we are sending all fields
        body: data,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/users/updatePassword",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
    getUsers: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: [API_TAGS.USER],
    }),
    updateUserStatus: builder.mutation({
      query: (data) => ({
        url: "/users/status",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
    adminResetPassword: builder.mutation({
      query: (data) => ({
        url: "/users/admin-reset-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
  }),
});

export const {
  useViewProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetLoginInfoQuery,
  useGetUsersQuery,
  useUpdateUserStatusMutation,
  useAdminResetPasswordMutation,
} = profileApiSlice;
