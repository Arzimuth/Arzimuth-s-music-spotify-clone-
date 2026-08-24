import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import {  assets} from '../assets/frontend-assets/assets'
import { PlayerContext } from '../Context/PlayerContext'
import { useState } from 'react'
import { useEffect } from 'react'




const DisplayAlbum = ({album}) => {

const {id} = useParams()
const [albumData,setAlbumData] = useState("")

const {playWithId,albumsData,songsData,formatTime} = useContext(PlayerContext)


useEffect(()=>{
 albumsData.map((item)=>{

if(item._id === id){

    setAlbumData(item)
}

 })
},[])

// ฟังก์ชันแปลงเวลาให้อยู่ในรูปแบบ 00:00
const formatDuration = (duration) => {
  if (!duration) return "00:00";

 
  if (typeof duration === 'string' && duration.includes(':')) {
    const parts = duration.split(':');
    const min = String(parts[0]).padStart(2, '0');
    const sec = String(parts[1] || 0).padStart(2, '0');
    return `${min}:${sec}`;
  }

  
  const num = Number(duration);
  if (isNaN(num)) return "00:00";

  const min = String(Math.floor(num / 60)).padStart(2, '0');
  const sec = String(Math.floor(num % 60)).padStart(2, '0');

  return `${min}:${sec}`;
};


  return albumData ? (
    <>
    <Navbar/>
    <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
        <img className='w-90' src={albumData.image}/>
        <div className='flex flex-col'>
            <p>Playlist</p>
            <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
            <h4>{albumData.desc}</h4>
            <p className='mt-1'>
                <img className='inline-block w-5' src={assets.spotify_logo}/>
                <b>Sportify</b>
                • 1,323,154 likes
                • <b>50 songs,</b>
                about 2hr 30 min
            </p>
        </div>
         </div>
         <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-5 pl-2 text-[#a7a7a7]'>
<p><b className='mr-4'>#</b>Title</p>
<p>Album</p>
<p className='hidden sm:block'>Date Added</p>
<img className='m-auto w-4' src={assets.clock_icon}/>
         </div>
         <hr/>
         {
songsData.filter((item)=>item.album === albumData.name).map((item,index)=>(
    <div onClick={()=>playWithId(item._id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
<p className='text-white'>
    <b className='mr-4 text-[#a7a7a7]'>{index+1}</b>
    <img className='inline w-10 mr-5' src={item.image}/>
    {item.name}
</p>
<p className='text-[15px]'>{albumData.name}</p>
<p className='text-[15px]'>5 days ago</p>
<p className='text-[15px] text-center'>{formatDuration(item.duration)}</p>
    </div>
))
         }
    </>
  ) : null
}

export default DisplayAlbum