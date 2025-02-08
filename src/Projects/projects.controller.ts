import {
  Body,
  Controller,
  Inject,
  Post,
  Headers,
  UnauthorizedException, Get, Delete, Param,
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

  @Get('getAll')
  getProjectsByUser(@Headers('authorization') token: string) {
    if(!token) {
      throw new UnauthorizedException('TOKEN IS REQUIRED');
    }
    return this.projectsService.send({ cmd: 'getProjects' }, { token }).toPromise();
  }

  @Delete('delete/:projectId')
  async deleteProject(@Param('projectId') projectId: string, @Headers('authorization') token: string) {
    if(!token) {
      throw new UnauthorizedException('TOKEN IS REQUIRED');
    }

    if(!projectId) {
      throw new Error('PROJECT ID REQUIRED OR NOT FOUND')
    }
    return this.projectsService.send({ cmd: 'deleteProject' }, {token, projectId}).toPromise();
}

}
