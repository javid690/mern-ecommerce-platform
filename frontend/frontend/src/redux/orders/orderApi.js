import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: (headers) => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (userInfo?.token) {
        headers.set("Authorization", `Bearer ${userInfo.token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders/checkout",
        method: "POST",
        body: orderData,
      }),
    }),

    getMyOrders: builder.query({
      query: () => "/orders/my-orders",
    }),
  }),
});

export const { useCreateOrderMutation, useGetMyOrdersQuery } = orderApi;
