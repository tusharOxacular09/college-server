import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

// The JwtAuthGuard class extends the built-in AuthGuard with the strategy 'jwt'.
// This guard is used to protect routes by ensuring that the request has a valid JWT token.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // handleRequest is overridden to provide custom behavior for handling unauthorized access.
  // If the user is not authenticated or there is an error, an HttpException is thrown with an Unauthorized status.
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw new HttpException(
        'Unauthorized access! Please log in to continue.',
        HttpStatus.UNAUTHORIZED, // Respond with a 401 status code for unauthorized access
      );
    }
    return user; // If the user is authenticated, return the user object
  }
}
