import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllProducts, getProductsByCategory } from "../../services";
import { Product } from "../../types";
import { RootState } from "./store";

// type for the slice state
interface ProductsState {
  allProducts: Product[];
  filteredProducts: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: {
    price: {
      min?: number;
      max?: number;
    };
  };
  sort: {
    by: "price" | "name";
    order: "asc" | "desc";
  };
}

// initial state
const initialState: ProductsState = {
  allProducts: [],
  filteredProducts: [],
  status: "idle",
  error: null,
  filters: {
    price: {},
  },
  sort: {
    by: "price",
    order: "asc",
  },
};

// async thunk-> search products by category.
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category: string, { rejectWithValue }) => {
    try {
      const products = await getProductsByCategory(category);
      return products;
    } catch (error) {
      let errorMessage = "Error fetching products";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// async thunk-> search all products.
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const products = await getAllProducts();
      return products;
    } catch (error) {
      let errorMessage = "Error fetching products";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// slice with reducers and extra reducers
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<{ min?: number; max?: number }>
    ) => {
      state.filters.price = action.payload;
      applyFilters(state);
    },
    clearFilters: (state) => {
      state.filters.price = {};
      state.sort = { by: "price", order: "asc" };
      state.filteredProducts = state.allProducts;
      applyFilters(state);
    },
    setSort: (
      state,
      action: PayloadAction<{ by: "price" | "name"; order: "asc" | "desc" }>
    ) => {
      state.sort = action.payload;
      applyFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProducts = action.payload;
        applyFilters(state);
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProducts = action.payload;
        applyFilters(state);
      });
  },
});

// function to apply filters and sort to products
function applyFilters(state: ProductsState): void {
  let filteredProducts = state.allProducts;

  if (state.filters.price.min !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= (state.filters.price.min ?? 0)
    );
  }
  if (state.filters.price.max !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= (state.filters.price.max ?? 0)
    );
  }

  if (state.sort.by === "price") {
    filteredProducts.sort((a, b) =>
      state.sort.order === "asc" ? a.price - b.price : b.price - a.price
    );
  } else if (state.sort.by === "name") {
    filteredProducts.sort((a, b) =>
      state.sort.order === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }

  state.filteredProducts = filteredProducts;
}

// selectores
export const selectAllProducts = (state: RootState) =>
  state.products.allProducts;
export const selectFilteredProducts = (state: RootState) =>
  state.products.filteredProducts;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
export const { setFilters, setSort, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
