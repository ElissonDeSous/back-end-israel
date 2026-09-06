import multer from "multer";
import crypto from 'crypto'

const  storage = multer.diskStorage({
     destination: function (req,file,cb){
           cb(null , './tmp')
     },
     filename: function (req,file,cb){
         const hash = crypto.randomBytes(10).toString("hex")
         const Name = `${hash}-${file.originalname}`
         cb(null, Name)
        }
})

export default multer({storage})