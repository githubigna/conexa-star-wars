import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../../service/user.service';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../../constants/key-decorators';
import { IUseToken } from '../jwt.interface';
import { useToken } from 'src/utils/use.tokens';
import { Request } from 'express';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['access_token'];
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException(
        "Request must have a valid access_token in the 'access_token' header key",
      );
    }
    const manageToken: IUseToken | string = useToken(token);

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    if (manageToken.isExpired) {
      throw new UnauthorizedException(
        'The access_token is expired, fetch a new one and retry',
      );
    }

    const { sub } = manageToken;

    const user = await this.userService.getUserById(sub);

    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    req.idUser = user.userId;
    req.roleUser = user.role;

    return true;
  }
}
