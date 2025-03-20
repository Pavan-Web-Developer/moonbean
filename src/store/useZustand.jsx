import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {createSceneSlice} from './createSceneSlice'
import {createUISlice} from './createUISlice'

const createWalletSlice = (set) => ({
  walletAddress: '',
  isWalletConnected: false,
  setWalletAddress: (address) => set({ walletAddress: address }),
  setIsWalletConnected: (status) => set({ isWalletConnected: status }),
})

const createLoginSlice = (set) => ({
  userData: null,
  isLoggedIn: false,
  setUserData: (data) => set({ userData: data }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  user: null,
  setUser: (user) => set({ user: user }),
})

export const useZustand = create(
  persist(
    (set, get) => ({
      ...createUISlice(set, get),
      ...createSceneSlice(set, get),
      ...createWalletSlice(set),
      ...createLoginSlice(set),
    }),
    {
      name: 'app-storage', // unique name for localStorage key
      partialize: (state) => ({
        // only persist these states
        walletAddress: state.walletAddress,
        isWalletConnected: state.isWalletConnected,
        userData: state.userData,
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    }
  )
)
