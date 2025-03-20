import {useAuth0} from '@auth0/auth0-react'
import React, { useState } from 'react' 
import { useZustand } from '../../store/useZustand'
import { RegisterModal } from './RegisterModal'
import { LoginModal } from './LoginModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export const Profile = () => {
  const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

  const {isWalletConnected, walletAddress, setIsWalletConnected, setWalletAddress, userData, user, setUser, setUserData} = useZustand()
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  // useZustand((state) => state.userData)
console.log("user==>",userData)
  const logoutWithRedirect = () => {
    // First clear local storage and state
    localStorage.removeItem('userData')
    localStorage.removeItem('walletAddress')
    setIsWalletConnected(false)
    setWalletAddress('')
    setUser(null)
    setUserData(null)
    
    // Then perform Auth0 logout if needed
    // logout({
    //   logoutParams: {
    //     returnTo: window.location.origin,
    //   },
    // })
    toast.success('See you again Later bye !', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    // Finally reload the page
    window.location.reload()
  }
  const loginUser = async (formData) => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed!')
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      
      let walletAddress = accounts[0]

      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'LOGIN failed')
      }
      
      // Set both user and userData, and store in localStorage
      setUser(data.user)
      setUserData(data)
      setWalletAddress(accounts[0])
      setIsWalletConnected(true)
      
      // Store in localStorage
      localStorage.setItem('userData', JSON.stringify(data))
      localStorage.setItem('walletAddress', accounts[0])
      
         toast.success('🎉 Login successful!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setShowLogin(false)
    } catch (err) {
      console.error('Login error:', err)
      toast.error(err.message)
    }
  }
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask is not installed!')
        return
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      
      loginUser()
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  return (
    <div className='flex items-center justify-center h-full gap-2 p-2 text-white'>
      {userData?.username}
      {/* {isWalletConnected && (
        <span className='text-sm opacity-75'>
          {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
        </span>
      )} */}

      <div className='flex gap-2'>
        {isWalletConnected ? (
          <button
            className='pl-2 pr-2 border-2 rounded'
            onClick={logoutWithRedirect}
          >
            Log out
          </button>
        ) : (
          <>
            <button
              className='pl-2 pr-2 border-2 rounded'
              onClick={() => setShowLogin(true)}
            >
              Log in
            </button>
            <button
              className='pl-2 pr-2 border-2 rounded'
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </>
        )}
      </div>
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {showLogin && <LoginModal loginUser={loginUser} setShowLogin={setShowLogin}onClose={() => setShowLogin(false)} />}
    </div>
    
  )
}
