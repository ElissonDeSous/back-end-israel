import {prisma} from '../../prisma/prismaClient.js'
import  bcrypt from 'bcrypt'

export default class Users{

    async DetailsUsers(req , res){

        const id = req.id
          const dados = await prisma.user.findUnique({
              where:{
                post:{
                    id:id
                }
              },
              select:{
                    Id:true,
                    Name:true,
                    email:true}
          })

          res.status(200).json({dados})
    }

    async createUsers(req,res){
        const {Name,email,password} = req.body

        const hashPassword = await bcrypt.hash(password,10)

        await prisma.user.create({
            data:{
                Name:Name,email , password: hashPassword
            }
        })


        res.status(201).json({mensagem:"Cadastrado com sucesso"})
    }

    
}