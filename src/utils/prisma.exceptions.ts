import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // https://www.prisma.io/docs/orm/reference/error-reference
    switch (exception.code) {
      case 'P2002': // Unique constraint violation
        status = HttpStatus.CONFLICT;
        message = `The movie with ${exception.meta?.target} already exists.`;
        break;
      case 'P2003': // Foreign key constraint violation
        status = HttpStatus.BAD_REQUEST;
        message = `Foreign key constraint failed on the field: ${exception.meta?.field_name}`;
        break;
      case 'P2025': // Record not found
        status = HttpStatus.NOT_FOUND;
        message = `The requested record was not found.`;
        break;
      default: // Unhandled Prisma error
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = `An unknown Prisma error occurred: ${exception.message}`;
        break;
    }

    response.status(status).json({
      statusCode: status,
      message,
      path: request.url,
    });
  }
}
