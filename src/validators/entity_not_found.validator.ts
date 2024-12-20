import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response } from 'express';

@Catch(EntityNotFoundError)
// The EntityNotFoundExceptionFilter is a custom exception filter that catches EntityNotFoundError exceptions
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  // The catch method handles the exception and sends an appropriate response
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    // Retrieve the HTTP context from the ArgumentsHost
    const ctx = host.switchToHttp();

    // Get the response object to send a response back to the client
    const response = ctx.getResponse<Response>();

    // Send a JSON response with a 404 status code and a message indicating no records were found
    response
      .status(404)
      .json({ message: 'No records found for the given college ID.' });
  }
}
