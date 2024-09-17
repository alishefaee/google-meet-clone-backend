import { ConnStatusEnum } from '../enums/conn-status.enum'

export type TCacheData = {
  meetingId: string
  connectionId: string
  username: string
  isCreator: boolean
  connId: ConnStatusEnum
}
