import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
export declare class RolesGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    tokenDecode(token: string): string | object;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
