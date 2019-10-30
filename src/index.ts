import { Middleware } from 'koa';

import { InternalServerError } from './errors';

/**
 * Koa error handling middleware.
 *
 * Catch errors and build jsonapi complient
 * error response. If error is not instance of
 * HttpError, produce Internal Server Error
 * response and emit error event.
 */
export const jsonApiErrors: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (Array.isArray(err)) {
      ctx.status = err.length > 0 ? +(err[0].status || 500) : 500;
      ctx.body = {
        errors: [],
      };
      for (const error of err) {
        if (error.isHttpError) {
          ctx.body.errors.push(error.toJsonapi());
        } else {
          ctx.body.errors = [ new InternalServerError().toJsonapi() ];
          ctx.app.emit('error', error, ctx);
          break;
        }
      }
    } else {
      ctx.status = +(err.status || 500);
      if (err.isHttpError) {
        ctx.body = {
          errors: [ err.toJsonapi() ],
        };
      } else {
        ctx.body = {
          errors: [ new InternalServerError().toJsonapi() ],
        };
        ctx.app.emit('error', err, ctx);
      }
    }
  }
};
