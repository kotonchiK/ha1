import {loginValidation} from "../middlewares/validators/auth.validator";
import {RequestWithBody, ResponseType} from "../types";
import {LoginOrEmailModel} from "../models/users.input.models";
import {HTTP_STATUSES} from "../utils";
import {Router} from "express";
import {UserRepository} from "../repository/user.repository";
export const authRouter = Router({})
// Login user to the system
authRouter.post('/', loginValidation(), async (req:RequestWithBody<LoginOrEmailModel>, res:ResponseType<string>) => {
    const user = await UserRepository.getByLoginOrEmail({...req.body})
    console.log(user)
    if(!user) {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
        return
    }
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})