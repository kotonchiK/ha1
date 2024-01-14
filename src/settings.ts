import express, {Express, Request, Response} from "express"
import {db} from "./db/db";
export const app:Express = express()
app.use(express.json())

app.delete('/testing/all-data', (req:Request, res:Response) => {
    try {
        db.videos = []
        res.sendStatus(204)
    }catch (e) {}
    res.status(500).send({error:'Internal Server Error'})
})


