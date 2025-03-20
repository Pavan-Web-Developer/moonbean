import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useZustand } from '../../store/useZustand'

export const LoginModal = ({ onClose, loginUser }) => {
      const {isWalletConnected, walletAddress, setIsWalletConnected, setWalletAddress, userData, user, setUser, setUserData} = useZustand()
     
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    walletAddress: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error(
          <div>
            MetaMask not found! 
            <a 
              href="https://metamask.io/download/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 ml-2"
            >
              Download here
            </a>
          </div>,
          {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
          }
        );
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      
      setFormData(prev => ({
        ...prev,
        walletAddress: accounts[0]
      }))
    } catch (error) {
      console.error('Error connecting wallet:', error)
      toast.error('Failed to connect wallet')
    }
  }

  const disconnectWallet = () => {
    setFormData(prev => ({
      ...prev,
      walletAddress: ''
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    loginUser(formData)
    // try {
    //   const response = await fetch('http://localhost:4000/api/auth/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   })

    //   const data = await response.json()
      
    //   if (!response.ok) {
    //     throw new Error(data.message || 'Login failed')
    //   }

    //   toast.success('🎉 Login successful!', {
    //     position: "top-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    //   // Set both user and userData, and store in localStorage
    //   setUser(data.user)
    //   setUserData(data)
    //   setWalletAddress(accounts[0])
    //   setIsWalletConnected(true)
      
    //   // Store in localStorage
    //   localStorage.setItem('userData', JSON.stringify(data))
    //   localStorage.setItem('walletAddress', accounts[0])
      
    //   setTimeout(() => {
    //     onClose()
    //   }, 500)
    // } catch (err) {
    //   console.error('Login error:', err)
    //   toast.error(err.message)
    // }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
    
      <div className="bg-gray-800 p-6 rounded-lg w-96 shadow-xl">
        <h2 className="text-xl text-white mb-4 font-semibold">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({...prev, username: e.target.value}))}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="p-2 rounded bg-gray-700 text-white w-full border border-gray-600 focus:border-blue-500 focus:outline-none"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Wallet Address"
              className="p-2 rounded bg-gray-700 text-white flex-1 border border-gray-600"
              value={formData.walletAddress}
              readOnly
            />
            {!formData.walletAddress ? (
              <button
                type="button"
                onClick={connectWallet}
                className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition-colors"
              >
                Connect
              </button>
            ) : (
              <button
                type="button"
                onClick={disconnectWallet}
                className="px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600 transition-colors"
              >
                Disconnect
              </button>
            )}
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white transition-colors ${
                !formData.username || !formData.password || !formData.walletAddress
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
              disabled={!formData.username || !formData.password || !formData.walletAddress}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
