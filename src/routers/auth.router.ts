import {authMiddleware} from "../middlewares/auth/auth.middleware";
import {loginValidation, userValidation} from "../middlewares/validators/auth.validator";
import {RequestWithBody, ResponseType} from "../types";
import {CreateInputUserModel, LoginOrEmailModel} from "../models/users.input.models";
import {OutputUserType} from "../models/users.output.models";
import {UsersService} from "../services/users.service";
import {HTTP_STATUSES} from "../utils";
import {usersRouter} from "./users.router";
import {Router} from "express";
import {UserRepository} from "../repository/user.repository";
import {usersCollection} from "../db/db";

export const authRouter = Router({})


authRouter.post('/auth/login', loginValidation(), async (req:RequestWithBody<LoginOrEmailModel>, res:ResponseType<string>) => {

    const user = await UserRepository.getByLoginOrEmail(req.body)
    if(!user) {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
        return
    }
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})