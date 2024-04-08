import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/lib/store/features/product/productSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      product: productReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
