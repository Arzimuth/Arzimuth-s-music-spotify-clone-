
import { useContext } from "react"
import { assets,} from "../assets/frontend-assets/assets"
import { PlayerContext } from "../Context/PlayerContext"

const Player = () => {

const {track,seekBar,seekBg,play,pause,playStatus,time,formatTime,previous,next,seekSong}=useContext(PlayerContext)


  return track ? (
    <div className="h-[10%] bg-indigo-700 flex justify-between items-center text-white px-4">
        <div className="hidden lg:flex items-center gap-4">
<img className="w-12" src={track.image}/>
<div>
    <p>{track.name}</p>
    <p>{track.desc.slice(0,12)}</p>
</div>
</div>
<div className="flex flex-col items-center gap-1 m-auto">
<div className="flex gap-4">
<img className="w-4 cursor-pointer" src={assets.shuffle_icon}/>
<img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon}/>
{
  playStatus ? <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon}/>:
  <img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon}/>
}


<img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon}/>
<img className="w-4 cursor-pointer" src={assets.loop_icon}/>
</div>
<div className="flex items-center gap-5">
  <p>{formatTime(time.currentTime.minute)}:{formatTime(time.currentTime.second)}</p>
  <div ref={seekBg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
    <hr ref={seekBar} className="h-1 border-none w-0 bg-indigo-400 rounded-full" />
  </div>
  <p>{formatTime(time.totalTime.minute)}:{formatTime(time.totalTime.second)}</p>
</div>
        </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.plays_icon}/>
        <img className="w-4" src={assets.mic_icon}/>
        <img className="w-4" src={assets.queue_icon}/>
        <img className="w-4" src={assets.speaker_icon}/>
        <div className="w-20 bg-slate-50 h-1 rounded">

        </div>
        <img className="w-4" src={assets.volume_icon}/>
        <img className="w-4" src={assets.mini_player_icon}/>
        <img className="w-4" src={assets.zoom_icon}/>
      </div>
        </div>
  ) : null
}
export default Player