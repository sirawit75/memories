import { UserModel } from "../../entities/User";






export const isAdmin = async (userId:string): Promise<boolean> => {

    const user = (await UserModel.findById(userId))! ;
    if (user.username !== process.env.ADMIN)
        return false;
    return true ;
}