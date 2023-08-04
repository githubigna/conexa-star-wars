import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  password: string;
}
export class LoginDto {
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  password: string;
}
export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  password: string;
}
