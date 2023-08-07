import { Injectable } from '@nestjs/common';
import { UserService } from '../../service/user.service';
import * as jwt from 'jsonwebtoken';
import { User } from '../../schemas/user.schema';
import { PayloadToken } from '../jwt.interface';
import { UserEntity } from 'src/user/entity/user.entity';
@Injectable()
export class JwtService {
  constructor(private readonly userService: UserService) {}
  //public async validateUser(email: string, password: string) {}
  public signJwt({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }
  public async generateJwt(user: User): Promise<any> {
    const getUser: User = await this.userService.getUserById(user.userId);
    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.userId,
    };
    const userData: UserEntity = {
      userId: getUser.userId,
      userName: getUser.userName,
      role: getUser.role,
      email: getUser.email,
    };
    return {
      accessToken: this.signJwt({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),
      userData,
    };
  }
}
