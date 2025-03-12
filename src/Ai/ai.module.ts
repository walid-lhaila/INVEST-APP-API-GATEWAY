import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AiController } from './ai.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Ai-Service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8000,
        },
      },
    ]),
  ],
  controllers: [AiController],
  providers: [],
})
export class AiModule {}
