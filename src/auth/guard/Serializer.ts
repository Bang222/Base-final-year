import { PassportSerializer } from '@nestjs/passport';
import { ForbiddenException, Injectable, Res } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginWithGoogleDTO } from '../dto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private authService: AuthService) {
    super();
  }
  // who the user belong to
  // eslint-disable-next-line @typescript-eslint/ban-types
  // @ts-ignore
  async deserializeUser(
    payload: any | null,
    // eslint-disable-next-line @typescript-eslint/ban-types
    done: Function
  ): Promise<any> {
    if (!payload.id) {
      return done(null, null);
    }
    // console.log('deserializeUser', payload.id);
    const user = this.authService.findUser(payload.id);
    return done(null, user);
  }
  // @ts-ignore
  async serializeUser(
    user: LoginWithGoogleDTO,
    // eslint-disable-next-line @typescript-eslint/ban-types
    done: Function
  ): Promise<any> {
    // console.log('serializeUser', user);
    done(null, user);
  }
}
