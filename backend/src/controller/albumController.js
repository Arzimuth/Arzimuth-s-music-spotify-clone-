import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js"


const addAlbum = async (req,res)=>{

try{

    const {name,desc,bgColor} = req.body
    const imageFile = req.file
    const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})

const albumData = {
    name,
    desc,
    bgColor,
    image:imageUpload.secure_url
}

const album = albumModel(albumData)

await album.save()

res.json({success:true,message:"Album Added"})

}catch(error){

 console.error("Error in addAlbum:", error);
   res.json({success:false,message:"Add AIbum failed"})
}

}


const listAlbum = async (req,res)=>{

    try{
const allAlbum = await albumModel.find({})

res.json({success:true,albums:allAlbum})

    }catch(error){

        console.error("Error in listAlbum:", error);
   res.json({success:false,message:"list AIbum failed"})
    }


}


const removeAlbum= async (req,res)=>{

try{
    const id = req.body.id

await albumModel.findByIdAndDelete(id)
res.json({success:true, message:"Album deleted"})

}catch(error){

console.error("Error in deleteAlbum:", error);
   res.json({success:false,message:"delete album failed"})

}

}


export {addAlbum,listAlbum,removeAlbum}