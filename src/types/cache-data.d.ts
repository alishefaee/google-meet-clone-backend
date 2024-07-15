import {UserRoleEnum} from "../enums/user-role.enum";

export type TCacheData = {
    meetingId: string,
    connectionId: string,
    username: string,
    role: UserRoleEnum
}