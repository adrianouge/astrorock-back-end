import express from 'express'
import { UsersController } from '../controllers/UsersController'
import { UsersDTO } from '../dtos/UsersDTO'
import { UsersBusiness } from '../business/UsersBusiness'
import { UsersDatabase } from '../database/UsersDatabase'
import { HashManager } from '../services/HashManager'
import { TokenManager } from '../services/TokenManager'
import { IdGenerator } from '../services/IdGenerator'

export const usersRouter = express.Router()

const usersController = new UsersController(
    new UsersDTO(),
    new UsersBusiness(
        new UsersDatabase(),
        new UsersDTO(),
        new IdGenerator(),
        new HashManager(),
        new TokenManager()
    )
)

usersRouter.post('/users/signup', usersController.createNewUser)
usersRouter.post('/users/login', usersController.loginUser)
usersRouter.post('/users/changeemail', usersController.changeUsersEmail)
usersRouter.post('/users/changepassword', usersController.changeUsersPassword)
usersRouter.get('/users/:id', usersController.getUserById)
usersRouter.delete('/users/:id', usersController.deleteUserById)