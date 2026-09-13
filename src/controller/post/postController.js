import { json } from 'express'
import {prisma} from '../../prisma/prismaClient.js'
export default class Post{
    async readPost(req,res){
       const dados = await prisma.post.findMany();

       res.status(200).json({dados})
    }

    async createPost(req,res){
         const {conteudo} = req.body

         if(conteudo === ""){
            return res.status(400).json({mensagem:"Preencha todos os campos"})
         }

         await prisma.post.create({
            data:{
                conteudo: JSON.stringify(conteudo),
                usersId:req.id
            }
         })

         console.log(conteudo)

         return res.status(201).json({
            mensagem: "Post Criado com Suceso"
         })
    }

    async Delete(req,res){
        const {Id } =  req.params

        await prisma.post.delete({
            where:{Id:Number(Id)}
        })

        return res.status(200).json({mensagem:'Deletado com Sucesso'})
    }
}