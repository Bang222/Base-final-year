import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { Logger } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
export class magicLoginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(magicLoginStrategy.name);
  constructor() {
    super({
      secret: 'bangdanh.google',
      jwtOptions: {
        expiresIn: '5m',
      },
      callbackUrl: GoogleStrategy.arguments.callbackUrl,
      sendMagicLink: async (destination: string, href: string) => {
        this.logger.debug(`sending email to ${destination} with Link ${href}`);
      },
      verify: async (payload, callback) => {
        callback(null, this.validate(payload));
      },
    });
  }
  async validate(payload: { destination: string }) {}
}
