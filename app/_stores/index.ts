import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { CartState, CartStore, createCartSlice, createCartStore } from './cart-store';
import { createProductSlice, createProductStore, ProductStore } from './product-store';

export type AppStore =  CartStore & ProductStore;
   // product: ProductStore
// export type AppStore = {
//     cart: CartStore,
//     // product: ProductStore
// }
const useAppStore = create<AppStore>(
    (...a) => ({
        ...createCartSlice(...a),
        ...createProductSlice(...a)
        // product: createProductStore(...a),
    })
  
);

export default useAppStore;
