import { Request } from "express";

export type TRequest = Request & {
  username?: string
}