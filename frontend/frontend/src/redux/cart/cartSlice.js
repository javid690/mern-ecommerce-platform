import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cart.find(
        (product) => product._id === item._id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({
          ...item,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    increaseQuantity: (state, action) => {
      const item = state.cart.find((product) => product._id === action.payload);

      if (item) {
        item.quantity += 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    decreaseQuantity: (state, action) => {
      const item = state.cart.find((product) => product._id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    clearCart: (state) => {
      state.cart = [];

      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
