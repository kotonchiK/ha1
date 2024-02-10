import {body} from "express-validator";
import {inputValidationMiddleware} from "../inputValidation/inputValidation.middleware";

//   "/auth/login" - post - Validation

const loginOrEmailValidator = body("loginOrEmail")
    .isString()
    .isLength({min:1})
    .withMessage('Incorrect login or email')

const passwordLoginOrEmailValidator = body("password")
    .isString()
    .isLength({min:1})
    .withMessage("Incorrect password")

export const loginValidation = () => [loginOrEmailValidator, passwordLoginOrEmailValidator, inputValidationMiddleware]

//   "/user" - post - Validation

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