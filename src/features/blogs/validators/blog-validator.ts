import {body} from "express-validator";
import {inputValidationMiddleware} from "../../../middlewares/inputValidation/inputValidation-middleware";

const nameValidator = body('name').isString().trim().isLength({min:1, max: 15}).withMessage('Incorrect name')

const descriptionValidator = body('description').isString().trim().isLength({min:1, max: 500}).withMessage('Incorrect description')

const websiteUrlValidator = body('websiteUrl').isString().trim().isLength({min:1, max: 100}).matches('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$').withMessage('Incorrect websiteUrl')

export const blogValidation = () => [websiteUrlValidator, nameValidator, descriptionValidator, inputValidationMiddleware]

body('year').isNumeric().withMessage('Incorrect year')