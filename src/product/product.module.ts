import { Module } from '@nestjs/common';
import { CommentsService } from './product.service';
import { CommentsController } from './product.controller';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
