import assert from 'assert';
import { Context } from 'koa';
import { pick } from 'lodash';
import HttpStatus from 'http-status-codes';

import { jsonApiErrors } from '..';
import { HttpError } from '../errors';

test('jsonApiErrors middleware catch single HttpError and set proper respone body', async () => {
  const CODE = 400;
  const MESSAGE = 'Bad request';
  const throwingError = (ctx: any, next: any) => {
    throw new HttpError(CODE, MESSAGE);
  };

  const emitMock = jest.fn((type: string, obj: any, ctx: any) => {});

  const ctxMock: Context = {
    body: {},
    app: {
      emit: emitMock,
    },
  } as any;

  const EXPECT = {
    status: CODE,
    body: {
      errors: [ new HttpError(CODE, MESSAGE).toJsonapi() ],
    },
  };

  await jsonApiErrors(ctxMock, throwingError as any);

  assert.deepStrictEqual(pick(ctxMock, [ 'status', 'body' ]), EXPECT);
  assert(!emitMock.mock.calls[0], 'Not emit error if error is instance of HttpError');
});

test('jsonApiErrors middleware catch array of HttpErrors and set proper respone body', async () => {
  const CODE = 400;
  const throwingError = (ctx: any, next: any) => {
    throw [
      new HttpError(CODE, 'Error one'),
      new HttpError(CODE, 'Error two'),
      new HttpError(CODE, 'Error three'),
    ];
  };

  const EXPECT = {
    status: CODE,
    body: {
      errors: [
        new HttpError(CODE, 'Error one').toJsonapi(),
        new HttpError(CODE, 'Error two').toJsonapi(),
        new HttpError(CODE, 'Error three').toJsonapi(),
      ],
    },
  };

  const emitMock = jest.fn((type: string, obj: any, ctx: any) => {});

  const ctxMock: Context = {
    body: {},
    app: {
      emit: emitMock,
    },
  } as any;

  await jsonApiErrors(ctxMock, throwingError as any);

  assert.deepStrictEqual(pick(ctxMock, [ 'status', 'body' ]), EXPECT);
  assert(!emitMock.mock.calls[0], 'Not emit error if all errors are instances of HttpError');
});

test('jsonApiErrors middleware catch single Error and set proper respone body and emit error event', async () => {
  const EXPECT_CODE = 500;
  const throwingError = (ctx: any, next: any) => {
    throw new Error('Random error');
  };

  const emitMock = jest.fn((type: string, obj: any, ctx: any) => {});

  const ctxMock: Context = {
    body: {},
    app: {
      emit: emitMock,
    },
  } as any;

  const EXPECT = {
    status: EXPECT_CODE,
    body: {
      errors: [ { status: EXPECT_CODE.toString(), title: HttpStatus.getStatusText(EXPECT_CODE) } ],
    },
  };

  await jsonApiErrors(ctxMock, throwingError as any);

  assert.deepStrictEqual(pick(ctxMock, [ 'status', 'body' ]), EXPECT);
  assert.strictEqual(emitMock.mock.calls[0][0], 'error');
  assert(emitMock.mock.calls[0][1] instanceof Error);
});

test('jsonApiErrors middleware catch array of Errors and set proper respone body and emit error event', async () => {
  const EXPECT_CODE = 500;
  const throwingError = (ctx: any, next: any) => {
    throw [
      new Error('One'),
      new Error('Two'),
      new Error('Three'),
    ];
  };

  const emitMock = jest.fn((type: string, obj: any, ctx: any) => {});

  const ctxMock: Context = {
    body: {},
    app: {
      emit: emitMock,
    },
  } as any;

  const EXPECT = {
    status: EXPECT_CODE,
    body: {
      errors: [
        { status: EXPECT_CODE.toString(), title: HttpStatus.getStatusText(EXPECT_CODE) },
      ],
    },
  };

  await jsonApiErrors(ctxMock, throwingError as any);

  assert.deepStrictEqual(pick(ctxMock, [ 'status', 'body' ]), EXPECT);
  assert.strictEqual(emitMock.mock.calls[0][0], 'error');
  assert(emitMock.mock.calls[0][1] instanceof Error);
});
