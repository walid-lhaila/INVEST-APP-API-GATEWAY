import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostsController } from './posts.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Posts-Service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 2000,
        },
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [PostsController, FavoritesController],
  providers: [],
})
export class PostsModule {}
