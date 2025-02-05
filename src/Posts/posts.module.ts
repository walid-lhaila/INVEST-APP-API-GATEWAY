import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostsController } from './posts.controller';

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
  ],
  controllers: [PostsController],
  providers: [],
})
export class PostsModule {}
