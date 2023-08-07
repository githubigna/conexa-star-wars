import { AuthJwtResponse, IUseToken } from 'src/user/jwt/jwt.interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = jwt.decode(token) as AuthJwtResponse;
    const currentDate = new Date();
    const expireDate = new Date(decode.exp);

    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: +expireDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'token is invalid';
  }
};
