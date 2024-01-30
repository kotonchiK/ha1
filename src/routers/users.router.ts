import {Response, Router} from "express";
import {Pagination, RequestWithBody, RequestWithParams, RequestWithQuery, ResponseType} from "../types";
import {CreateUserType, QueryUserInputModel} from "../models/users.input.models";
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

usersRouter.get('/', async (req: RequestWithQuery<QueryUserInputModel>, res:ResponseType<Pagination<OutputUserType>>) => {
    const sortData = {
        searchLoginTerm:req.query.searchLoginTerm ?? null,
        searchEmailTerm:req.query.searchEmailTerm ?? null,
        sortBy: req.query.sortBy ?? "createdAt",
        sortDirection:req.query.sortDirection ?? "desc",
        pageNumber:req.query.pageNumber ? +req.query.pageNumber : 1,
        pageSize:req.query.pageSize ? +req.query.pageSize : 10
    }

    const users = await UserQueryRepository.getAllUsers(sortData)
    res.send(users)

})


usersRouter.post('/', userValidation, /* validation */async (req:RequestWithBody<CreateUserType>, res:ResponseType<OutputUserType>) => {

    const {id, login, email,} = req.body

    const newUser = {
        id,
        login,
        email,
        createdAt:new Date().toISOString()
    }
    const createUser = await UsersService.createUser(newUser)
    if(!createUser) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }
    res.status(HTTP_STATUSES.CREATED_201).send(createUser)

})
usersRouter.delete('/:id', authMiddleware,async (req: RequestWithParams<{id:string}>, res: Response)=> {
    const id = req.params.id
    if(!ObjectId.isValid(id)) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const userIsDeleted = await UsersService.deleteUser(id)
    if(!userIsDeleted) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})