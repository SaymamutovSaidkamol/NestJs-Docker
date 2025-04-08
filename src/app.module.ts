import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { CategoryModule } from './category/category.module';
import { CommentsModule } from './product/product.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from "cache-manager-ioredis"
@Module({
  imports: [ 
    CacheModule.register({
      isGlobal: true,
      ttl: 60*1000,
      store: redisStore
    }),
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
