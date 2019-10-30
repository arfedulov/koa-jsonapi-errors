import * as JSONAPI from 'jsonapi-typescript';
export declare class HttpError extends Error {
    status: number;
    title: string;
    detail?: string;
    isHttpError: boolean;
    constructor(httpStatus: number, title: string, detail?: string);
    toJsonapi: () => JSONAPI.ErrorObject;
}
export declare class NotFound extends HttpError {
    constructor(title?: string, detail?: string);
}
export declare class BadRequest extends HttpError {
    constructor(title?: string, detail?: string);
}
export declare class Conflict extends HttpError {
    constructor(title?: string, detail?: string);
}
export declare class Forbidden extends HttpError {
    constructor(title?: string, detail?: string);
}
export declare class InternalServerError extends HttpError {
    constructor(title?: string, detail?: string);
}
export declare class Unauthorized extends HttpError {
    constructor(title?: string, detail?: string);
}
