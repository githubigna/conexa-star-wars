import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { LoginDto, SignupDto } from '../dto/auth.dtos';
import { RolesGuard } from '../jwt/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtService } from '../jwt/service/jwt.service';
import { User } from '../schemas/user.schema';
import { PublicAccess } from '../jwt/decorator/public.decorator';
import { Roles } from '../jwt/guards/roles.guard';
import { RoleAccess } from '../jwt/decorator/role.decorator';
@ApiTags('User')
@Controller('user')
@UseGuards(RolesGuard, Roles)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  @PublicAccess()
  @ApiBody({ type: SignupDto, description: 'Sign up data' })
  @Post('post/')
  signup(@Body() body: SignupDto) {
    return this.userService.createUser(body);
  }
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'userId', required: true })
  @RoleAccess('Administrador')
  @Get('get/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
  @ApiBearerAuth()
  @RoleAccess('Administrador')
  @Get('get/')
  getUsers() {
    return this.userService.getUsers({});
  }
  /*@ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'userId', required: true })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Update data',
  })
  @RoleAccess('Administrador')
  @Put('put/:id')
  putUser(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(id, body);
  }*/
  @PublicAccess()
  @ApiBody({ type: LoginDto, description: 'Login and authentication data' })
  @Post('/login')
  async loginUser(@Body() userObjectLogin: LoginDto): Promise<string> {
    /*const validLogin = this.jwtService.validateUser(
      userObjectLogin.email,
      userObjectLogin.password,
    );*/

    const validLogin: User = await this.userService.loginUser(userObjectLogin);
    if (!validLogin) throw new UnauthorizedException('Login not valid');
    const jwt = this.jwtService.generateJwt(validLogin);
    return jwt;
  }
}
