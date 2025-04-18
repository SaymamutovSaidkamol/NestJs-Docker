import { Module } from '@nestjs/common';
import { productsService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  providers: [productsService],
})
export class CommentsModule {}
