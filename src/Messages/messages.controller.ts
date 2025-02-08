import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('messages')
export class MessagesController {
  constructor(
    @Inject('Messages-Service') private readonly messagesService: ClientProxy,
  ) {}

}
