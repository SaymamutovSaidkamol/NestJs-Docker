import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsString } from 'class-validator';
import { UserStatus } from 'src/Enums/role.enum';

export class RegisterDto {
  @ApiProperty({ example: 'Saidkamol' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'cryptouchun06@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: '+99891234567' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'Saidkamol.jpg' })
  @IsString()
  img: string;

  @ApiProperty({ example: ['USER', 'ADMIN', 'SUPERADMIN'] })
  @IsString()
  role: Role;

  @IsString()
  status: UserStatus;
}

export class LoginDto {
  @ApiProperty({ example: 'cryptouchun06@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;
}

export class VerifyDto {
  @ApiProperty({ example: 'cryptouchun06@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  otp: string;
}
