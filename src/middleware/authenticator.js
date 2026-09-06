import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export async  function Authenticar (req,res, next){
    const token = req.cookies.token

    

    if(!token){
       return res.status(401).json({mensagem:"Token não Encontrado"})
    }

  

    try {
        const decored =   jwt.verify(token,process.env.SECRET_KEY)
        console.log(decored)

        req.id = decored.id

        

        console.log(req.id)

        next()
    } catch (error) {
      return  res.status(401).json({mensagem: error.message})
    }
}