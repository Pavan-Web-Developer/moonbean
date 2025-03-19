import create from 'zustand'

export const useWalletStore = create((set) => ({
    walletAddress: '',
    isConnected: false,
    setWalletAddress: (address) => set({ walletAddress: address }),
    setIsConnected: (status) => set({ isConnected: status }),
    disconnect: () => set({ walletAddress: '', isConnected: false }),
}))
