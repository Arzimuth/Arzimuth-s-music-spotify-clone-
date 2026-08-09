import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const PlayerContext = createContext()

const PlayerContextProvider =(props)=>{
 



const audioRef = useRef()

const seekBg = useRef()
const seekBar= useRef()

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
await setTrack(songsData[id])
await audioRef.current.play()

setPlayStatus(true)
}


const previous = async()=>{
    if(track.id > 0){
        await setTrack(songsData[track.id-1])
        await audioRef.current.play()
        setPlayStatus(true)
    }
}

const next = async()=>{
    if(track.id < songsData.length-1){
        await setTrack(songsData[track.id+1])
        await audioRef.current.play()
        setPlayStatus(true)
    }
}


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

    }

    return (
        <PlayerContext.Provider value={contextValue}>
{props.children}
        </PlayerContext.Provider>
    )
}
 

export default PlayerContextProvider