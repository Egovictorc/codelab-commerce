// src/providers/Cart-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type CartStore,
  createCartStore,
  initCartStore,
} from '@/app/_stores/cart-store'

export type CartStoreApi = ReturnType<typeof createCartStore>

export const CartStoreContext = createContext<CartStoreApi | undefined>(
  undefined,
)

export interface CartStoreProviderProps {
  children: ReactNode
}

export const StoreProvider = ({
  children,
}: CartStoreProviderProps) => {
  const storeRef = useRef<CartStoreApi>(undefined)
  if (!storeRef.current) {
    storeRef.current = createCartStore(initCartStore())
  }

  return (
    <CartStoreContext value={storeRef.current}>
      {children}
    </CartStoreContext>
  )
}

export const useCartStore = <T,>(
  selector: (store: CartStore) => T,
): T => {
  const cartStoreContext = useContext(CartStoreContext)

  if (!cartStoreContext) {
    throw new Error(`useCartStore must be used within CartStoreProvider`)
  }

  return useStore(cartStoreContext, selector)
}
