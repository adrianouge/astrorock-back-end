import { Request, Response } from 'express';
import { CreateNewUserInput, UsersDTO } from '../dtos/UsersDTO';
import { UsersBusiness } from '../business/UsersBusiness';
import { BaseError } from '../errors/BaseError';

export class UsersController {

    constructor(
        private usersDTO: UsersDTO,
        private usersBusiness: UsersBusiness
    ) { }

    public createNewUser = async (req: Request, res: Response) => {

        try {
            const { name, email, password } = req.body

            const input: CreateNewUserInput = this.usersDTO.createNewUserInput(name, email, password)
            const output = await this.usersBusiness.createNewUser(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }

            else { res.send("Um erro inesperado ocorreu.") }
        }
    }

    public loginUser = async (req: Request, res: Response) => {

        try {
            const { email, password } = req.body

            const input = this.usersDTO.loginUserInput(email, password)
            const output = await this.usersBusiness.loginUser(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }

            else { res.send("Um erro inesperado ocorreu.") }
        }
    }

    public getUserById = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const { userId } = req.body

            const input = this.usersDTO.getUserByIdInput(userToken, userId)
            const output = await this.usersBusiness.getUserById(input)

            res.status(200).send(output)
        }


        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }

            else { res.send("Um erro inesperado ocorreu.") }
        }
    }

    public changeUsersEmail = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const { newEmail } = req.body
            const input = this.usersDTO.changeUsersEmailInput(userToken, newEmail)
            const output = await this.usersBusiness.changeUsersEmail(input)

            res.status(200).send(output)
        }


        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }

            else { res.send("Um erro inesperado ocorreu.") }
        }
    }

    public changeUsersPassword = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const { newPassword } = req.body
            const input = this.usersDTO.changeUsersPasswordInput(userToken, newPassword)
            const output = await this.usersBusiness.changeUsersPassword(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }

            else { res.send("Um erro inesperado ocorreu.") }
        }
    }

    public deleteUserById = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization

            const input = this.usersDTO.deleteUserInput(userToken)
            const output = await this.usersBusiness.deleteUser(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }

            else { res.send("Um erro inesperado ocorreu.") }
        }
    }
}