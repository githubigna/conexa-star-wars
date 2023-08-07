import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from 'src/user/constants/key-decorators';

export const PublicAccess = () => {
  return SetMetadata(PUBLIC_KEY, true);
};
