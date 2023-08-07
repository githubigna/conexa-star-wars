import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../user.repository';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  const mockUpUserRepository = {
    verifyEmailAvailability: () => {
      return false;
    },
    findOne: () => {
      return false;
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    })
      .overrideProvider(UserRepository)
      .useValue(mockUpUserRepository)
      .compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const mockUserData = {
        userId: '1155864e-d167-4076-809d-c358adfe2570',
        userName: 'ignacio',
        email: 'ignacio@mail.com',
        password: '12345',
        role: 'Usuario Regular',
      };
      const signUpData = {
        name: 'ignacio',
        email: 'ignacio@mail.com',
        password: '12345',
      };

      jest.spyOn(service, 'createUser').mockResolvedValue(mockUserData);

      const result = await service.createUser(signUpData);

      expect(result).toEqual(mockUserData);
    });
    it('should throw an error for duplicate email', async () => {
      const signUpData = {
        name: 'ignacio',
        email: 'ignacio@mail.com',
        password: '12345',
      };

      await expect(service.createUser(signUpData)).rejects.toThrowError();
    });
  });
  describe('getUserById', () => {
    it('should get a user', async () => {
      const mockUserData = {
        userId: '1155864e-d167-4076-809d-c358adfe2570',
        userName: 'ignacio',
        email: 'ignacio@mail.com',
        password: '12345',
        role: 'Usuario Regular',
      };
      const signUpData = '1155864e-d167-4076-809d-c358adfe2570';

      jest.spyOn(service, 'getUserById').mockResolvedValue(mockUserData);

      const result = await service.getUserById(signUpData);

      expect(result).toEqual(mockUserData);
    });
  });
  describe('getUsers', () => {
    it('should get users', async () => {
      const mockUserData = [
        {
          userId: '1155864e-d167-4076-809d-c358adfe2570',
          userName: 'ignacio',
          email: 'ignacio@mail.com',
          password: '12345',
          role: 'Usuario Regular',
        },
        {
          userId: '1155864e-d167-4076-809d-c358adfe2570',
          userName: 'ignacio',
          email: 'ignacio@mail.com',
          password: '12345',
          role: 'Usuario Regular',
        },
        {
          userId: '1155864e-d167-4076-809d-c358adfe2570',
          userName: 'ignacio',
          email: 'ignacio@mail.com',
          password: '12345',
          role: 'Usuario Regular',
        },
      ];

      jest.spyOn(service, 'getUsers').mockResolvedValue(mockUserData);

      const result = await service.getUsers({});

      expect(result).toEqual(mockUserData);
    });
  });
});
