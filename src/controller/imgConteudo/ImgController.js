import { prisma } from '../../prisma/prismaClient.js'
import cloudinary from './Cloudinary.js'
export default class ImgConteudo {
     async createImg(req, res) {

          const imagem = req.file.path

          const resposta =  await cloudinary.uploader.upload(imagem)

          if(!imagem){
               res.status(400).json({mensagem:"Imagem não enviada pora"})
          }
          

          await prisma.upload.create({
               data: {
                     imagem: resposta.secure_url
               }

               
          })

          res.status(201).json({imagem:resposta.secure_url})
     }
}