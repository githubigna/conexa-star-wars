import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { LoginDto, SignupDto, UpdateUserDto } from '../dto/auth.dtos';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('post/')
  signup(@Body() body: SignupDto) {
    return this.userService.createUser(body);
  }
  @Get('get/:id')
  @UseGuards(new JwtAuthGuard())
  getUserById(@Param() id: string) {
    return this.userService.getUserById(id);
  }
  @Get('get/')
  @UseGuards(new JwtAuthGuard())
  getUsers() {
    return this.userService.getUsers({});
  }
  @Put('put/')
  @UseGuards(new JwtAuthGuard())
  putUser(@Body() id: string, body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Post('/login')
  @UseGuards(new JwtAuthGuard())
  loginUser(@Body() userObjectLogin: LoginDto) {
    return this.userService.loginUser(userObjectLogin);
  }
}
