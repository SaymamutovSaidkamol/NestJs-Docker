import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CategoryType } from "src/Enums/role.enum";

export class CreateCategoryDto {
    @ApiProperty({example: "samsung"})
    @IsString()
    name: string

    @ApiProperty({example: ['Accessories', 'Laptops', 'Phone', 'Electronics']})
    @IsString()
    type: CategoryType

}
