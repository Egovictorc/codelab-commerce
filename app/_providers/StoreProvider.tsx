// src/providers/Cart-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type AppStore,
  createAppStore,
  initCartStore,
} from '@/app/_stores/cart-store'

export type AppStoreApi = ReturnType<typeof createAppStore>

export const AppStoreContext = createContext<AppStoreApi | undefined>(
  undefined,
)

export interface CartStoreProviderProps {
  children: ReactNode
}

export const StoreProvider = ({
  children,
}: CartStoreProviderProps) => {
  const storeRef = useRef<AppStoreApi>(undefined)
  if (!storeRef.current) {
    storeRef.current = createAppStore(initCartStore())
  }

  return (
    <AppStoreContext value={storeRef.current}>
      {children}
    </AppStoreContext>
  )
}

export const useAppStore = <T,>(
  selector: (store: AppStore) => T,
): T => {
  const cartStoreContext = useContext(AppStoreContext)

  if (!cartStoreContext) {
    throw new Error(`useAppStore must be used within CartStoreProvider`)
  }

  return useStore(cartStoreContext, selector)
}
