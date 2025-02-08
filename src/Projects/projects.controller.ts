import {
  Body,
  Controller,
  Inject,
  Post,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('projects')
export class ProjectsController {
  constructor(
    @Inject('Projects-Service') private readonly projectsService: ClientProxy,
  ) {}

  @Post('create')
  async createProject(
    @Body() projectsDto: any,
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      throw new UnauthorizedException('TOKEN IS REQUIRED');
    }
    const payload = {
      token,
      payload: projectsDto,
    };
    return this.projectsService.send({ cmd: 'createProjects' }, payload);
  }
}
