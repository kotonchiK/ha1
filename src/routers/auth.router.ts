import {loginValidation} from "../middlewares/validators/auth.validator";
import {RequestWithBody, ResponseType} from "../types";
import {LoginOrEmailModel} from "../models/users.input.models";
import {HTTP_STATUSES} from "../utils";
import {Router} from "express";
import {UserRepository} from "../repository/user.repository";
import {jwtService} from "../application/jwt-service";
import {authMiddleware} from "../middlewares/auth/auth.middleware";
import {UserQueryRepository} from "../repository/users.query.repository";
import {UsersService} from "../services/users.service";
import {tokenMiddleware} from "../middlewares/auth/auth.bearer.middleware";
import {UserDb} from "../db/types/user.types";
import {ViewUserType} from "../models/users.output.models";
export const authRouter = Router({})
// Login user to the system
authRouter.post('/login', loginValidation(), async (req:RequestWithBody<LoginOrEmailModel>, res:ResponseType<string>) => {
    const user = await UserRepository.getByLoginOrEmail({...req.body})
    if(user) {
        const accessToken = await jwtService.createJWT(user)
        res.status(HTTP_STATUSES.OK_200).send(accessToken)
        return
    }
    return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
})

authRouter.get('/me', tokenMiddleware, async (req:RequestWithBody<ViewUserType>, res) => {
    const user = {
        email:req.body.email,
        login:req.body.login,
        userId:req.body.id
    }
    return res.status(HTTP_STATUSES.OK_200).send(user)
})
