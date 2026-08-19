import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";


const addSong = async (req, res) => {
  try {
    const {name,desc,album} = req.body
    const audioFile = req.files?.audio?.[0];
    const imageFile = req.files?.image?.[0];
const audioUpload = await cloudinary.uploader.upload(audioFile.path,{resource_type:"video"})
const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`



const songData ={
  name,
  desc,
  album,
  image : imageUpload.secure_url,
  file : audioUpload.secure_url,
  duration
}

const song = new songModel(songData)

await song.save()

res.json({success:true,message:"Song Added"})

  } catch (error) {
    console.error("Error in addAlbum:", error);
   res.json({success:false,message:"Add Album failed"})
  }
};





const listSong = async (req,res) =>{

try{

const allSong = await songModel.find({})
res.json({success:true,song: allSong})


}catch(error){
    console.error("Error in listSong:", error);
   res.json({success:false,message:"list song failed"})
}


}

const removeSong = async (req,res)=>{


  try{

    const id= req.body.id

await songModel.findByIdAndDelete(id)

res.json({success:true, message:"Song deleted"})

  }catch(error){

    console.error("Error in deleteSong:", error);
   res.json({success:false,message:"delete song failed"})
  }




}


export {addSong,listSong,removeSong}