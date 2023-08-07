import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { JwtService } from '../jwt/service/jwt.service';
import { UnauthorizedException } from '@nestjs/common';
import { SignupDto, LoginDto } from '../dto/auth.dtos';
import { User } from '../schemas/user.schema';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            getUserById: jest.fn(),
            getUsers: jest.fn(),
            loginUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            generateJwt: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signup', () => {
    it('should call userService.createUser with correct parameters', async () => {
      const signupDto: SignupDto = {
        name: 'Ignacio Garate',
        email: 'ignaciogarate@gmail.com',
        password: '12345',
      };

      await userController.signup(signupDto);

      expect(userService.createUser).toHaveBeenCalledWith(signupDto);
    });
  });

  describe('getUserById', () => {
    it('should call userService.getUserById with correct parameters', async () => {
      const userId = '1155864e-d167-4076-809d-c358adfe2570';

      await userController.getUserById(userId);

      expect(userService.getUserById).toHaveBeenCalledWith(userId);
    });
  });

  // Similarly, write tests for other methods

  describe('loginUser', () => {
    it('should return a JWT when validLogin is true', async () => {
      const loginDto: LoginDto = {
        email: 'ignaciogarate@gmail.com',
        password: '12345',
      };
      const validUser: User = {
        userName: 'ignacio garate',
        role: 'Administrador',
        userId: '1155864e-d167-4076-809d-c358adfe2570',
        email: 'ignaciogarate@gmail.com',
        password: '12345',
      };
      const mockJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW5pc3RyYWRvciIsInN1YiI6IjExNTU4NjRlLWQxNjctNDA3Ni04MDlkLWMzNThhZGZlMjU3MCIsImlhdCI6MTY5MTM2ODQ5MiwiZXhwIjoxNjkxMzcyMDkyfQ.8dTjO9Kfkbje44JD0syBPjeoJmaIODo3XILmCzvvcL8';

      userService.loginUser = jest
        .fn()
        .mockImplementation(async () => validUser);
      jwtService.generateJwt = jest.fn().mockReturnValue(mockJwt);

      const result = await userController.loginUser(loginDto);

      expect(result).toBe(mockJwt);
    });

    it('should throw UnauthorizedException when validLogin is false', async () => {
      const loginDto: LoginDto = {
        email: 'ignaciogarate@gmail.com',
        password: '12345',
      };

      userService.loginUser = jest
        .fn()
        .mockImplementation(() => Promise.resolve(false));

      await expect(userController.loginUser(loginDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
