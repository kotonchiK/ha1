import {NextFunction, Request, Response} from "express";
import {ValidationError, validationResult} from "express-validator";

export const inputValidationMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const formattedError = validationResult(req).formatWith((error:ValidationError ) => {
        return {
            message: error.msg,
            field: error.type === 'field' ? error.path : 'unknown'
        }
    })

    if(!formattedError.isEmpty()) {
        const errorMessage = formattedError.array({onlyFirstError:true})

        const errors = {
            errorMessages: errorMessage

        }
        res.status(400).send(errors)
        return
    }
    next();

}