import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  InternalServerErrorException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface Response<T> {
  statusCode: HttpStatus;
  data: T | null;
  error?: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly logger = new Logger(TransformInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();

    return next.handle().pipe(
      map((data) => ({ statusCode: response.statusCode, data, error: undefined })),
      catchError((err) => {
        this.logger.error('An error occurred', err);

        const statusCode =
          err instanceof HttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const exception =
          err instanceof HttpException ? err.getResponse() : new InternalServerErrorException();

        const error =
          typeof exception === 'string'
            ? exception
            : (exception as any).message || 'Unexpected error';

        return throwError(() => new HttpException({ statusCode, data: null, error }, statusCode));
      })
    );
  }
}
