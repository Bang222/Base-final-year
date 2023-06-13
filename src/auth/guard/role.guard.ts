import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../../enumData';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // refector dùng để cung cấp ra khỏi ngoài hàm (get out the box) bằng thư viện nestjs/core
    const requireRoles = this.reflector.getAllAndOverride<ROLES[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    // nếu k set role thì return lại true hê mọi người ều có thể vào đc
    if (!requireRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    return requireRoles.some((role) => user.roles.includes(role));
  }
}
