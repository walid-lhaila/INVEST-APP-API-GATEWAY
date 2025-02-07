import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Projects-Service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4000,
        },
      },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [],
})
export class ProjectsModule {}
