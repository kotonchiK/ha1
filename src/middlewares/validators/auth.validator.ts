import {body} from "express-validator";
import {inputValidationMiddleware} from "../inputValidation/inputValidation.middleware";
import {UserRepository} from "../../repository/user.repository";

const loginOrEmailValidation = body("loginOrEmail").isString().withMessage('Incorrect login or email')
const passwordLoginOrEmailValidation = body("password").isString().withMessage("Incorrect password")

export const loginValidation = () => [loginOrEmailValidation, passwordLoginOrEmailValidation, inputValidationMiddleware]

const loginValidator = body('login')
    .isString()
    .trim()
    .isLength({min:3, max:10})
    .matches('^[a-zA-Z0-9_-]*$')
    .withMessage('Incorrect login')


const emailValidator = body('email').isString()
    .trim()
    .isLength({min:1})
    .isEmail()
    .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
    .withMessage('Incorrect email')

const passwordValidator = body('password')
    .isString()
    .trim()
    .isLength({min:6, max:20})
    .withMessage('Incorrect password')

export const userValidation = () => [loginValidator,emailValidator, passwordValidator, inputValidationMiddleware]

