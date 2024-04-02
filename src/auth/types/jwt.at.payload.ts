import { UserType } from "src/users/constants";

export type AtPayload = {
    sub : number;
    email : string;
    role : UserType
}