import {body} from "express-validator";
import {inputValidationMiddleware} from "../inputValidation/inputValidation.middleware";

const loginValidator = body('login').isString().trim().isLength({min:3, max:10}).matches('^[a-zA-Z0-9_-]*$').withMessage('Incorrect login')
const emailValidator = body('email').isString().trim().matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$').withMessage('Incorrect email')
const passwordValidator = body('password').isString().trim().isLength({min:6, max:20}).withMessage('Incorrect password')

export const userValidation = () => [loginValidator,emailValidator, passwordValidator, inputValidationMiddleware]

