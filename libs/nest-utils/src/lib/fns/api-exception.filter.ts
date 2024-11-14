import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const response: any = exception.getResponse();
    const errors = response?.errors;
    const error = errors ? '' : exception?.message || response?.error || 'Oops! We ran into some problems.';

    return res
      .status(status || 500)
      .json({ timestamp: new Date().toISOString(), path: request.url, error: error, errors: errors || {} });
  }
}
