import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { jwtConstants } from 'src/auth/constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  tokenDecode(token: string) {
    if (!token) return null;
    const user = verify(token, jwtConstants.secret);
    return user;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = this.tokenDecode(request.headers.authorization);
    return user ? true : false;
  }
}
