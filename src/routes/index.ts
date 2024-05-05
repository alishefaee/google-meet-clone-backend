import express, { Response } from "express";
import cors from "cors"
import { TRequest } from '../types/request'

const router = express.Router()

router.use(cors({
  origin:'*'
}))

router.get('/meeting/:meetingId', (req:TRequest,res:Response)=>{
  const { meetingId } = req.params

})

export default router