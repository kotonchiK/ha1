import { app } from './settings'
import {videosRouter} from "./routers/videos-router";

const port = process.env.PORT || 3999

app.use('/videos', videosRouter)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

