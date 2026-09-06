import {Router} from 'express'
import Users from '../controller/users/usersController.js'
import auth from '../controller/users/authController.js';
import { Authenticar } from '../middleware/authenticator.js';
import Post from '../controller/post/postController.js';
import ImgConteudo from '../controller/imgConteudo/ImgController.js';
import multer from '../middleware/multer.js';

const rotas = Router();


const user = new Users();
const autenticacao = new auth()
const postagens = new Post();
const img = new ImgConteudo()



rotas.post('/users', user.createUsers)
rotas.post('/session', autenticacao.authUser)
rotas.get('/detalhes', Authenticar, user.DetailsUsers)



rotas.post('/conteudo', Authenticar,postagens.createPost)
rotas.get('/conteudo', Authenticar,postagens.readPost)
rotas.post('/img',Authenticar,multer.single('file'),img.createImg)


export default rotas
