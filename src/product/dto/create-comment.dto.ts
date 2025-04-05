import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateproductDto {
  @ApiProperty({ example: 'Apple' })
  @IsNumber()
  name: string;

  @ApiProperty({ example: 45000 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'Salom' })
  @IsString()
  categoryId: number;
}
