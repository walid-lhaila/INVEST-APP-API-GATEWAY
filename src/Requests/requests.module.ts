import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Requests-Service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 6000,
        },
      },
    ]),
  ],
  controllers: [RequestsController],
  providers: [],
})
export class RequestsModule {}
