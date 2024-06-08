import express, { Response } from "express";
import cors from "cors"
import { TRequest } from '../types/request'

const router = express.Router()

router.use(cors({
  origin:'*'
}))

router.post('/meeting', (req:TRequest,res:Response)=>{
  const newMeetingUrl = Math.floor(Math.random()*100000000).toString()
  return res.json({
    meetingId: newMeetingUrl
  })
})


export default router