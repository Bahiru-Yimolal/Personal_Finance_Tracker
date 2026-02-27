import { apiSlice } from "../../../app/apiSlice";
import { API_TAGS } from "../../../constants/apiTags";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdminOverviewReport: builder.query({
            query: (params) => ({
                url: "/admin/overview-report",
                params,
            }),
            // We can use TRANSACTION tag or a new ADMIN tag if created, 
            // but since it involves transactions, TRANSACTION is relevant.
            providesTags: [API_TAGS.TRANSACTION, API_TAGS.USER],
        }),
    }),
});

export const {
    useGetAdminOverviewReportQuery,
} = adminApiSlice;
