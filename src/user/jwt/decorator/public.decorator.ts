import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../../constants/key-decorators';

export const PublicAccess = () => {
  return SetMetadata(PUBLIC_KEY, true);
};
