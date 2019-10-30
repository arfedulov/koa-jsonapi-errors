import * as JSONAPI from 'jsonapi-typescript';
import HttpStatus from 'http-status-codes';

export class HttpError extends Error {
  status: number;
  title: string;
  detail?: string;

  isHttpError = true;

  constructor(httpStatus: number, title: string, detail?: string) {
    super(`${ httpStatus } ${ title }`);
    this.status = httpStatus;
    this.title = title;
    this.detail = detail;
  }

  toJsonapi = (): JSONAPI.ErrorObject => {
    const obj: JSONAPI.ErrorObject = {
      status: this.status.toString(),
    };
    if (this.title) {
      obj.title = this.title;
    }
    if (this.detail) {
      obj.detail = this.detail;
    }

    return obj;
  }
}

export class NotFound extends HttpError {
  constructor(title?: string, detail?: string) {
    super(HttpStatus.NOT_FOUND, title || HttpStatus.getStatusText(HttpStatus.NOT_FOUND), detail);
  }
}

export class BadRequest extends HttpError {
  constructor(title?: string, detail?: string) {
    super(HttpStatus.BAD_REQUEST, title || HttpStatus.getStatusText(HttpStatus.BAD_REQUEST), detail);
  }
}

export class Conflict extends HttpError {
  constructor(title?: string, detail?: string) {
    super(HttpStatus.CONFLICT, title || HttpStatus.getStatusText(HttpStatus.CONFLICT), detail);
  }
}

export class Forbidden extends HttpError {
  constructor(title?: string, detail?: string) {
    super(HttpStatus.FORBIDDEN, title || HttpStatus.getStatusText(HttpStatus.FORBIDDEN), detail);
  }
}

export class InternalServerError extends HttpError {
  constructor(title?: string, detail?: string) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      title || HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
      detail
    );
  }
}

export class Unauthorized extends HttpError {
  constructor(title?: string, detail?: string) {
    super(HttpStatus.UNAUTHORIZED, title || HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED), detail);
  }
}
