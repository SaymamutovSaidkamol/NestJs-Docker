import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { CategoryModule } from './category/category.module';
import { CommentsModule } from './product/product.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    UploadModule,
    UsersModule,
    CategoryModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
