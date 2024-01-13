import express, {Express, Request, Response} from "express"
import {VideoDbType, ErrorType, AvailableResolutions, blogType, postType} from "./types";


export const app:Express = express()
app.use(express.json())


export let blogs: blogType[] = [{
    id: 'id',
    name: 'name',
    description: 'description',
    websiteUrl: "websiteUrl"
}]

export let posts: postType[] = [{
    id: 'id',
    title: 'title',
    shortDescription: 'string',
    content: 'string',
    blogId: 'blogId',
    blogName: 'blogName'
}]

export let videos: VideoDbType[] = [{
    id:1,
    title:'test string',
    author:'test author',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt:"2023-12-04T21:42:23.8912",
    publicationDate:'2023-12-84T21:42:2312',
    availableResolutions:['P144']

}]
app.delete('/testing/all-data', (req:Request, res:Response) => {
    try {
        videos = []
        res.sendStatus(204)
    }catch (e) {}
    res.status(500).send({error:'Internal Server Error'})

})

