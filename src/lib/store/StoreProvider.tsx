"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store/store";
import { setProduct } from "@/lib/store/features/product/productSlice";
import { Product } from "@/components/input/requestType";

export default function StoreProvider({
  // product,
  children,
}: {
  // product: Product
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // storeRef.current.dispatch(setProduct(product))
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
