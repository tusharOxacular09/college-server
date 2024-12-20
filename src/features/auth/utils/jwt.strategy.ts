import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ENV } from '../../../config/env.config';

@Injectable()
// The JwtStrategy extends PassportStrategy(Strategy) to use the passport-jwt strategy for authentication.
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extract the JWT token from the Authorization header as a Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // The secret key used to verify the JWT token (from environment variables)
      secretOrKey: ENV.JWT_SECRET_KEY,
    });
  }

  // The validate method is called after the token is verified.
  // It returns the payload data, which contains the user's ID.
  // The payload is decoded from the JWT token and passed to this function.
  async validate(payload: any) {
    return { userId: payload.userId }; // The userId is returned as part of the request for further use.
  }
}
