import "express-async-errors"
import express, { Request, Response, NextFunction } from "express"

const app = express()

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  return res.send('Error')
});

export { app }