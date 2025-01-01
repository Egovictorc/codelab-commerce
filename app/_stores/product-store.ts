// src/stores/Product-store.ts
import { ProductDef } from "@/lib/definitions";
import { createStore, StateCreator } from "zustand/vanilla";

export type ProductState = {
  products: ProductDef[];
};

export type ProductActions = {
  updateProducts: (products: ProductDef[]) => void;
};

export type ProductStore = ProductState & ProductActions;

export const initProductStore = (): ProductState => {
  return { products: [] };
};

export const defaultInitState: ProductState = { products: [] };
export const createProductStore = (
  initState: ProductState = defaultInitState
) => {
  return createStore<ProductStore>()((set) => ({
    ...initState,
    updateProducts: (products) =>
      set((state) => ({ products: [...state.products, ...products] })),
  }));
};



export const createProductSlice: StateCreator<ProductStore, [], [], ProductStore> = (
  set
) => ({
  ...defaultInitState,
  updateProducts: (products: ProductDef[]) => set((state) =>({
    products
  }))

});
