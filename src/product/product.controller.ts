import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { CreateproductDto } from './dto/create-comment.dto';
import { UpdateproductDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Request } from 'express';
import { productsService } from './product.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('product')
export class ProductController {
  constructor(private readonly productsService: productsService) {}

  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() CreateproductDto: CreateproductDto, @Req() req: Request) {
    return this.productsService.create(CreateproductDto, req);
  }

  // @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() UpdateproductDto: UpdateproductDto, @Req() req: Request) {
    return this.productsService.update(+id, UpdateproductDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id', )
  remove(@Param('id') id: number, @Req() req: Request) {
    return this.productsService.remove(+id, req);
  }
}
