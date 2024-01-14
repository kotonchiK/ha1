import {NextFunction, Request, Response} from "express";
import {ValidationError, validationResult} from "express-validator";

export const inputValidationMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const formattedError = validationResult(req).formatWith((error:ValidationError ) => ({
        message: error.msg,
        field: error.type === 'field' ? error.path: 'unknown'
    }))

    if(!formattedError.isEmpty()) {
        const errorsMessages = formattedError.array({onlyFirstError:true})

        res.send(400).send({errorsMessages: errorsMessages})
        return
    }

    return next();

}