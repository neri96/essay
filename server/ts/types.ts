export enum NoteType {
    NOTE = 'note',
    ARTICLE = 'article',
}

export enum NoteMode {
    PUBLIC = 'public',
    PRIVATE = 'private'
}

export enum Roles {
    USER = 1,
    ADMIN = 2,
    OWNER = 3
}

export enum ConfirmAction {
    CONFIRM_EMAIL = 'confirm_email',
    CHANGE_PASSWORD = 'change_password',
    CHANGE_EMAIL = 'change_email'
}