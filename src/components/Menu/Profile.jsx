import React from 'react'
import { useZustand } from '../../store/useZustand'

export const Profile = () => {
  const { 
    walletAddress, 
    isWalletConnected, 
    setIsWalletConnected, 
    setWalletAddress 
  } = useZustand()

  const disconnectWallet = () => {
    setWalletAddress('')
    setIsWalletConnected(false)
  }

  return (
    <div className='flex items-center justify-center h-full gap-2 p-2 text-white'>
      {isWalletConnected && (
        <>
          {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
          <button
            className='pl-2 pr-2 border-2 rounded'
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  )
}
