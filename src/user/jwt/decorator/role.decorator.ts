import { SetMetadata } from '@nestjs/common';
import { ROLE_KEY } from '../../constants/key-decorators';

export const RoleAccess = (role: string) => {
  return SetMetadata(ROLE_KEY, role);
};
