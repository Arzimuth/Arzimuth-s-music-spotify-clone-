import React from 'react'
import { assets } from '../assets/assets'
import {NavLink} from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='bg-gradient-to-tr from-slate-600 via-indigo-700 to-slate-700 min-h-screen pl-5 flex flex-col items-center'>
  
      <img src={assets.logo} className='mt-5 w-28 hidden sm:block mx-auto' alt="Logo" />
      

      <img src={assets.logo} className='mt-5 w-10 sm:hidden block mx-auto' alt="Logo" />
      
      <div className='flex flex-col gap-5 mt-10'>

        <NavLink to="/add-song" className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-8 drop-shadow-[0_4px_6px_rgba(194,214,254,1)] text-sm font-medium'>
<img src={assets.add_song} className='w-5'/>

<p className='hidden sm:block'>Add Song</p>
      </NavLink>

      <NavLink to="/list-song"className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-8 drop-shadow-[0_4px_6px_rgba(194,214,254,1)] text-sm font-medium'>
<img src={assets.song_icon} className='w-5'/>

<p className='hidden sm:block'>List song</p>
      </NavLink>

      <NavLink to="/add-album"className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-8 drop-shadow-[0_4px_6px_rgba(194,214,254,1)] text-sm font-medium'>
<img src={assets.add_album} className='w-5'/>
<p className='hidden sm:block'>Add Album</p>
      </NavLink>

      <NavLink to="/list-album" className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-8 drop-shadow-[0_4px_6px_rgba(194,214,254,1)] text-sm font-medium'>
<img src={assets.album_icon} className='w-5'/>

<p className='hidden sm:block'>List album</p>
      </NavLink>

      </div>
      
    </div>
  )
}

export default Sidebar