// src/stores/Cart-store.ts
import { ProductDef } from "@/lib/definitions";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type StoreState = {
  filter: string;
  products: ProductDef[];
  cart: {
    product: ProductDef;
    count: number;
  }[];
};

export type StoreActions = {
  removeProduct: (id: number) => void;
  setFilter: (filter: string) => void,
  getProductById: (id: number) => ProductDef | undefined;
  addProduct: (product: ProductDef) => void;
  updateProducts: (products: ProductDef[]) => void;
  getSummary: () => {
    price: number;
    noOfItemsInCart: number;
  };
};

export type AppStore = StoreState & StoreActions;

export const initCartStore = (): StoreState => {
  return { cart: [], products: [], filter: "" };
};

export const defaultInitState: StoreState = { cart: [], products: [], filter: "" };
export const createAppStore = (initState: StoreState = defaultInitState) => {
  return createStore<AppStore>()(
    devtools(subscribeWithSelector(persist(
      (set, get) => ({
        ...initState,
        removeProduct: (id: number) =>
          set((state) => {
            const cart = [];
            for (const item of state.cart) {
              // if target item
              if (item.product.id === id) {
                if (item.count === 1) continue;
                //   reduce quantity of item if quantity > 1
                cart.push({
                  product: item.product,
                  count: item.count - 1,
                });
              } else {
                cart.push({
                  product: item.product,
                  count: item.count,
                });
              }
            }
            return { cart };
          }),
        addProduct: (newProduct: ProductDef) =>
          set((state) => {
            const isEmpty = !(state.cart.length > 0);
            const isProductInCart = state.cart.find(
              ({ product }) => product.id === newProduct.id
            );
            console.log("isEmpty ", isEmpty);
            const cart = !isProductInCart
              ? // add product if not in cart
                [...state.cart, { product: newProduct, count: 1 }]
              : state.cart.map(({ product, count }) => {
                  // return product if not target product
                  if (product.id !== newProduct.id) {
                    return { product, count };
                  } //   increase product count if product already in cart
                  return { product, count: count + 1 };
                });

            return { cart };
            // return { cart: [{productId: id, count: 1}] };
          }),
        updateProducts: (products: ProductDef[]) =>
          set(() => ({
            products,
          })),
        getProductById: (productId: number) => {
          // console.log("products ", get().products);
          const product = get().products.find(({ id }) => id === productId);
          return product;
        },
        reset: () => set(() => initState),
        getSummary: () => {
          let noOfItemsInCart = 0;
          let price = 0;
          get().cart.map(({ product, count }) => {
            noOfItemsInCart += count;
            price += product.price * count;
          });
          return { noOfItemsInCart, price };
        },
        setFilter: (filter: string) => set( () => ({filter}))
      }),
      {
        name: "store",
      }
    )))
  );
};
