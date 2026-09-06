import { prisma } from '../../prisma/prismaClient.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export default class auth {

    async authUser(req, res) {
        try {
            const { email, password } = req.body

            const emailExistente = await prisma.user.findUnique({
                where: {
                    email
                }
                
            })

            if (!emailExistente) {
               return res.status(400).json({ mensagem: 'Informações de Login Incorretas' })
            }

            const senha = await bcrypt.compare(password, emailExistente.password)

            if (!senha) {
               return res.status(400).json({ mensagem: 'Informações de Login Incorretas' })
            }
            if(!process.env.SECRET_KEY){
                    return res.status(500).json({mensagem:" erro interno do servidor"})
                }
        

            const token = await jwt.sign({
                id: emailExistente.Id,
                nome: emailExistente.Name,


            },

                process.env.SECRET_KEY,

                {
                    expiresIn: '1h'
                }
            )

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60

            })

           return res.status(200).json({ mensagem: "Login Realizado com Sucesso" })

        } catch (error) {
            res.status(500).json(error.message)
        }
                
    }
}