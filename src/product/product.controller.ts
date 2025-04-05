import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CreateproductDto } from './dto/create-comment.dto';
import { UpdateproductDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Request } from 'express';
import { productsService } from './product.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: productsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() CreateproductDto: CreateproductDto, @Req() req: Request) {
    return this.commentsService.create(CreateproductDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() UpdateproductDto: UpdateproductDto, @Req() req: Request) {
    return this.commentsService.update(+id, UpdateproductDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id', )
  remove(@Param('id') id: number, @Req() req: Request) {
    return this.commentsService.remove(+id, req);
  }
}
