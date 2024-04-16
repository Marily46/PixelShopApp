import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";

// Create the store
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

// Save cart to local storage
store.subscribe(() => {
  const state = store.getState();
  const cart = state.cart;
  localStorage.setItem("cart", JSON.stringify(cart));
});

// Define the root state and dispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
