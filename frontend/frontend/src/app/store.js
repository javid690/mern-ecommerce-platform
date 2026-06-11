import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../redux/products/productApi";
import { orderApi } from "../redux/orders/orderApi";

import cartReducer from "../redux/cart/cartSlice";
import authReducer from "../redux/auth/authSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,

    cart: cartReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(orderApi.middleware),
});
