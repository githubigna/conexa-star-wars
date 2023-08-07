import { SetMetadata } from '@nestjs/common';
import { ROLE_KEY } from 'src/user/constants/key-decorators';

export const RoleAccess = (role: string) => {
  return SetMetadata(ROLE_KEY, role);
};
