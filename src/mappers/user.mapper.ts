import {WithId} from "mongodb";
import {UserDb} from "../db/types/user.types";
import {OutputUserType} from "../models/users.output.models";
export const userMapper = (user:WithId<UserDb>):OutputUserType => {
    return {
        id:user._id.toString(),
        login:user.login,
        email:user.email,
        createdAt:user.createdAt
    }
}