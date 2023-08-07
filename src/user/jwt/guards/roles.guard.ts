import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PUBLIC_KEY, ROLE_KEY } from '../../constants/key-decorators';
import { Role } from '../../constants/roles';

@Injectable()
export class Roles implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    const role = this.reflector.get<Role>(ROLE_KEY, context.getHandler());
    const req = context.switchToHttp().getRequest<Request>();
    const { roleUser } = req;

    if (role === undefined) {
      return true;
    }
    const allow = role === roleUser;
    if (!allow) throw new UnauthorizedException('Access denied, invalid role.');

    return true;
  }
}
