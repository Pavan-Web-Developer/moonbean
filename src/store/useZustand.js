import create from 'zustand'

export const useZustand = create((set) => ({
    menuArr: [],
    setMenuArr: (menuArr) => set({ menuArr }),
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
    isSeeingApp: true,
    setIsSeeingApp: (isSeeingApp) => set({ isSeeingApp }),
    isWalletConnected: false,
    walletAddress: '',
    setWalletAddress: (address) => set({ walletAddress: address }),
    setIsWalletConnected: (isConnected) => set({ isWalletConnected: isConnected }),
    isBackgroundLoading: false,
    setIsBackgroundLoading: (isBackgroundLoading) => set({ isBackgroundLoading }),
    realtimeVisitors: 0,
    setRealtimeVisitors: (realtimeVisitors) => set({ realtimeVisitors }),
}))