import {body} from "express-validator";
import {inputValidationMiddleware} from "../inputValidation/inputValidation.middleware";
import {BlogQueryRepository} from "../../repository/blog.query.repository";

// /posts - post, put/:id - Validation

const titleValidator = body('title')
    .isString()
    .trim()
    .isLength({min:1, max: 30})
    .withMessage('Incorrect title')

const shortDescriptionValidator = body('shortDescription')
    .isString()
    .trim()
    .isLength({min:1, max: 100})
    .withMessage('Incorrect shortDescription')

const contentValidator = body('content')
    .isString()
    .trim()
    .isLength({min:1, max: 1000})
    .withMessage('Incorrect content')

const blogIdValidator = body('blogId')
    .custom( async (value) => {
        const blog = await BlogQueryRepository.getById(value)
        if(!blog)
        {
        throw Error('')
        }
        return true
})
    .withMessage('Incorrect blogId')

export const   postValidation = () => [titleValidator, shortDescriptionValidator, contentValidator, blogIdValidator, inputValidationMiddleware]

// /blogs - post/:id/posts - Validation

export const createPostFromBlogValidation = () => [titleValidator, shortDescriptionValidator, contentValidator, inputValidationMiddleware]