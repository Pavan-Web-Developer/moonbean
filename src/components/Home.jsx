import React from 'react'
import { useZustand } from '../store/useZustand'

export const Home = () => {
  const { menuArr } = useZustand()

  return (
    !menuArr.length && (
      <div className='absolute z-10 flex flex-col items-center justify-center w-full h-full text-center text-white bg-black text-8xl'>
        <div>Click the &quot;+&quot; to add a site</div>
      </div>
    )
  )
}
