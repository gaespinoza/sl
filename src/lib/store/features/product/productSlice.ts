import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store/store";
import { Review, Sale, Product } from "@/components/input/requestType";

export interface InitialProduct {
  product?: Product;
}

const initialState: InitialProduct = {};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;
export const selectProduct = (state: RootState) => state.product.product;

export default productSlice.reducer;
