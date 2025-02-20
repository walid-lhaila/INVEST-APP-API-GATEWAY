import {
  Body,
  Controller,
  Headers,
  Inject,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('messages')
export class MessagesController {
  constructor(
    @Inject('Messages-Service') private readonly messagesService: ClientProxy,
  ) {}

  @Post('send')
  async sendMessage(
    @Headers('authorization') authHeader: string,
    @Body('receiverId') receiverId: string,
    @Body('content') content: string,
  ) {
    if (!authHeader) {
      throw new UnauthorizedException('TOKEN IS REQUIRED');
    }
    const jwtToken = authHeader.split(' ')[1];
    const decodedToken = JSON.parse(
      Buffer.from(jwtToken.split('.')[1], 'base64').toString(),
    );
    const senderId = decodedToken?.sub;

    if (!senderId) {
      throw new UnauthorizedException('Invalid token');
    }
    const response = await this.messagesService
      .send('send-message', {
        senderId,
        receiverId,
        content,
      })
      .toPromise();
    return { message: 'Message sent successfully', conversation: response };
  }
}
