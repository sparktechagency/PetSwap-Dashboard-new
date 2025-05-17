// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://182.252.68.227:8001/api",
    prepareHeaders: async (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Post", "deleteProduct", "updateProductStatus"],

  endpoints: (builder) => ({
    // login endpoint
    login: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),

    // logout endpoint
    logout: builder.mutation({
      query: () => {
        return {
          url: "logout",
          method: "POST",
        };
      },
    }),

    // check token
    checkToken: builder.query({
      query: () => {
        return {
          url: "/auth/check-token",
          method: "GET",
        };
      },
    }),

    // forget password
    forgetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/forget-password",
          method: "POST",
          body: data,
        };
      },
    }),

    // verify otp
    verifyOtp: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/otp-verification",
          method: "POST",
          body: data,
        };
      },
    }),

    // Change password
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: data,
        };
      },
    }),

    // get dashboard overview
    getDashboardOverview: builder.query({
      query: ({ filter }) => {
        return {
          url: filter,
        };
      },
    }),

    // get statics
    getStatics: builder.query({
      query: ({ filter }) => {
        return {
          url: `/statistics?type=${filter}`,
        };
      },
    }),

    // get user manage
    getUsers: builder.query({
      query: ({ page, perPage, search }) => {
        return {
          url: `/manage-user?per_page=${perPage}&search=${search}&page=${page}`,
        };
      },
    }),

    // get user info with product
    getUserInfo: builder.query({
      query: ({ id, page }) => {
        return {
          url: `/user-details/${id}?per_page=10&page=${page}`,
        };
      },
    }),

    // user product statics
    getUserProductStatics: builder.query({
      query: ({ id, filter }) => {
        return {
          url: `/user-statistics/${id}?type=${filter}`,
        };
      },
    }),

    // get products
    getProducts: builder.query({
      query: ({ page, perPage, search }) => {
        return {
          url: `/product?per_page=${perPage}&search=${search}&page=${page}`,
        };
      },
      providesTags: ["deleteProduct", "updateProductStatus", "faq"],
    }),

    // delete product
    deleteProduct: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["deleteProduct"],
    }),

    // change product status
    changeProductStatus: builder.mutation({
      query: ({ id, status }) => {
        console.log("status", { status: status, _method: "PUT" });
        return {
          url: `/product/status/${id}`,
          method: "POST",
          body: { status, _method: "PUT" },
        };
      },
      invalidatesTags: ["updateProductStatus"],
    }),

    // transaction
    getTransactions: builder.query({
      query: ({ page, search }) => {
        return {
          url: `/transactions?per_page=10&page=${page}&search=${search}`,
        };
      },
    }),

    // update profile
    updateProfile: builder.mutation({
      query: (data) => {
        console.log("recived data", data);
        return {
          url: "/edit-profile",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),

    // change password
    updatePassword: builder.mutation({
      query: (data) => {
        console.log("change password data", data);
        return {
          url: "/change-password",
          method: "POST",
          body: data,
        };
      },
    }),

    // settings update
    updateSettings: builder.mutation({
      query: ({ data, param }) => {
        console.log(`/setting?type=${param}`);
        return {
          url: `/setting?type=${param}`,
          method: "POST",
          body: { data },
        };
      },
    }),

    // get settings
    getSettings: builder.query({
      query: ({ param }) => {
        return {
          url: `/setting?type=${param}`,
        };
      },
    }),

    // add FAQ
    addFaq: builder.mutation({
      query: (data) => {
        return {
          url: "/faq",
          method: "POST",
          body: data,
        };
      },
    }),

    // get faq
    getFaq: builder.query({
      query: () => {
        return {
          url: "/faq",
        };
      },
      providesTags: ["faq"],
    }),

    // delete faq
    deleteFaq: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/faq/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["faq"],
    }),

    // get help request
    helpRequest: builder.query({
      query: (data) => {
        return {
          url: "/help-center?per_page=10",
        };
      },
    }),

    // anser help request
    answerHelpRequest: builder.mutation({
      query: ({data, id}) => {
        return {
          url: `/help-center/${id}`,
          method: "POST",
          body: data,
        };
      },
    }),

    // create category
    addCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/category",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useCheckTokenQuery,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useChangePasswordMutation,
  useGetDashboardOverviewQuery,
  useGetStaticsQuery,
  useGetUsersQuery,
  useGetUserInfoQuery,
  useGetUserProductStaticsQuery,
  useGetProductsQuery,
  useDeleteProductMutation,
  useChangeProductStatusMutation,
  useGetTransactionsQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useUpdateSettingsMutation,
  useGetFaqQuery,
  useAddFaqMutation,
  useDeleteFaqMutation,
  useGetSettingsQuery,
  useHelpRequestQuery,
  useAnswerHelpRequestMutation
} = apiSlice;
