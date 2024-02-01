import {Response, Router} from "express";
import {Pagination, RequestWithBody, RequestWithParams, RequestWithQuery, ResponseType} from "../types";
import {CreateInputUserModel, QueryUserInputModel} from "../models/users.input.models";
import {OutputUserType} from "../models/users.output.models";
import {UserQueryRepository} from "../repository/users.query.repository";
import {authMiddleware} from "../middlewares/auth/auth.middleware";
import {BlogIdType} from "../models/blogs.models";
import {ObjectId} from "mongodb";
import {HTTP_STATUSES} from "../utils";
import {UsersService} from "../services/users.service";
import {UserRepository} from "../repository/user.repository";
import {userValidation} from "../middlewares/validators/auth.validator";

export const usersRouter = Router({})

usersRouter.get('/', async (req: RequestWithQuery<QueryUserInputModel>, res:Response) => {
    const sortData = {
        searchLoginTerm:req.query.searchLoginTerm ?? null,
        searchEmailTerm:req.query.searchEmailTerm ?? null,
        sortBy: req.query.sortBy ?? "createdAt",
        sortDirection:req.query.sortDirection ?? "desc",
        pageNumber:req.query.pageNumber ? +req.query.pageNumber : 1,
        pageSize:req.query.pageSize ? +req.query.pageSize : 10
    }
    const users = await UserQueryRepository.getAllUsers(sortData)
    return res.status(HTTP_STATUSES.OK_200).send(users)
})


usersRouter.post('/', authMiddleware, userValidation(), async (req:RequestWithBody<CreateInputUserModel>, res:ResponseType<OutputUserType>) => {

    const userData = {
        login:req.body.login,
        email:req.body.email,
        password:req.body.password
    }
    const createUser = await UsersService.createUser(userData)
    if(!createUser) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }
   return res.status(HTTP_STATUSES.CREATED_201).send(createUser)
})
usersRouter.delete('/:id', authMiddleware, async (req: RequestWithParams<{id:string}>, res: Response)=> {
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