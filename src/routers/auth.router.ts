import {Router} from "express";
import {HTTP_STATUSES} from "../utils";
import {authValidation} from "../middlewares/validators/auth.validator";

export const authRouter = Router({})

authRouter.post('/', authValidation,async (req, res)=> {
res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})