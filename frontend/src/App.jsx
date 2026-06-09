import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Sidebar from './Components/Sidebar'
import Player from './Components/Player'
import Display from './Components/Display'


function App() {
  const [count, setCount] = useState(0)

  return (
  <div className='h-screen bg-gradient-to-tr from-slate-800 via-indigo-900 to-slate-800'>
      <div className='h-[90%] flex'>
<Sidebar/>
<Display/>
      </div>
      <Player/>
    </div>
  )
}

export default App
