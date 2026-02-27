import { apiSlice } from "../../../app/apiSlice";
import { API_TAGS } from "../../../constants/apiTags";

export const transactionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: (params) => ({
                url: "/transactions",
                params: params,
            }),
            providesTags: [API_TAGS.TRANSACTION],
        }),
        getCategories: builder.query({
            query: () => "/transactions/categories",
            transformResponse: (response) => response.data,
        }),
        getTransactionSummary: builder.query({
            query: (params) => ({
                url: "/transactions/summary",
                params,
            }),
            providesTags: [API_TAGS.TRANSACTION],
        }),
        getTransactionById: builder.query({
            query: (id) => `/transactions/${id}`,
            transformResponse: (response) => response.data,
            providesTags: (result, error, id) => [{ type: API_TAGS.TRANSACTION, id }],
        }),
        createTransaction: builder.mutation({
            query: (newTransaction) => ({
                url: "/transactions",
                method: "POST",
                body: newTransaction,
            }),
            invalidatesTags: [API_TAGS.TRANSACTION],
        }),
        updateTransaction: builder.mutation({
            query: ({ id, ...updatedData }) => ({
                url: `/transactions/${id}`,
                method: "PATCH",
                body: updatedData,
            }),
            invalidatesTags: (result, error, { id }) => [
                API_TAGS.TRANSACTION,
                { type: API_TAGS.TRANSACTION, id }
            ],
        }),
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `/transactions/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [API_TAGS.TRANSACTION],
        }),
        getAllTransactionsAdmin: builder.query({
            query: (params) => ({
                url: "/transactions/admin/all",
                params,
            }),
            providesTags: [API_TAGS.TRANSACTION],
        }),
    }),
});

export const {
    useGetTransactionsQuery,
    useGetCategoriesQuery,
    useGetTransactionSummaryQuery,
    useGetTransactionByIdQuery,
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation,
    useGetAllTransactionsAdminQuery,
} = transactionApiSlice;
