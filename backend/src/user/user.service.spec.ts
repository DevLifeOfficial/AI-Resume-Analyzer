import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';
import { JwtService } from '@nestjs/jwt';

describe('UserService', () => {
  let service: UserService;

  const usersMock = [
    { _id: '1', name: 'A', email: 'a@test.com' },
    { _id: '2', name: 'B', email: 'b@test.com' },
  ];

  const mockUserModel = {
    find: jest.fn().mockReturnThis(),       
    select: jest.fn().mockReturnThis(),     
    exec: jest.fn(),                         
    findById: jest.fn().mockReturnThis(),
    findOne: jest.fn().mockReturnThis(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
    findByIdAndDelete: jest.fn().mockReturnThis(),
  };

  const mockJwtService = { sign: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('GetAllUsers', async () => {
    // arrange
    mockUserModel.exec.mockResolvedValueOnce(usersMock);

    // act
    const response = await service.findAll();

    // assert
    expect(mockUserModel.find).toHaveBeenCalled();
    expect(mockUserModel.select).toHaveBeenCalledWith('-password');
    expect(response).toEqual(usersMock);
  });
});
