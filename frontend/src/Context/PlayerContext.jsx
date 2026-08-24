import { createContext, useEffect, useRef, useState } from "react";
// import { songsData } from "../assets/frontend-assets/assets";
import axios from "axios"

export const PlayerContext = createContext()

const PlayerContextProvider =(props)=>{
 



const audioRef = useRef()

const seekBg = useRef()
const seekBar= useRef()


const url = "http://localhost:5000"


const [songsData,setSongsData] = useState([])
const [albumsData,setAlbumsData] = useState([])
const [track,setTrack]=useState(songsData[0])
const [playStatus,setPlayStatus]=useState(false)
const [time,setTime]=useState({
    currentTime:{
        second:0,
        minute:0
    },totalTime :{
        second:0,
        minute:0
    }
})

const getSongsData = async () =>{

try{

    const response = await axios.get(`${url}/api/song/list`)

    setSongsData(response.data.song)
    setTrack(response.data.song[0])


}catch(error){


}

}

const getAlbumsData = async () =>{

try{

    const response = await axios.get(`${url}/api/album/list`)

    setAlbumsData(response.data.albums)
   


}catch(error){


}

}



const play =()=>{
    audioRef.current.play()
    setPlayStatus(true)
}

const pause =()=>{
    audioRef.current.pause()
    setPlayStatus(false)
}

const formatTime =(timeNum)=>{
    if(isNaN(timeNum)) return "00"
return String(Math.floor(timeNum)).padStart(2,"0")
}

const playWithId = async (id)=>{
await songsData.map((item)=>{
    if(id === item._id){
        setTrack(item)
    }
})
await audioRef.current.play()
setPlayStatus(true)
}


const previous = async()=>{
   songsData.map(async (item,index)=>{

if(track._id === item._id && index >0){
await setTrack(songsData[index-1])
await audioRef.current.play()
setPlayStatus(true)

}

   })
}

const next = async () => {
  const index = songsData.findIndex((item) => item._id === track._id);

  if (index !== -1) {
    if (index < songsData.length - 1) {
      await setTrack(songsData[index + 1]);
    } else {
      await setTrack(songsData[0]); // ถ้าถึงเพลงสุดท้าย วนกลับไปเพลงแรก
    }
    await audioRef.current.play();
    setPlayStatus(true);
  }
};


const seekSong = async (e)=>{
   audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)


}


useEffect (()=>{

setTimeout(()=>{

audioRef.current.ontimeupdate = ()=>{
    const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        if(duration){

            seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%"
        }
    
    setTime({
        currentTime:{
        second:formatTime(current % 60),
        minute:formatTime(current / 60)
    },totalTime :{
       second:formatTime(duration % 60),
        minute:formatTime(duration / 60)
    }
    })
}

})

},[audioRef])


useEffect(()=>{

getSongsData()
getAlbumsData()

},[])


    const contextValue ={
audioRef,
seekBg,
seekBar,
track,
setTrack,
playStatus,
setPlayStatus,
time,
setTime,
play,
pause,
formatTime,
playWithId,
previous,
next,
seekSong,
songsData,
albumsData,

    }

    return (
        <PlayerContext.Provider value={contextValue}>
{props.children}
        </PlayerContext.Provider>
    )
}
 

export default PlayerContextProvider