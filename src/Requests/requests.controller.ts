import {
  Body,
  Controller,
  Inject,
  Headers,
  Post,
  UnauthorizedException, Get,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('requests')
export class RequestsController {
  constructor(
    @Inject('Requests-Service') private readonly requestsService: ClientProxy,
  ) {}

  @Post('send')
  async sendRequest(
    @Body() requestsDto: any,
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      throw new UnauthorizedException('TOKEN IS REQUIRED');
    }
    const payload = {
      token,
      payload: requestsDto,
    };
    return this.requestsService.send({ cmd: 'sendRequests' }, payload);
  }

  @Get('get')
  getMyRequests(@Headers('authorization') token: string) {
    if(!token) {
      throw new UnauthorizedException('TOKEN IS REQUIRED');
    }
    return this.requestsService.send({ cmd: 'getMyRequests' }, {token}).toPromise();
  }
}
