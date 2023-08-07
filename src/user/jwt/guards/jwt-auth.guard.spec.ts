import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './jwt-auth.guard'; // Update the import path accordingly
import { UserService } from '../../service/user.service'; // Update the import path accordingly
import { UserRepository } from 'src/user/user.repository';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let userService: UserService;
  let reflector: Reflector;
  let context: ExecutionContext;

  beforeEach(() => {
    new UserRepository();
    userService = new UserService(); // Create an instance of your UserService or use a mock
    reflector = new Reflector(); // Create an instance of Reflector or use a mock
    rolesGuard = new RolesGuard(userService, reflector);
    context = {
      switchToHttp: () => ({
        getRequest: jest.fn(() => ({
          headers: {
            access_token: 'valid_access_token',
          },
        })),
      }),
      getHandler: jest.fn(),
    } as ExecutionContext;
  });

  it('should allow access when @Public decorator is present', async () => {
    const isPublic = true;
    reflector.get = jest.fn().mockReturnValue(isPublic);

    const result = await rolesGuard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException when access_token is missing', async () => {
    const req = context.switchToHttp().getRequest();
    req.headers.access_token = undefined;

    await expect(rolesGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException when access_token is expired', async () => {
    // Mock userService.getUserById to return a user with isExpired true
    userService.getUserById = jest.fn().mockReturnValue({ isExpired: true });

    await expect(rolesGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  // Add more test cases based on your application's logic
});
