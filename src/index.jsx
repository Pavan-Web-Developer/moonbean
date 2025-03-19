import {createBrowserHistory} from 'history'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {useZustand} from './store/useZustand'
import {customDebug} from './utils/custom.debug'
import { testWalletConnection } from './utils/wallet.test'

const browserHistory = createBrowserHistory()

const AppWrapper = () => {
  const { setIsWalletConnected, setWalletAddress, isWalletConnected } = useZustand()

  const checkIfMetaMaskInstalled = () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed! Please install MetaMask from:\nhttps://metamask.io/download/')
      window.open('https://metamask.io/download/', '_blank')
      return false
    }
    if (!window.ethereum.isMetaMask) {
      alert('Please install MetaMask browser extension to continue!')
      window.open('https://metamask.io/download/', '_blank')
      return false
    }
    return true
  }

  const connectWallet = async () => {
    try {
      if (!checkIfMetaMaskInstalled()) return

      // Add test before connection
      await testWalletConnection();

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      console.log('Wallet connected successfully:', accounts[0]);
      setWalletAddress(accounts[0])
      setIsWalletConnected(true)

      // Add event listener for account changes
      window.ethereum.on('accountsChanged', function (accounts) {
        console.log('Account changed to:', accounts[0]);
        setWalletAddress(accounts[0]);
      });

    } catch (error) {
      console.error('Error connecting wallet:', error)
      alert('Failed to connect wallet. Please try again.')
    }
  }

  return (
    <React.StrictMode>
      {!isWalletConnected ? (
        <div className='absolute z-10 flex flex-col items-center justify-center w-full h-full text-center text-white bg-black text-8xl'>
          <div>
            <div>Please connect your wallet</div>
            <div className='text-2xl mt-4 mb-4'>
              {!window.ethereum && 'MetaMask is not installed'}
            </div>
            <button 
              onClick={connectWallet}
              className="mt-4 px-6 py-2 text-2xl bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {window.ethereum ? 'Connect Wallet' : 'Install MetaMask'}
            </button>
          </div>
        </div>
      ) : (
        <App />
      )}
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />)
