export class apiConst{
    static readonly WORD_URL: string = "Words";
        static readonly WORD_ACTION_URL_GETALL: string = "GetWordsList";
        static readonly WORD_ACTION_URL_CREATE: string = "Create";
        static readonly WORD_ACTION_URL_UPDATE: string = "UpdateWord";
        static readonly WORD_ACTION_URL_DELETE: string = "DeleteWord";
        static readonly WORD_ACTION_URL_SLOT: string = "RandomPick";
        static readonly WORD_ACTION_URL_FAVORITE: string = "ToggleFavorite";

    static readonly AUTH_URL: string = "Auth";
        static readonly AUTH_ACTION_URL_REGISTER: string = "Register";
        static readonly AUTH_ACTION_URL_LOGIN: string = "Login";
        static readonly AUTH_ACTION_URL_GET: string = "GetUser";

    static readonly TYPE_URL: string = "Type";
        static readonly TYPE_ACTION_URL_GET: string = "GetWordTypes";
}