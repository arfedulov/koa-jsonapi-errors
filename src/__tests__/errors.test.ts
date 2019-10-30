import assert from 'assert';
import HttpStatus from 'http-status-codes';
import * as JSONAPI from 'jsonapi-typescript';

import {
  HttpError,
  NotFound,
  BadRequest,
  Conflict,
  Forbidden,
  InternalServerError,
  Unauthorized,
} from '../errors';

test('HttpError.toJsonapi(): produce jsonapi complient error object', () => {
  const STATUS = '400';
  const MSG = 'Bad request';
  const DETAIL = 'Error detail';
  const EXPECT: JSONAPI.ErrorObject = { status: STATUS, title: MSG, detail: DETAIL };

  const err = new HttpError(+STATUS, MSG, DETAIL);

  assert.deepStrictEqual(err.toJsonapi(), EXPECT);
});

test('NotFound: has correct default status and title', () => {
  const STATUS = HttpStatus.NOT_FOUND;
  const MSG = HttpStatus.getStatusText(STATUS);
  const EXPECT: JSONAPI.ErrorObject = { status: STATUS.toString(), title: MSG };

  const err = new NotFound();

  assert.deepStrictEqual(err.toJsonapi(), EXPECT);
});

test('BadRequest: has correct default status and title', () => {
  const STATUS = HttpStatus.BAD_REQUEST;
  const MSG = HttpStatus.getStatusText(STATUS);
  const EXPECT: JSONAPI.ErrorObject = { status: STATUS.toString(), title: MSG };

  const err = new BadRequest();

  assert.deepStrictEqual(err.toJsonapi(), EXPECT);
});

test('Conflict: has correct default status and title', () => {
  const STATUS = HttpStatus.CONFLICT;
  const MSG = HttpStatus.getStatusText(STATUS);
  const EXPECT: JSONAPI.ErrorObject = { status: STATUS.toString(), title: MSG };

  const err = new Conflict();

  assert.deepStrictEqual(err.toJsonapi(), EXPECT);
});

test('Forbidden: has correct default status and title', () => {
  const STATUS = HttpStatus.FORBIDDEN;
  const MSG = HttpStatus.getStatusText(STATUS);
  const EXPECT: JSONAPI.ErrorObject = { status: STATUS.toString(), title: MSG };

  const err = new Forbidden();

  assert.deepStrictEqual(err.toJsonapi(), EXPECT);
});

test('InternalServerError: has correct default status and title', () => {
  const STATUS = HttpStatus.INTERNAL_SERVER_ERROR;
  const MSG = HttpStatus.getStatusText(STATUS);
  const EXPECT: JSONAPI.ErrorObject = { status: STATUS.toString(), title: MSG };

  const err = new InternalServerError();

  assert.deepStrictEqual(err.toJsonapi(), EXPECT);
});

test('Unauthorized: has correct default status and title', () => {
  const STATUS = HttpStatus.UNAUTHORIZED;
  const MSG = HttpStatus.getStatusText(STATUS);
  const EXPECT: JSONAPI.ErrorObject = { status: STATUS.toString(), title: MSG };

  const err = new Unauthorized();

  assert.deepStrictEqual(err.toJsonapi(), EXPECT);
});

test('NotFound: has correct status and set title and details', () => {
  const STATUS = HttpStatus.NOT_FOUND;
  const MSG = 'Custom message';
  const DETAIL = 'Error detail';
  const EXPECT: JSONAPI.ErrorObject = { status: STATUS.toString(), title: MSG, detail: DETAIL };

  const err = new NotFound(MSG, DETAIL);

  assert.deepStrictEqual(err.toJsonapi(), EXPECT);
});

test('BadRequest: has correct status and set title and details', () => {
  const STATUS = HttpStatus.BAD_REQUEST;
  const MSG = 'Custom message';
  const DETAIL = 'Error detail';
  const EXPECT: JSONAPI.ErrorObject = { status: STATUS.toString(), title: MSG, detail: DETAIL };

  const err = new BadRequest(MSG, DETAIL);

  assert.deepStrictEqual(err.toJsonapi(), EXPECT);
});

test('Forbidden: has correct status and set title and details', () => {
  const STATUS = HttpStatus.FORBIDDEN;
  const MSG = 'Custom message';
  const DETAIL = 'Error detail';
  const EXPECT: JSONAPI.ErrorObject = { status: STATUS.toString(), title: MSG, detail: DETAIL };

  const err = new Forbidden(MSG, DETAIL);

  assert.deepStrictEqual(err.toJsonapi(), EXPECT);
});

test('Conflict: has correct status and set title and details', () => {
  const STATUS = HttpStatus.CONFLICT;
  const MSG = 'Custom message';
  const DETAIL = 'Error detail';
  const EXPECT: JSONAPI.ErrorObject = { status: STATUS.toString(), title: MSG, detail: DETAIL };

  const err = new Conflict(MSG, DETAIL);

  assert.deepStrictEqual(err.toJsonapi(), EXPECT);
});

test('InternalServerError: has correct status and set title and details', () => {
  const STATUS = HttpStatus.INTERNAL_SERVER_ERROR;
  const MSG = 'Custom message';
  const DETAIL = 'Error detail';
  const EXPECT: JSONAPI.ErrorObject = { status: STATUS.toString(), title: MSG, detail: DETAIL };

  const err = new InternalServerError(MSG, DETAIL);

  assert.deepStrictEqual(err.toJsonapi(), EXPECT);
});

test('Unauthorized: has correct status and set title and details', () => {
  const STATUS = HttpStatus.UNAUTHORIZED;
  const MSG = 'Custom message';
  const DETAIL = 'Error detail';
  const EXPECT: JSONAPI.ErrorObject = { status: STATUS.toString(), title: MSG, detail: DETAIL };

  const err = new Unauthorized(MSG, DETAIL);

  assert.deepStrictEqual(err.toJsonapi(), EXPECT);
});
