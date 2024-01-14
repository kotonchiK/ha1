import {Request, Response, Router} from "express";
import {AvailableResolutions, ErrorType, VideoDbType} from "../../types";
import  {videos} from "../../settings";

export const videosRouter = Router({});

videosRouter.get('/', (req:Request, res:Response) => {
    res.status(200).send(videos)
})

videosRouter.get('/:id',(req:Request, res:Response) => {
    const id:number = +req.params.id
    const video:VideoDbType|undefined = videos.find(v => v.id === id)

    if(!video) {
        res.sendStatus(404)
        return
    } else
    {
        res.status(200).send(video)
    }
})

videosRouter.delete('/:id', (req:Request, res:Response) => {
    for(let i:number = 0; i < videos.length; i++) {
        if(videos[i].id === +req.params.id) {
            videos.splice(i, 1)
            res.sendStatus(204)
            return
        }
    }
    res.sendStatus(404)
})

videosRouter.put('/:id', (req:Request, res:Response) => {
    if(Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.sendStatus(400)
        return
    }
    let errors: ErrorType = {
        errorsMessages: []
    }

    let title = req.body.title
    let author = req.body.author
    let canBeDownloaded = req.body.canBeDownloaded
    let minAgeRestriction = req.body.minAgeRestriction
    let publicationDate = req.body.publicationDate
    let availableResolutions = req.body.availableResolutions

    if(!title || title === null || typeof(title) !== "string" || !title.trim() || title.length > 40 ) {
        errors.errorsMessages.push(
            {
                message:"Incorrect title",
                field:"title"
            })
    }
    if(!author || author === null || typeof(author) !== "string" ||!author.trim() || author.length > 20) {
        errors.errorsMessages.push(
            {
                message:"Incorrect author",
                field:"author"
            })
    }
    if(!canBeDownloaded || typeof(canBeDownloaded) !== "boolean") {
        errors.errorsMessages.push(
            {
                message:"Incorrect canBeDownloaded",
                field:"canBeDownloaded"
            })
    }
    if(minAgeRestriction !== null && (typeof minAgeRestriction !== "number" || minAgeRestriction > 18 || minAgeRestriction < 1)) {
        errors.errorsMessages.push(
            {
                message:"Incorrect minAgeRestriction",
                field:"minAgeRestriction"
            })
    }

    function isDateTimeString(value:string):boolean  {
        const iso8601Regex = /^20\d{2}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d{3}Z$/;
        return iso8601Regex.test(value)
    }
    if (!publicationDate || (isDateTimeString((publicationDate)) == false || typeof (publicationDate) == "number")) {
        errors.errorsMessages.push(
            {
                message:"Incorrect publicationDate",
                field:"publicationDate"
            })
    }

    if(availableResolutions && Array.isArray(availableResolutions)) {
        availableResolutions.forEach((r) => {
            !AvailableResolutions.includes(r) &&
            errors.errorsMessages.push(
                {
                    message: "Incorrect availableResolutions",
                    field: "availableResolutions"
                }
            )
        })
    }
    else
    {
        availableResolutions= []
    }

    if(errors.errorsMessages.length) {
        res.status(400).send(errors)
    }

    const id = +req.params.id
    let video = videos.find((v):boolean => v.id === id)

    if(video) {
        video.title = req.body.title
        video.author = req.body.author
        video.canBeDownloaded = req.body.canBeDownloaded
        video.minAgeRestriction = req.body.minAgeRestriction
        video.publicationDate = req.body.publicationDate
        video.availableResolutions = req.body.availableResolutions
        res.status(204).send(video)
    } else {
        res.sendStatus(404)
    }
})

videosRouter.post('/', (req:Request, res:Response) => {
    let {title, author, availableResolutions} = req.body
    let errors: ErrorType = {
        errorsMessages: []
    }
    if(!title || !title.trim() || title.trim().length > 40 || title === null ) {
        errors.errorsMessages.push(
            {
                message:"Invalid title",
                field:"title"
            })
    }
    if(!author || !author.trim().length || author.trim().length > 20 || author === null) {
        errors.errorsMessages.push(
            {
                message:"Invalid author",
                field:"author"
            })
    }
    if(availableResolutions && Array.isArray(availableResolutions)) {
        availableResolutions.forEach((r) => {
            !AvailableResolutions.includes(r) &&
            errors.errorsMessages.push(
                {
                    message: "Invalid availableResolutions",
                    field: "availableResolutions"
                }
            )
        })
    }
    else
    {
        availableResolutions= []
    }
    if(errors.errorsMessages.length) {
        res.status(400).send(errors)
        return;
    }

    const createdAt= new Date();
    const publicationDate= new Date();

    publicationDate.setDate(createdAt.getDate() + 1)

    const newVideo: VideoDbType = {
        id: +(new Date()),
        title,
        author,
        canBeDownloaded:false,
        minAgeRestriction:null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions
    }
    videos.push(newVideo);

    res.status(201).send(newVideo);
});

