export * from './errors';
import { Middleware } from 'koa';
/**
 * Koa error handling middleware.
 *
 * Catch errors and build jsonapi complient
 * error response. If error is not instance of
 * HttpError, produce Internal Server Error
 * response and emit error event.
 */
export declare const jsonApiErrors: Middleware;
