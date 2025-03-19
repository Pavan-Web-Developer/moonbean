import React, {useEffect} from 'react'
import {useZustand} from '../../store/useZustand'
import {customDebug} from '../../utils/custom.debug'
import {getUserData} from '../../utils/mongo.db'
import {AddLink} from './AddLink'
import {MenuItem} from './MenuItem'
import {Profile} from './Profile'
// import { USER_NAME } from '../../utils/constants'
import {useAuth0} from '@auth0/auth0-react'


export const Menu = () => {
  const {
    menuArr,
    setMenuArr,
    setSelMenuIndex,
    setIsLoading,
  } = useZustand()
  const {isAuthenticated } = useAuth0()
  const {isWalletConnected, userData} = useZustand()
  console.log("userData",userData)
  useEffect(() => {
    (async () => {
      if (!userData?.username) {
        return
      }
      setIsLoading(true)
      const getDataRes = await getUserData(userData.username)
      // const getDataRes = await getUserData(USER_NAME)
      customDebug().log('Menu#useEffect[user]: getDataRes: ', getDataRes)

      if (Array.isArray(getDataRes) && getDataRes.length) {
        setMenuArr(getDataRes)
        setSelMenuIndex(0)
      }

      setIsLoading(false)
    })()
  }, [userData])

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
        {
          isAuthenticated ||isWalletConnected &&
          <AddLink />
        }
      </div>
      <Profile />
    </div>
  )
}
