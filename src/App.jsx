import {useAuth0} from '@auth0/auth0-react'
import activityDetector from 'activity-detector'
import React, {useEffect, useState} from 'react'
import {BillboardPage} from './components/BillboardPage'
import {Home} from './components/Home'
import {MBoard} from './components/MBoard/MBoard'
import {Menu} from './components/Menu/Menu'
import {Plausible} from './components/Plausible/Plausible'
import {Alert} from './components/Utils/Alert'
import {Confirm} from './components/Utils/Confirm'
import {Loading} from './components/Utils/Loading'
import {useZustand} from './store/useZustand'
import {customDebug} from './utils/custom.debug'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  const {setIsLoading, setIsSeeingApp, isWalletConnected, setIsWalletConnected} = useZustand()

  // Modify the handleDisconnection function
  const handleDisconnection = () => {
    console.log('Handling disconnection...');
    setIsWalletConnected(false);
    localStorage.clear();
    if(isWalletConnected) {
      toast.error('Wallet disconnected', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  // MetaMask event listeners
  useEffect(() => {
    if (window.ethereum) {
      // Handle accounts change (including disconnection)
      const handleAccountsChanged = (accounts) => {
        console.log('Accounts changed:', accounts);
        if (accounts.length === 0) {
          console.log('No accounts found - wallet disconnected');
          handleDisconnection();
        }
      };

      // Handle disconnect event
      const handleDisconnectEvent = (error) => {
        console.error('MetaMask disconnect event:', error);
        handleDisconnection();
      };

      // Handle chain change
      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('disconnect', handleDisconnectEvent);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Cleanup listeners
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('disconnect', handleDisconnectEvent);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [isWalletConnected]);

  // Wallet connection check
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (!window.ethereum) return; // Early return if no wallet

      try {
        const accounts = await window.ethereum?.request({ method: 'eth_accounts' });
        const isConnected = accounts && accounts.length > 0;
        console.log('isConnected:', isConnected);
        if (!isConnected) {
          handleDisconnection();
        } else {
          if(isWalletConnected){ 
            toast.success(`Wallet Connection checked: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`, {
              position: "top-center",
              autoClose: 600,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        }
      } catch (error) {
        console.error('Wallet connection check failed:', error);
        handleDisconnection();
      }
    };

    checkWalletConnection();
    const intervalId = setInterval(checkWalletConnection, 5000);
    return () => clearInterval(intervalId);
  }, [isWalletConnected]);

  // Activity detector effect
  useEffect(() => {
    newActivityDetector.on('idle', () => {
      customDebug().log('App#useEffect: user idle')
      setIsSeeingApp(false)
    })
    newActivityDetector.on('active', () => {
      customDebug().log('App#useEffect: user active')
      setIsSeeingApp(true)
    })
  }, [])

  // If not connected, show ToastContainer with Loading
  

  return (
    <>
      <ToastContainer />
      <div className='relative flex flex-col w-screen h-screen'>
        <Menu />
        <div className='relative w-full h-[calc(100vh-3rem)]'>
          <BillboardPage />
          <MBoard />
          <Home />
        </div>
        <Plausible />
        <Confirm />
        <Alert />
        <Loading />
      </div>
    </>
  )
}

const newActivityDetector = activityDetector({
  timeToIdle: 600000,
})

export default App
