import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Sidebar from './Components/Sidebar'
import Player from './Components/Player'
import Display from './Components/Display'
import { PlayerContext } from './Context/PlayerContext'



function App() {
  const [count, setCount] = useState(0)

  const {audioRef,track,songsData,} = useContext(PlayerContext)

  return (
  <div className='h-screen bg-gradient-to-tr from-slate-800 via-indigo-900 to-slate-800'>
     {
      songsData.lenght !==0 ?
      <>
      <div className='h-[90%] flex'>
<Sidebar/>
<Display/>
      </div>
      <Player/>
      </>
      : null
     }
      
      <audio ref={audioRef} src={track? track.file : ""} preload='auto'></audio>
    </div>
  )
}

export default App
