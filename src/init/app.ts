import "express-async-errors"
import express, { Request, Response, NextFunction } from "express"
import router from "../routes";
import Cache from "../helper/cacheHelper";

Cache.set<{meetingId: string, username: string}[]|[]>('users',[])
const app = express()

app.use("/v1", router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  return res.send('Error')
});

export { app }