import {runDb} from "./db/db";
import {app} from "./app";

export const port= 3000

app.listen(port, async () => {
await runDb()
})

