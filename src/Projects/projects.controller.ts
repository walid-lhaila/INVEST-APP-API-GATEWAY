import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('projects')
export class ProjectsController {
  constructor(
    @Inject('Projects-Service') private readonly projectsService: ClientProxy,
  ) {}
}
