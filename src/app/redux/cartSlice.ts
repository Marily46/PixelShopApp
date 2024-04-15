import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postAddToCart } from "../../services";

export interface CartState {
  items: {
    product: {
      id: string;
      title: string;
      image: string;
      price: number;
    };
    quantity: number;
  }[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

export const fetchAddToCart = createAsyncThunk(
  "cart/fetchAddToCart",
  async ({ userId, productId }: { userId: string; productId: string }) => {
    const response = await postAddToCart({ userId, productId });
    return response;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, image, price } = action.payload;
      const item = state.items.find((item) => item.product.id === id);
      if (item) {
        item.quantity++;
      } else {
        state.items.push({ product: { id, title, image, price }, quantity: 1 });
      }
      state.total += price;
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === productId
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddToCart.fulfilled, (state, action) => {
      const { id, title, image, price } = action.payload as unknown as {
        id: string;
        title: string;
        image: string;
        price: number;
      };
      const item = state.items.find((item) => item.product.id === id);
      if (item) {
        item.quantity++;
      } else {
        state.items.push({ product: { id, title, image, price }, quantity: 1 });
      }
      state.total += price;
    });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
