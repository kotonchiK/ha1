import {body} from "express-validator";
import {BlogRepository} from "../../blogs/repository/blog-repository";
import {inputValidationMiddleware} from "../../middleware/inputValidation/inputValidation-middleware";

const titleValidator = body('title').isString().trim().isLength({min:1, max: 30}).withMessage('Incorrect title')

const shortDescriptionValidator = body('shortDescription').isString().trim().isLength({min:1, max: 100}).withMessage('Incorrect shortDescription')

const contentValidator = body('content').isString().trim().isLength({min:1, max: 1000}).withMessage('Incorrect content')

const blogIdValidator = body('blogId').custom( (value) => {
const blog = BlogRepository.getById(value)

    if(!blog) {
        throw Error('')
    }

    return true
}).withMessage('Incorrect blogId')

export const postValidation = () => [titleValidator, shortDescriptionValidator, contentValidator, blogIdValidator, inputValidationMiddleware]