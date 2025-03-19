import {create} from 'zustand'
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

export const useZustand = create((set, get) => ({
  ...createUISlice(set, get),
  ...createSceneSlice(set, get),
  ...createWalletSlice(set),
  ...createLoginSlice(set),
}))
