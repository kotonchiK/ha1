import {Response, Router} from "express";
import {RequestWithBody, RequestWithParams, RequestWithQuery, ResponseType} from "../types";
import {CreateInputUserModel, QueryUserInputModel, UserIdType} from "../models/users.input.models";
import {OutputUserType} from "../models/users.output.models";
import {UserQueryRepository} from "../repository/users.query.repository";
import {authMiddleware} from "../middlewares/auth/auth.middleware";
import {ObjectId} from "mongodb";
import {HTTP_STATUSES} from "../utils";
import {UsersService} from "../services/users.service";
import {userValidation} from "../middlewares/validators/auth.validator";
export const usersRouter = Router({})
// Get users
usersRouter.get('/', async (req: RequestWithQuery<QueryUserInputModel>, res:Response) => {
    const users = await UserQueryRepository.getAllUsers({...req.query})
    return res.status(HTTP_STATUSES.OK_200).send(users)
})
// Create user
usersRouter.post('/', authMiddleware, userValidation(), async (req:RequestWithBody<CreateInputUserModel>, res:ResponseType<OutputUserType>) => {
    const createUser = await UsersService.createUser({...req.body})
    if(!createUser) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }
   return res.status(HTTP_STATUSES.CREATED_201).send(createUser)
})
// Delete user by id
usersRouter.delete('/:id', authMiddleware, async (req: RequestWithParams<UserIdType>, res: Response)=> {
    const userId = req.params.id
    if(!ObjectId.isValid(userId)) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const isUserDeleted = await UsersService.deleteUser(userId)
    if(!isUserDeleted) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})