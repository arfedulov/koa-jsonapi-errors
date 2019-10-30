import assert from 'assert';
import request from 'supertest';
import Koa from 'koa';
import HttpStatus from 'http-status-codes';

import { jsonApiErrors } from '..';
import { BadRequest } from '../errors';

const app = new Koa();

app.use(jsonApiErrors);

app.use(async (ctx, next) => {
  throw new BadRequest();
});

const testServer = app.listen();

afterEach(async () => {
  await testServer.close();
});

test('Catch HttpError and produce jsonapi complient error response', async () => {
  const response = await request(testServer).get('/');
  const EXPECT = {
    errors: [ { status: HttpStatus.BAD_REQUEST.toString(), title: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST) } ],
  };

  assert.deepStrictEqual(response.body, EXPECT);
});
