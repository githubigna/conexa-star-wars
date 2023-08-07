import { ExecutionContext } from '@nestjs/common';
import { RolesGuard } from '../guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../service/user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let userService: UserService;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RolesGuard,
          useClass: class {
            async canActivate(context: ExecutionContext) {
              return true;
            }
          },
        },
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    userService = module.get<UserService>(UserService);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should always return true when bypassing JWT validation', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            access_token: 'fake-access-token',
          },
        }),
      }),
      getHandler: () => {},
    };

    reflector.get = jest.fn().mockReturnValue(false);

    userService.getUserById = jest.fn().mockResolvedValue({
      userId: 'fakeUserId',
      role: 'admin',
    });
    guard['validateToken'] = jest.fn().mockReturnValue({
      sub: 'fakeUserId',
      isExpired: false,
    });
    expect(await guard.canActivate(context as ExecutionContext)).toBe(true);
  });
});
