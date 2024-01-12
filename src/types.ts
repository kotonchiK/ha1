import {Request} from "express";

export const AvailableResolutions = [
    'P144',
'P240',
'P360',
'P480',
'P720',
'P1080',
'P1440',
'P2160']

export type VideoDbType = {
    id:number
    title:string
    author:string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt:string
    publicationDate:string
    availableResolutions:typeof AvailableResolutions
}

export type RequestWithBody<B> = Request<{}, {}, B, {}>;

export type CreateVideoType = {
    title:string
    author:string
    availableResolutions:typeof AvailableResolutions
}

export type ErrorMessageType = {
    field:string
    message:string
}

export type ErrorType = {
    errorsMessages: ErrorMessageType[]
}
