import React, {useEffect} from 'react'
import {useZustand} from '../../store/useZustand'
import {customDebug} from '../../utils/custom.debug'
import {getUserData} from '../../utils/mongo.db'
import {AddLink} from './AddLink'
import {MenuItem} from './MenuItem'
import {Profile} from './Profile'

export const Menu = () => {
  const {
    menuArr,
    setMenuArr,
    setSelMenuIndex,
    setIsLoading,
    walletAddress,
    isWalletConnected
  } = useZustand()

  useEffect(() => {
    (async () => {
      if (!walletAddress) {
        return
      }
      setIsLoading(true)
      const getDataRes = await getUserData(walletAddress)
      customDebug().log('Menu#useEffect[walletAddress]: getDataRes: ', getDataRes)

      if (Array.isArray(getDataRes) && getDataRes.length) {
        setMenuArr(getDataRes)
        setSelMenuIndex(0)
      }

      setIsLoading(false)
    })()
  }, [walletAddress])

  return (
    <div className='flex items-center justify-between w-screen h-12 bg-black border-0 border-b-2 border-white'>
      <div className='flex h-full gap-2 p-2 pb-0'>
        {menuArr.map((menu, index) =>
          <MenuItem
            key={index}
            index={index}
            menu={menu}
          />,
        )}
        {isWalletConnected && <AddLink />}
      </div>
      <Profile />
    </div>
  )
}
