import { Favorites } from "./favorites";

export class LoginData{
    id: number = {} as number;
    username = '';
    email = '';
    passwordHash = '';
    passwordSalt = '';
    favorites? : Favorites[];
    created_date?: Date;
    updated_date?: Date;
    deleted_date?: Date | null;
    token = "";
}