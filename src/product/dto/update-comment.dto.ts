import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateproductDto {
  @ApiProperty({ example: 'Salom' })
  @IsString()
  comment?: string;

  @IsOptional()
  createAt?: Date = new Date();
}
