import {useAuth0} from '@auth0/auth0-react'
import React from 'react'
import {useZustand} from '../store/useZustand'


export const Home = () => {
  const {menuArr} = useZustand()
  const {isAuthenticated} = useAuth0()
  const {isWalletConnected, walletAddress, setIsWalletConnected, setWalletAddress} = useZustand()
console.log("isWalletConnected",menuArr,isWalletConnected)

  return (
   ( !isWalletConnected||menuArr.length === 0 
    )
   && (
      <div className='absolute z-10 flex flex-col items-center justify-center w-full h-full text-center text-white bg-black text-8xl'>
        {
           !isWalletConnected ?<>
           
            <div>Please log in to analyze websites</div> 
           </>
            :
           <>
           {menuArr&& menuArr.length == 0 ?
            <div>Click the &quot;+&quot; to add a site</div>:<> </>}
           </>}
              
              </div>
    ))
}
