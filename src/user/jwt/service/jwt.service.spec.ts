import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../service/user.service';
import { JwtService } from './jwt.service';

describe('jwt.service', () => {
  let userService: UserService;
  let jwtService: JwtService;
  const newMockjwtService = {
    generateJwt: jest.fn(),
  };
  const newMockUserService = {
    getUserById: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, JwtService],
    })
      .overrideProvider(UserService)
      .useValue(newMockUserService)
      .overrideProvider(JwtService)
      .useValue(newMockjwtService)
      .compile();

    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('Generate Jwt', () => {
    it('should return an jwtoken', async () => {
      const mockUserData = {
        userId: '1155864e-d167-4076-809d-c358adfe2570',
        userName: 'ignacio',
        email: 'ignacio@mail.com',
        password: '12345',
        role: 'Usuario Regular',
      };
      const mockResult = {
        accessToken: process.env.MOCK_JWT,
        userId: '1155864e-d167-4076-809d-c358adfe2570',
        userName: 'ignacio',
        role: 'Usuario Regular',
        email: 'ignacio@mail.com',
      };
      newMockjwtService.generateJwt.mockResolvedValue(mockResult);

      const result = await jwtService.generateJwt(mockUserData);
      expect(result).toStrictEqual(mockResult);
    });
  });
});
