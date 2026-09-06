import express  from "express";
import rotas from "./routes/routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app  = express();
app.use(cors({
    origin:["http://localhost:3000", "http://localhost:3001"],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(rotas)

app.listen(8080, ()=>{
    let Data = new Date()
    console.log(Data)
})