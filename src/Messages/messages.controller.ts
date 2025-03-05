import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Param,
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


  @Get(':conversationId')
  async getConversationById(
    @Headers('authorization') autHeader: string,
    @Param('conversationId') conversationId: string,
  ) {
    if (!autHeader) {
      throw new UnauthorizedException('Missing Authorization Token');
    }
    return this.messagesService.send(
      { cmd: 'get-conversation-by-id' },
      { autHeader, conversationId },
    );
  }

  @Get()
  async getAllConversation(@Headers('authorization') autHeader: string) {
    if (!autHeader) {
      throw new UnauthorizedException('Missing Authorization Token');
    }
    return this.messagesService.send(
      { cmd: 'get-all-conversations' },
      { autHeader },
    );
  }

  @Post('conversation/:conversationId/mark-as-read')
  async markMessageAsRead(
    @Headers('authorization') autHeader: string,
    @Param('conversationId') conversationId: string,
  ) {
    if (!autHeader) {
      throw new UnauthorizedException('Missing Authorization Token');
    }
    return this.messagesService.send(
      { cmd: 'mark-messages-as-read' },
      { autHeader, conversationId },
    ).toPromise();
  }
}
