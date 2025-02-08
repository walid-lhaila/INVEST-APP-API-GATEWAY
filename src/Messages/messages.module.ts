import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessagesController } from './messages.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Messages-Service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 5000,
        },
      },
    ]),
  ],
  controllers: [MessagesController],
  providers: [],
})
export class MessagesModule {}
