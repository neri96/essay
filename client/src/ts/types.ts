export enum NoteArticleType {
    NOTE = 'note',
    ARTICLE = 'article'
}

export enum Mode {
    PUBLIC = 'public',
    PRIVATE = 'private'
}

export enum Roles {
    USER = 1,
    ADMIN = 2,
    OWNER = 3
}

export enum CategoryType {
    GLOBAL = 'global',
    USER_CATEGORIES = 'user_categories'
}

export enum CtgRestrictionStatus {
    NOT_RESTRICTED = 'Not restricted',
    RESTRICTED = 'Restricted'
}

export enum CategoryPosition {
    MAIN = 'main',
    SETTING = 'setting'
}

export enum Categories {
    NOT_CHOSEN = 'all',
    HISTORY = 'history',
    FACTS = 'facts',
    PHILOSOPHY = 'philosophy',
    PSYCHIATRY = 'psychiatry',
    RELIGION = 'religion'
}

export enum ModalType {
    LOGIN = 'login',
    REGISTER = 'register',
    CREATE = 'create',
    EDIT = 'edit',
    AUTH = 'auth'
}

export enum MethodType {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    PUT = 'put',
    DELETE = 'delete'
}

export enum ResponseType {
    NOTES = 'notes',
    NOTE = 'note',
    MESSAGE = 'message'
}

export type ToggleOptions = 'open' | 'close' | null;