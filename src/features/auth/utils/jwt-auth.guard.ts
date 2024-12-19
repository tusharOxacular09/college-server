import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw new HttpException(
        'Unauthorized access! Please log in to continue.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
