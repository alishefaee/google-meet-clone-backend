import { NextFunction, Request, Response } from 'express'
import { TRequest } from '../types/request'
import { Socket } from 'socket.io'
import { TSocket } from '../types/socket'
import { s } from 'vitest/dist/reporters-BXNXFKfg'

export function authMid(req: TRequest, res: Response, next: NextFunction) {
  const username = req.get('username')
  if (!username) {
    return res.status(404).send('user not found')
  }
  req.username = username
}

type Next = (err?: Error) => void

export function authSocketMid(socket: TSocket, next: Next) {
  console.log('socket middleware')
  console.log(socket.handshake.headers['username'])

  const username = socket.handshake.headers['username'] as string
  if (!username) return next(new Error('username not found'))
  socket.username = username
  next()
}
