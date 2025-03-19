import React, { useState, useEffect } from 'react'
import { useZustand } from '../../store/useZustand'
import { ethers } from 'ethers'

export const RegisterModal = ({ onClose }) => {
  const { walletAddress } = useZustand()
  const [error, setError] = useState('')

  useEffect(() => {
    const registerUser = async () => {
      try {
        if (!window.ethereum) {
          throw new Error('MetaMask is not installed!')
        }

        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        
        let walletAddress = accounts[0]

        const response = await fetch('http://localhost:4000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress, }),
          body: JSON.stringify({ walletAddress, }),
          body: JSON.stringify({ "username":walletAddress ,"password":'Password@123',"walletAddress":walletAddress}),
        })
        
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.message || 'Registration failed')
        }
        
        onClose()
        alert('Registration successful! Please log in.')
      } catch (err) {
        setError(err.message)
      }
    }

    registerUser()
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-xl text-white mb-4">Registering with MetaMask...</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
