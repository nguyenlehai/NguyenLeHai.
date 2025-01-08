import { create } from 'zustand'
import {ExchangeSide} from "../type";

type TokenState = {
  from: {
    currency: string
    quantity: number
  }
  to: {
    currency: string 
    quantity: number
  }
  selectedSide: ExchangeSide
  isConfirmModalOpen: boolean
  isTokenModalOpen: boolean
}

type TokenActions = {
  updateQuantity: (side: ExchangeSide, value: number) => void
  changeCurrency: (side: ExchangeSide, value: string) => void
  swapTokens: () => void
  setSelectedSide: (side: ExchangeSide) => void
  setConfirmModalOpen: (isOpen: boolean) => void
  setTokenModalOpen: (isOpen: boolean) => void
}

export const useTokenStore = create<TokenState & TokenActions>((set) => ({
  from: {
    currency: 'USDC',
    quantity: 0
  },
  to: {
    currency: 'ETH',
    quantity: 0
  },
  selectedSide: 'from',
  isConfirmModalOpen: false,
  isTokenModalOpen: false,

  updateQuantity: (side, value) => 
    set((state) => ({
      [side]: {
        ...state[side],
        quantity: value
      }
    })),

  changeCurrency: (side, value) =>
    set((state) => ({
      [side]: {
        ...state[side],
        currency: value
      }
    })),

  swapTokens: () =>
    set((state) => ({
      from: state.to,
      to: {
        ...state.from,
        quantity: state.from.quantity || 0
      }
    })),

  setSelectedSide: (side) => set({ selectedSide: side }),
  
  setConfirmModalOpen: (isOpen) => set({ isConfirmModalOpen: isOpen }),
  
  setTokenModalOpen: (isOpen) => set({ isTokenModalOpen: isOpen })
})) 