# koa-jsonapi-errors

Provides koa error handling middleware and a set of erro constructors that are used with this middleware.

## Installation

```
yarn add @arfedulov/koa-jsonapi-errors
```

## Usage

```ts
import Koa from 'koa';
import { jsonApiErrors, BadRequest } from '@arfedulov/koa-jsonapi-errors';

const app = new Koa();

app.use(jsonApiErrors);

app.use(async (ctx, next) => {
  throw new BadRequest();
});
/*
  Produce response body:
  {
    errors: [{ status: "400", title: "Bad request" }]
  }
*/

```
