import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * @deprecated
   * @returns
   */
  getDocs(): string {
    return 'Documentation for this API in .../docs';
  }
}
