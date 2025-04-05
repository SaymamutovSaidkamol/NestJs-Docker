import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateproductDto } from './dto/create-comment.dto';
import { UpdateproductDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class productsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateproductDto, req: Request) {
    let newproduct = await this.prisma.product.create({ data });

    return { message: 'product sent successfully', data: { newproduct } };
  }

  async findAll() {
    return {
      data: await this.prisma.product.findMany({
        include: {category: true},
      }),
    };
  }

  async update(id: number, data: UpdateproductDto, req: Request) {

    let updateproduct = await this.prisma.product.updateMany({
      data,
      where: { id },
    });
    return { message: 'product successfully changed', data: updateproduct };
  }

  async remove(id: number, req: Request) {

    let checkUser = await this.prisma.product.findFirst({
      where: { id },
    });

    if (!checkUser) {
      throw new NotFoundException('product Not Found');
    }
    return {
      message: 'product successfully deleted',
      data: await this.prisma.product.delete({ where: { id } }),
    };
  }
}
