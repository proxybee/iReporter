import express from 'express';
import dotenv from 'dotenv';
import Auth from '../middleware/auth';
import userController from '../controllers/userController';

dotenv.config();

const app = express.Router();
app.use(express.json());

app.post('/signup', userController.signUp);
app.post('/signin', userController.signIn);
//app.get('/users', userController.signIn);
//app.get('/users/:id', userController.signIn);
// app.patch('/users/:id', Auth.verifyToken, User.updateUser);
app.delete('/:id', Auth.verifyToken, Auth.checkUser, userController.delete);

export default app;
